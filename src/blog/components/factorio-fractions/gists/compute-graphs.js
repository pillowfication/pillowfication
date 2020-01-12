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
  if (maxIndex === 1) {
    return false
  }

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
    if (incrementRow(graph[i], i, size - 1)) {
      return true
    }
  }
  return false
}

function computeGraphs (size, search) { // eslint-disable-line no-unused-vars
  const edges = Array(size).fill(0).map(n => [n])
  edges[0][0] = 1
  const fractions = [new Fraction(0, 1), new Fraction(1, 1)]

  do {
    const outputs = calculateOutputs(edges)
    if (!outputs) continue
    for (const frac of allFractions(outputs)) {
      if (!fractions.find(inSet => inSet.equals(frac))) {
        fractions.push(frac)

        if (search && frac.equals(search)) {
          return { edges, outputs }
        }
      }
    }
  } while (incrementGraph(edges, size))

  return search ? null : fractions.sort((a, b) => a.q !== b.q ? a.q - b.q : a.p - b.p)
}

// const SIZE = 3
// const search = new Fraction(1, 5)
// const results = computeGraphs(SIZE, search)
//
// if (search) {
//   console.log(results)
// } else {
//   for (let q = 2; q < (1 << SIZE); ++q) {
//     for (let p = 1; p < q; ++p) {
//       const frac = new Fraction(p, q)
//       if (frac.p !== p) continue
//       if (!results.find(inSet => inSet.equals(frac))) {
//         console.log(frac)
//       }
//     }
//   }
// }

const MAX_SIZE = 6

function createData (maxSize) {
  const fractions = [new Fraction(0, 1), new Fraction(1, 1)]
  const results = []

  for (let size = 2; size <= maxSize; ++size) {
    console.log('SIZE', size)
    const edges = Array(size).fill(0).map(n => [n])
    edges[0][0] = 1

    do {
      const outputs = calculateOutputs(edges)
      if (!outputs) continue

      const hasNew = []
      for (const frac of allFractions(outputs)) {
        if (!fractions.find(inSet => inSet.equals(frac))) {
          fractions.push(frac)
          hasNew.push(frac)
        }
      }

      if (hasNew.length) {
        let allPowersOf2 = true
        for (const { q } of hasNew) {
          if (q <= 1 || (q & (q - 1)) !== 0) {
            allPowersOf2 = false
          }
          break
        }
        if (allPowersOf2) {
          continue
        }

        results.push({
          system: {
            edges: edges.map(r => r.slice()),
            outputs: outputs.map(f => f ? `${f.p}/${f.q}` : null)
          },
          solves: hasNew.map(f => `${f.p}/${f.q}`)
        })
      }
    } while (incrementGraph(edges, size))
  }

  console.log('WRITING')
  require('fs').writeFileSync(require('path').resolve('./results.json'), JSON.stringify(results) + '\n')
}
createData(MAX_SIZE)

console.log('DONE')
