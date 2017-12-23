const fs = require('fs')
const path = require('path')
const sowpods = require('pf-sowpods')

const FILE_PATH = path.resolve(__dirname, ('./stats.json'))

const stats = {
  lengthFrequency: {
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
    13: 0,
    14: 0,
    15: 0
  },
  letterFrequency: {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
    F: 0,
    G: 0,
    H: 0,
    I: 0,
    J: 0,
    K: 0,
    L: 0,
    M: 0,
    N: 0,
    O: 0,
    P: 0,
    Q: 0,
    R: 0,
    S: 0,
    T: 0,
    U: 0,
    V: 0,
    W: 0,
    X: 0,
    Y: 0,
    Z: 0
  }
}

for (const word of sowpods) {
  ++stats.lengthFrequency[word.length]
  for (const letter of word) {
    ++stats.letterFrequency[letter]
  }
}

fs.writeFileSync(FILE_PATH, JSON.stringify(stats, null, 2) + '\n')
