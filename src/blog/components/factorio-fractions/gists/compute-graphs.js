const { Fraction, invertMatrix } = require('./math')

function calculateOutputs (edges) {
  const dimension = edges.length
  const m = [[1, ...Array(dimension).fill(0)]]
  for (let i = 0; i < dimension; ++i) {
    m.push([
      i === 0 ? 1 : 0,
      ...Array(dimension).fill(0).map((_, j) => j === i ? -2 : edges[j].includes(i) ? 1 : 0)
    ])
  }

  const inverse = invertMatrix(m)
  if (!inverse) return null
  const outputs = []
  for (let i = 0; i < dimension; ++i) {
    outputs.push(edges[i].length < 2 ? inverse[i + 1][0] : null)
  }

  const zero = new Fraction(0, 1)
  for (const fraction of outputs) {
    if (fraction !== null && zero.greaterThan(fraction)) {
      return null
    }
  }

  return outputs
}

function allFractions (outputs) {
  const set = [new Fraction(0, 1)]

  for (const output of outputs) {
    if (output === null) continue
    const newSet = set.map(frac => frac.add(output))
    for (const frac of newSet) {
      if (!set.find(inSet => inSet.equals(frac))) {
        set.push(frac)
      }
    }
  }

  return set.sort((a, b) => a.greaterThan(b) ? 1 : -1)
}

function incrementRow (row, rowIndex, maxIndex) {
  if (row.length === 1) {
    const next = row[0] + 1 === rowIndex ? rowIndex + 1 : row[0] + 1
    if (next > maxIndex) {
      row[0] = rowIndex === 0 ? 1 : 0
      row[1] = rowIndex <= 1 ? 2 : 1
    } else {
      row[0] = next
    }
  } else {
    const nextSmall = row[1] + 1 === rowIndex ? rowIndex + 1 : row[1] + 1
    if (nextSmall > maxIndex) {
      const nextBig = row[0] + 1 === rowIndex ? rowIndex + 1 : row[0] + 1
      if (nextBig === maxIndex || (rowIndex === maxIndex && nextBig + 1 === rowIndex)) {
        row.pop()
        row[0] = rowIndex === 0 ? 1 : 0
        return false
      }
      row[0] = nextBig
      row[1] = nextBig + 1 === rowIndex ? rowIndex + 1 : nextBig + 1
    } else {
      row[1] = nextSmall
    }
  }
  return true
}

function incrementGraph (graph, size) {
  for (let i = 0; i < size; ++i) {
    if (incrementRow(graph[i], i, size)) {
      return true
    }
  }
  return false
}

function computeGraphs (size) {
  const edges = Array(size).fill(0).map(n => [n])
  edges[0][0] = 1
  const fractions = [new Fraction(0, 1), new Fraction(1, 1)]

  do {
    const outputs = calculateOutputs(edges)
    if (!outputs) continue
    // let hasNew = false
    for (const frac of allFractions(outputs)) {
      if (!fractions.find(inSet => inSet.equals(frac))) {
        // hasNew = true
        fractions.push(frac)
      }
    }

    // if (hasNew) {
    //   console.log(edges)
    //   console.log(outputs)
    // }
  } while (incrementGraph(edges, size))

  return fractions.sort((a, b) => a.q > b.q ? 1 : a.q < b.q ? -1 : a.p > b.p ? 1 : -1)
}

const SIZE = 7
const results = computeGraphs(SIZE)

for (let q = 2; q < (1 << SIZE); ++q) {
  for (let p = 1; p < q; ++p) {
    const frac = new Fraction(p, q)
    if (frac.p !== p) continue
    if (!results.find(inSet => inSet.equals(frac))) {
      console.log(frac)
    }
  }
}
console.log('DONE')
