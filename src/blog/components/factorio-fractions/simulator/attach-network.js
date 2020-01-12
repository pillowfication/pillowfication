/**
 * After a blueprint is tokenized in tokenize-blueprint.js, each token needs to
 * be hooked up to some node in the factorio network and connected to each
 * other. Any token that cannot be reached by some input block is removed.
 */

import {
  MAX_DELTA,
  Input,
  Output,
  Belt,
  UndergroundBelt,
  Splitter
} from './nodes'

function attachNetwork (grid) {
  const { width, height } = grid

  // Create a node at each token (that requires a node).
  for (let row = 0; row < height; ++row) {
    for (let col = 0; col < width; ++col) {
      const token = grid[row][col]
      if (token && token.type === 'INPUT') {
        token.node = createNode(grid, row, col, null)
      }
    }
  }

  // Connect the nodes together.
  // Grid references also have to be resolved.
  const nodes = []
  for (let row = 0; row < height; ++row) {
    for (let col = 0; col < width; ++col) {
      const token = grid[row][col]
      if (!token) continue
      switch (token.type) {
        case 'INPUT':
        case 'BELT':
        case 'UNDERGROUND_UP': {
          nodes.push(token.node)
          const { row, col } = token.node.outputNode
          token.node.outputNode = getNode(grid, row, col)
          break
        }
        case 'OUTPUT':
          nodes.push(token.node)
          break
        case 'UNDERGROUND_DOWN':
          if (token.node.outputNode instanceof UndergroundBelt) {
            nodes.push(token.node)
            nodes.push(token.node2)
            const { row, col } = token.node2.outputNode
            token.node2.outputNode = getNode(grid, row, col)
          } else {
            nodes.push(token.node)
            const { row, col } = token.node.outputNode
            token.node.outputNode = getNode(grid, row, col)
          }
          break
        case 'SPLITTER_LEFT': {
          nodes.push(token.node.leftNode)
          nodes.push(token.node.rightNode)
          const { row, col } = token.node.leftNode.outputNode
          token.node.leftNode.outputNode = getNode(grid, row, col)
          const { row: row2, col: col2 } = token.node.rightNode.outputNode
          token.node.rightNode.outputNode = getNode(grid, row2, col2)
          break
        }
        case 'SPLITTER_RIGHT': // A reference to the Splitter class is repeated here for convenience.
          switch (token.direction) {
            case '^': token.node = grid[row][col - 1].node; break
            case '>': token.node = grid[row - 1][col].node; break
            case 'v': token.node = grid[row][col + 1].node; break
            case '<': token.node = grid[row + 1][col].node; break
          }
          break
      }
    }
  }

  // Determine the in/out directions for all the belts.
  for (let row = 0; row < height; ++row) {
    for (let col = 0; col < width; ++col) {
      const token = grid[row][col]
      if (token && token.type === 'BELT') {
        const fromDirections = []
        getNodeDirection(grid, row - 1, col) === 'v' && fromDirections.push('v')
        getNodeDirection(grid, row, col + 1) === '<' && fromDirections.push('<')
        getNodeDirection(grid, row + 1, col) === '^' && fromDirections.push('^')
        getNodeDirection(grid, row, col - 1) === '>' && fromDirections.push('>')

        if (fromDirections.length === 1) {
          token.node.inDirection = fromDirections[0]
        } else {
          token.node.inDirection = token.node.direction
        }
      }
    }
  }

  grid.network = {
    nodes,
    tick (delta) {
      delta = Math.min(delta, MAX_DELTA)
      let isRunning = false
      for (const node of nodes) {
        isRunning = node.tick(delta) || isRunning
      }
      return isRunning
    }
  }
}

function getNode (grid, row, col) {
  const token = grid[row][col]
  switch (token.type) {
    case 'SPLITTER_LEFT':
      return token.node.leftNode
    case 'SPLITTER_RIGHT':
      switch (token.direction) {
        case '^': return grid[row][col - 1].node.rightNode
        case '>': return grid[row - 1][col].node.rightNode
        case 'v': return grid[row][col + 1].node.rightNode
        case '<': return grid[row + 1][col].node.rightNode
      }
      break
    default:
      return token.node
  }
}

function getNodeDirection (grid, row, col) {
  if (row < 0 || row >= grid.height || col < 0 || col >= grid.width) return
  const token = grid[row][col]
  return token && token.type !== 'UNDERGROUND_DOWN' && token.node && token.node.direction
}

// To avoid infinite loops, every node's `outputNode` is a `{ row, col }`
// reference that is resolved after all the nodes are created.
function createNode (grid, row, col, fromToken) {
  const token = grid[row][col]
  if (!token) throw new Error(`A node is missing an output.\n${JSON.stringify(fromToken, null, 2)}`)

  if (!token.isProcessed) {
    token.isProcessed = true
    switch (token.type) {
      case 'INPUT':
        if (fromToken) throw new Error('Cannot output into an input block.')
        switch (token.direction) {
          case '^': return new Input(token.count, token.direction, createNode(grid, row - 2, col, token))
          case '>': return new Input(token.count, token.direction, createNode(grid, row, col + 2, token))
          case 'v': return new Input(token.count, token.direction, createNode(grid, row + 2, col, token))
          case '<': return new Input(token.count, token.direction, createNode(grid, row, col - 2, token))
        }
        break
      case 'INPUT_DIRECTION':
        throw new Error('Cannot output into an input directional indicator.')
      case 'OUTPUT':
        if (fromToken.type !== 'OUTPUT_DIRECTION') throw new Error('Cannot output directly into an output block.')
        token.node = new Output()
        break
      case 'OUTPUT_DIRECTION':
        if (fromToken.direction !== token.direction) throw new Error('Cannot output onto an output directional indicator from the side.')
        switch (token.direction) {
          case '^': return createNode(grid, row - 1, col, token)
          case '>': return createNode(grid, row, col + 1, token)
          case 'v': return createNode(grid, row + 1, col, token)
          case '<': return createNode(grid, row, col - 1, token)
        }
        break
      case 'BELT':
        switch (token.direction) {
          case '^': token.node = new Belt(token.direction, false, createNode(grid, row - 1, col, token)); break
          case '>': token.node = new Belt(token.direction, false, createNode(grid, row, col + 1, token)); break
          case 'v': token.node = new Belt(token.direction, false, createNode(grid, row + 1, col, token)); break
          case '<': token.node = new Belt(token.direction, false, createNode(grid, row, col - 1, token)); break
        }
        break
      case 'UNDERGROUND_DOWN': {
        if (fromToken.direction !== token.direction) throw new Error('Cannot output onto an underground belt from the side.')

        let upRow = row
        let upCol = col
        let incRow, incCol
        switch (token.direction) {
          case '^': [incRow, incCol] = [-1, 0]; break
          case '>': [incRow, incCol] = [0, 1]; break
          case 'v': [incRow, incCol] = [1, 0]; break
          case '<': [incRow, incCol] = [0, -1]; break
        }

        let length = -1
        let nextToken
        do {
          upRow += incRow
          upCol += incCol
          if (upRow < 0 || upRow >= grid.height || upCol < 0 || upCol >= grid.width) throw new Error('An underground belt was not closed properly.')

          nextToken = grid[upRow][upCol]
          ++length
        } while (!(nextToken && nextToken.type === 'UNDERGROUND_UP' && nextToken.direction === token.direction))

        if (length === 0) {
          token.node = new Belt(token.direction, true, createNode(grid, upRow, upCol, token))
        } else {
          const undergroundNode = new UndergroundBelt(length, createNode(grid, upRow, upCol, token))
          token.node = new Belt(token.direction, true, undergroundNode)
          token.node2 = undergroundNode
        }
        break
      }
      case 'UNDERGROUND_UP':
        if (fromToken.type !== 'UNDERGROUND_DOWN') throw new Error('Cannot output directly to the end of an underground belt.')

        switch (token.direction) {
          case '^': token.node = new Belt(token.direction, true, createNode(grid, row - 1, col, token)); break
          case '>': token.node = new Belt(token.direction, true, createNode(grid, row, col + 1, token)); break
          case 'v': token.node = new Belt(token.direction, true, createNode(grid, row + 1, col, token)); break
          case '<': token.node = new Belt(token.direction, true, createNode(grid, row, col - 1, token)); break
        }
        break
      case 'SPLITTER_LEFT':
        if (fromToken.direction !== token.direction) throw new Error('Cannot output onto a splitter from the side.')

        switch (token.direction) {
          case '^':
            token.node = new Splitter(token.direction,
              createNode(grid, row - 1, col, token), createNode(grid, row - 1, col + 1, token))
            break
          case '>':
            token.node = new Splitter(token.direction,
              createNode(grid, row, col + 1, token), createNode(grid, row + 1, col + 1, token))
            break
          case 'v':
            token.node = new Splitter(token.direction,
              createNode(grid, row + 1, col, token), createNode(grid, row + 1, col - 1, token))
            break
          case '<':
            token.node = new Splitter(token.direction,
              createNode(grid, row, col - 1, token), createNode(grid, row - 1, col - 1, token))
            break
        }
        break
      case 'SPLITTER_RIGHT':
        if (fromToken.direction !== token.direction) throw new Error('Cannot output onto a splitter from the side.')

        switch (token.direction) {
          case '^': createNode(grid, row, col - 1, token); break
          case '>': createNode(grid, row - 1, col, token); break
          case 'v': createNode(grid, row, col + 1, token); break
          case '<': createNode(grid, row + 1, col, token); break
        }
        break
    }
  }

  return { row, col }
}

export default attachNetwork
