const fs = require('fs')
const path = require('path')
const sowpods = require('pf-sowpods')

const filePath = path.resolve(__dirname, ('./stats.json'))
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const stats = {
  lengthFrequency: {
    2: { count: 0 },
    3: { count: 0 },
    4: { count: 0 },
    5: { count: 0 },
    6: { count: 0 },
    7: { count: 0 },
    8: { count: 0 },
    9: { count: 0 },
    10: { count: 0 },
    11: { count: 0 },
    12: { count: 0 },
    13: { count: 0 },
    14: { count: 0 },
    15: { count: 0 },
    total: 0
  },
  letterFrequency: {
    A: { count: 0 },
    B: { count: 0 },
    C: { count: 0 },
    D: { count: 0 },
    E: { count: 0 },
    F: { count: 0 },
    G: { count: 0 },
    H: { count: 0 },
    I: { count: 0 },
    J: { count: 0 },
    K: { count: 0 },
    L: { count: 0 },
    M: { count: 0 },
    N: { count: 0 },
    O: { count: 0 },
    P: { count: 0 },
    Q: { count: 0 },
    R: { count: 0 },
    S: { count: 0 },
    T: { count: 0 },
    U: { count: 0 },
    V: { count: 0 },
    W: { count: 0 },
    X: { count: 0 },
    Y: { count: 0 },
    Z: { count: 0 },
    total: 0
  }
}
const { lengthFrequency, letterFrequency } = stats

for (const word of sowpods) {
  ++lengthFrequency[word.length].count
  ++lengthFrequency.total

  for (const letter of word) {
    ++letterFrequency[letter].count
    ++letterFrequency.total
  }
}

for (let length = 2; length <= 15; ++length) {
  lengthFrequency[length].percentage = lengthFrequency[length].count / lengthFrequency.total * 100
}
letters.forEach(letter => {
  letterFrequency[letter].percentage = letterFrequency[letter].count / letterFrequency.total * 100
})

fs.writeFileSync(filePath, JSON.stringify(stats, null, 2) + '\n')
