const fs = require('fs')
const path = require('path')
const RESULTS_PATH = path.resolve(__dirname, './results.csv')
const { Fraction } = require('./math')
const { strategy2, scoreWordMC } = require('./hangman')

const results = fs.readFileSync(RESULTS_PATH).toString().split('\n')
results.shift()
results.pop()

const raw = []
const data1 = {}
const data2 = {}

function push (data, len, val) {
  const bucket = data[len] || (data[len] = [])
  bucket.push(val)
}

for (const line of results) {
  const [d1, d2, d3] = line.split(',')

  const length = d1.length
  const diff1 = d2.indexOf('/') === -1 ? new Fraction(Number(d2), 1) : new Fraction(...d2.split('/').map(Number))
  const diff2 = Number(d3)

  raw.push({ word: d1, diff1: diff1.p / diff1.q, diff2 })
  push(data1, length, diff1)
  push(data2, length, diff2)
}

function getBoxPlotData (vals) {
  const length = vals.length
  const min = vals[0]
  const max = vals[length - 1]
  const Q1 = vals[length / 4 | 0]
  const Q2 = vals[length / 2 | 0]
  const Q3 = vals[length / 4 * 3 | 0]
  return [min, Q1, Q2, Q3, max]
}

const result1 = {}
const result2 = {}

for (const key in data1) {
  result1[key] = getBoxPlotData(data1[key].sort((a, b) => a.greaterThan(b) ? 1 : -1)).map(a => a.p / a.q)
}
for (const key in data2) {
  result2[key] = getBoxPlotData(data2[key].sort((a, b) => a - b))
}

// STRAT 1
const strat1 = {
  diff: result1,
  words: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].reduce((acc, curr) => {
    acc[curr] = raw
      .filter(data => data.word.length === curr)
      .sort((a, b) => b.diff1 - a.diff1)
      .slice(0, 10)
      .map(data => ({ word: data.word, diff: data.diff1 }))
    return acc
  }, {})
}

// STRAT 2
const TRIALS = 1000
const hardest = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].reduce((acc, curr) => {
  acc[curr] = raw
    .filter(data => data.word.length === curr)
    .sort((a, b) => b.diff2 - a.diff2)
    .slice(0, 10)
    .map(data => data.word)
  return acc
}, {})
for (let i = 2; i <= 15; ++i) {
  console.log(i)
  for (let j = 0; j < hardest[i].length; ++j) {
    const word = hardest[i][j]
    const diff = scoreWordMC(word, strategy2, TRIALS).reduce((acc, curr) => acc + curr, 0) / TRIALS
    hardest[i][j] = { word, diff }
  }
  hardest[i] = hardest[i].sort((a, b) => b.diff - a.diff)
}

const strat2 = {
  diff: result2,
  words: hardest
}

fs.writeFileSync(path.resolve(__dirname, './hangman-data.json'), JSON.stringify({ strat1, strat2 }))
