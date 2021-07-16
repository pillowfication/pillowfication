/**
 * A blueprint may contain the following tokens:
 *
 * - The tokens [^>v<] represent belts going the specified direction
 *
 * - The token D[^>v<] represents a belt going underground in the specified
 *   direction. It must be closed with a U[^>v<] token in that direction.
 *
 * - The token U[^>v<] represents an underground belt going above ground in the
 *   specified direction. It must be opened with a D[^>v<] token in the
 *   opposite direction.
 *
 * - The token I[digits][^>v<] represents an input block going the specified
 *   direction with the specified count. Note that this takes up two blocks.
 *   For example, I100> indicates an input block with 100 items going
 *   rightwards. For I[digits][>v], the input block is where the token is
 *   specified, and the directional indicator is on the right/bottom of the
 *   input block. For I[digits][^<], the directional indicator is where the
 *   token is, and the input block is on the right/bottom of the directional
 *   indicator.
 *
 * - The token O[^>v<] represents an output block receiving input in the
 *   specified direction. Note that this takes up two blocks. For example, O>
 *   represents an output block that is receiving input fed from the left
 *   (and going rightwards). Positioning of the output block and directional
 *   indicator follows the same rules as I[digits][^>v<], but reversed. O> will
 *   have the directional indicator where the token is specified, with the
 *   output block on the right.
 *
 * - The token S[^>v<] represents a splitter in the specified direction. This
 *   token takes up two blocks. For S[^v], the second block is on the right.
 *   For S[><], the second block is below.
 *
 * - The token _ represents an empty block.
 *
 * The width of the blueprint is determined by the 1st row. If any subsequent
 * rows have tokens beyond this width, they are ignored.
 */

function isWhitespace (char) {
  return /\s/.test(char)
}

function isNumber (char) {
  const charCode = char.charCodeAt(0)
  return charCode >= 48 && charCode <= 57
}

function isDirection (char) {
  return char === '^' || char === '>' || char === 'v' || char === '<'
}

function getTokenLength (token) {
  if (!token) {
    return 1
  }

  if (token.type === 'INPUT' || token.type === 'OUTPUT') {
    if (token.direction === '>' || token.direction === '<') {
      return 2
    }
  }

  if (token.type === 'SPLITTER') {
    if (token.direction === '^' || token.direction === 'v') {
      return 2
    }
  }

  return 1
}

function throwBoundsError (token, row, col) {
  throw new Error(`Token '${token.type}' (${row}:${col}) is out of bounds.`)
}

function tokenizeBlueprint (blueprint) {
  // `rawTokens` contains the tokens as specified in the blueprint
  const rawTokens = blueprint.split('\n').map(blueprintRow => {
    const tokens = []
    let index = 0
    while (index < blueprintRow.length) {
      const char = blueprintRow[index]
      switch (char) {
        case 'I': {
          let count = ''
          while (isNumber(blueprintRow[++index])) {
            count += blueprintRow[index]
          }

          if (count === '') throw new Error('Input block must have a count specified.')
          if (!isDirection(blueprintRow[index])) throw new Error('Input block must have a direction specified.')

          tokens.push({
            type: 'INPUT',
            count: Number(count),
            direction: blueprintRow[index]
          })
          break
        }
        case 'O':
          if (!isDirection(blueprintRow[++index])) throw new Error('Output block must have a direction specified.')

          tokens.push({
            type: 'OUTPUT',
            direction: blueprintRow[index]
          })
          break
        case 'D':
          if (!isDirection(blueprintRow[++index])) throw new Error('Underground belt must have a direction specified.')

          tokens.push({
            type: 'UNDERGROUND_DOWN',
            direction: blueprintRow[index]
          })
          break
        case 'U':
          if (!isDirection(blueprintRow[++index])) throw new Error('Underground belt must have a direction specified.')

          tokens.push({
            type: 'UNDERGROUND_UP',
            direction: blueprintRow[index]
          })
          break
        case 'S':
          if (!isDirection(blueprintRow[++index])) throw new Error('Splitter must have a direction specified.')

          tokens.push({
            type: 'SPLITTER',
            direction: blueprintRow[index]
          })
          break
        case '_':
          tokens.push(null)
          break
        default:
          if (!isWhitespace(char)) {
            if (!isDirection(char)) throw new Error(`Unexpected character \`${char}\`.`)

            tokens.push({
              type: 'BELT',
              direction: char
            })
          }
          break
      }
      ++index
    }
    return tokens
  })

  // After rawTokens is parsed, some tokens need to be expanded since they take
  // up multiple blocks. However, each token can only consume additional blocks
  // on the right or bottom of it.
  const width = rawTokens[0].reduce((acc, curr) => acc + getTokenLength(curr), 0)
  const height = rawTokens.length

  const grid = []
  for (let row = 0; row < height; ++row) {
    grid.push(Array(width))
  }
  grid.width = width
  grid.height = height

  for (let row = 0; row < height; ++row) {
    for (let col = 0, tokensIndex = 0; col < width; ++col, ++tokensIndex) {
      while (grid[row][col]) {
        ++col
      }
      const token = rawTokens[row][tokensIndex]
      if (!token) continue

      switch (token.type) {
        case 'INPUT': {
          const directionalToken = { type: 'INPUT_DIRECTION', direction: token.direction }
          switch (token.direction) {
            case '^':
              if (row >= height - 1) throwBoundsError(token, row, col)
              grid[row + 1][col] = token
              grid[row][col] = directionalToken
              break
            case '>':
              if (col >= width - 1) throwBoundsError(token, row, col)
              grid[row][col] = token
              grid[row][col + 1] = directionalToken
              break
            case 'v':
              if (row >= height - 1) throwBoundsError(token, row, col)
              grid[row][col] = token
              grid[row + 1][col] = directionalToken
              break
            case '<':
              if (col >= width - 1) throwBoundsError(token, row, col)
              grid[row][col + 1] = token
              grid[row][col] = directionalToken
              break
          }
          break
        }
        case 'OUTPUT': {
          const directionalToken = { type: 'OUTPUT_DIRECTION', direction: token.direction }
          switch (token.direction) {
            case '^':
              if (row >= height - 1) throwBoundsError(token, row, col)
              grid[row][col] = token
              grid[row + 1][col] = directionalToken
              break
            case '>':
              if (col >= width - 1) throwBoundsError(token, row, col)
              grid[row][col + 1] = token
              grid[row][col] = directionalToken
              break
            case 'v':
              if (row >= height - 1) throwBoundsError(token, row, col)
              grid[row + 1][col] = token
              grid[row][col] = directionalToken
              break
            case '<':
              if (col >= width - 1) throwBoundsError(token, row, col)
              grid[row][col] = token
              grid[row][col + 1] = directionalToken
              break
          }
          break
        }
        case 'SPLITTER': {
          const leftToken = { type: 'SPLITTER_LEFT', direction: token.direction }
          const rightToken = { type: 'SPLITTER_RIGHT', direction: token.direction }
          switch (token.direction) {
            case '^':
              if (col >= width - 1) throwBoundsError(token, row, col)
              grid[row][col] = leftToken
              grid[row][col + 1] = rightToken
              break
            case '>':
              if (row >= height - 1) throwBoundsError(token, row, col)
              grid[row][col] = leftToken
              grid[row + 1][col] = rightToken
              break
            case 'v':
              if (col >= width - 1) throwBoundsError(token, row, col)
              grid[row][col] = rightToken
              grid[row][col + 1] = leftToken
              break
            case '<':
              if (row >= height - 1) throwBoundsError(token, row, col)
              grid[row][col] = rightToken
              grid[row + 1][col] = leftToken
              break
          }
          break
        }
        default:
          grid[row][col] = token
          break
      }
    }
  }

  return grid
}

export default tokenizeBlueprint
