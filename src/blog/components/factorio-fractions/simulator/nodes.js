/**
 * Every node in the network has the following implementation:
 *   class {
 *     constructor (..., outputNode?),
 *     tick (delta) => Boolean,
 *     addInput (items, fromNode)
 *   }
 *
 * The Splitter class contains two nodes Splitter.leftNode and
 * Splitter.rightNode that follow the above implementation. Splitter.leftNode
 * handles the tick of both nodes. When creating nodes, the SPLITTER_LEFT token
 * will contain the Splitter class which houses both nodes.
 */

export const MAX_DELTA = 0.45 // Should be anything less than 0.5
export const INPUT_SPEED = Math.sqrt(12) / 10 // How far apart the items are

export class Input {
  constructor (count, direction, outputNode) {
    this.count = count
    this.direction = direction
    this.outputNode = outputNode
    this.innerPosition = 0
  }

  tick (delta) {
    if (this.count === 0) {
      return false
    }

    if ((this.innerPosition += delta) >= 0) {
      const overflow = []
      while (this.innerPosition >= 0 && this.count > 0) {
        overflow.push({ position: this.innerPosition, updated: true })
        this.innerPosition -= INPUT_SPEED
        --this.count
      }
      this.outputNode.addInput(overflow, this)
    }

    return true
  }

  addInput (items, fromNode) {
    throw new Error('Cannot input into an Input node.')
  }
}

export class Output {
  constructor () {
    this.count = 0
  }

  tick (delta) {
    return false
  }

  addInput (items, fromNode) {
    this.count += items.length
  }
}

export class Belt {
  constructor (direction, isTransitional, outputNode) {
    this.items = []
    this.inDirection = null // This is calculated in `attachNetwork`.
    this.direction = direction
    this.isTransitional = isTransitional
    this.outputNode = outputNode
  }

  tick (delta) {
    if (this.items.length === 0) {
      return false
    }

    const overflow = []
    for (let i = this.items.length - 1; i >= 0; --i) {
      const item = this.items[i]
      if (item.updated) {
        item.updated = false
        continue
      }

      const newPosition = item.position += delta
      if (newPosition >= 1) {
        this.items.splice(i, 1)
        item.position -= 1
        item.updated = true
        overflow.push(item)
      }
    }
    if (overflow.length) {
      this.outputNode.addInput(overflow, this)
    }

    return true
  }

  addInput (items, fromNode) {
    if (!this.isTransitional && fromNode.direction !== this.inDirection) {
      for (const item of items) {
        item.position += 0.5
      }
    }
    this.items.push(...items)
  }
}

export class UndergroundBelt {
  constructor (length, outputNode) {
    this.items = []
    this.length = length
    this.outputNode = outputNode
  }

  tick (delta) {
    if (this.items.length === 0) {
      return false
    }

    const overflow = []
    for (let i = this.items.length - 1; i >= 0; --i) {
      const item = this.items[i]
      if (item.updated) {
        item.updated = false
        continue
      }

      const newPosition = item.position += delta
      if (newPosition >= this.length) {
        this.items.splice(i, 1)
        item.position -= this.length
        item.updated = true
        overflow.push(item)
      }
    }
    if (overflow.length) {
      this.outputNode.addInput(overflow, this)
    }

    return true
  }

  addInput (items, fromNode) {
    this.items.push(...items)
  }
}

export class Splitter {
  constructor (direction, leftOutputNode, rightOutputNode) {
    this.direction = direction
    this.parity = 1
    this.leftNode = new SplitterLeft(this, direction, leftOutputNode)
    this.rightNode = new SplitterRight(this, direction, rightOutputNode)
  }

  tick (delta) {
    let leftIndex = this.leftNode.items.length - 1
    let rightIndex = this.rightNode.items.length - 1
    if (leftIndex + rightIndex === -2) return false

    const leftItems = this.leftNode.items
    const rightItems = this.rightNode.items
    const leftOverflow = []
    const rightOverflow = []
    const leftSwap = []
    const rightSwap = []

    while (leftIndex >= 0 || rightIndex >= 0) {
      if (rightIndex < 0 || (leftIndex >= 0 && leftItems[leftIndex].position > rightItems[rightIndex].position)) {
        const item = leftItems[leftIndex]
        if (item.updated) {
          item.updated = false
          --leftIndex
          continue
        }
        const beforeSplitter = item.position < 0.5
        const newPosition = item.position += delta
        if (newPosition >= 1) {
          leftItems.splice(leftIndex, 1)
          item.position -= 1
          item.updated = true
          leftOverflow.push(item)
        } else if (beforeSplitter && newPosition >= 0.5) {
          leftItems.splice(leftIndex, 1)
          ;(this.parity === 1 ? leftSwap : rightSwap).push(item)
          this.parity *= -1
        }
        --leftIndex
      } else {
        const item = rightItems[rightIndex]
        if (item.updated) {
          item.updated = false
          --rightIndex
          continue
        }
        const beforeSplitter = item.position < 0.5
        const newPosition = item.position += delta
        if (newPosition >= 1) {
          rightItems.splice(rightIndex, 1)
          item.position -= 1
          item.updated = true
          rightOverflow.push(item)
        } else if (beforeSplitter && newPosition >= 0.5) {
          rightItems.splice(rightIndex, 1)
          ;(this.parity === 1 ? leftSwap : rightSwap).push(item)
          this.parity *= -1
        }
        --rightIndex
      }
    }

    leftOverflow.length && this.leftNode.outputNode.addInput(leftOverflow, this.leftNode)
    rightOverflow.length && this.rightNode.outputNode.addInput(rightOverflow, this.rightNode)
    leftSwap.length && this.leftNode.addInput(leftSwap, this.rightNode)
    rightSwap.length && this.rightNode.addInput(rightSwap, this.leftNode)

    return true
  }
}

export class SplitterLeft {
  constructor (splitter, direction, outputNode) {
    this.splitter = splitter
    this.items = []
    this.direction = direction
    this.outputNode = outputNode
  }

  tick (delta) {
    return this.splitter.tick(delta)
  }

  addInput (items, fromNode) {
    this.items.push(...items)
    this.items.sort((a, b) => a.position - b.position)
  }
}

export class SplitterRight {
  constructor (splitter, direction, outputNode) {
    this.splitter = splitter
    this.items = []
    this.direction = direction
    this.outputNode = outputNode
  }

  tick (delta) {
    return false
  }

  addInput (items, fromNode) {
    this.items.push(...items)
    this.items.sort((a, b) => a.position - b.position)
  }
}
