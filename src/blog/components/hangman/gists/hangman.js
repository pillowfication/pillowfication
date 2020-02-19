const sowpods = require('pf-sowpods')
const { Fraction } = require('./math')
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

// Split up SOWPODS by word length
const sowpodsByLength = {}
for (const word of sowpods) {
  const group = sowpodsByLength[word.length] || (sowpodsByLength[word.length] = [])
  group.push(word)
}

function findMatchingWords (template, misses) {
  const matchingWords = []

  /* eslint-disable no-labels */
  check: for (const word of sowpodsByLength[template.length]) {
    for (const miss of misses) {
      if (~word.indexOf(miss)) continue check
    }
    for (let i = 0; i < template.length; ++i) {
      if (template[i] !== '_' && template[i] !== word[i]) continue check // Letter at template doesn't match letter in word
      if (template[i] === '_' && ~template.indexOf(word[i])) continue check // Template is blank for a letter already guessed
    }
    matchingWords.push(word)
  }
  /* eslint-enable no-labels */

  return matchingWords
}

function applyGuess (template, misses, word, guess) {
  if (!~word.indexOf(guess)) {
    return { template, misses: (misses + guess).split('').sort().join('') }
  }

  let newTemplate = ''
  for (let i = 0; i < template.length; ++i) {
    newTemplate += template[i] === '_' ? (word[i] === guess ? guess : '_') : template[i]
  }
  return { template: newTemplate, misses }
}

function getLetterFrequencies (words, skip) {
  return ALPHABET.map(letter =>
    ~skip.indexOf(letter)
      ? 0
      : words.filter(word => ~word.indexOf(letter)).length
  )
}

let strategyCache = {}

// Guess the most common valid letter.
// If there is a tie, choose either letter randomly.
function strategy1 (template, misses) {
  const key = template + ',' + misses
  if (strategyCache[key]) {
    return strategyCache[key]
  }

  const matchingWords = findMatchingWords(template, misses)
  const letterFrequencies = getLetterFrequencies(matchingWords, template + misses)

  const max = Math.max(...letterFrequencies)
  for (let i = 0; i < ALPHABET.length; ++i) {
    letterFrequencies[i] = letterFrequencies[i] === max ? 1 : 0
  }
  return (strategyCache[key] = {
    guesses: letterFrequencies,
    sum: letterFrequencies.reduce((acc, curr) => acc + curr, 0)
  })
}

// Guess all possible letters weighted by how often they appear in the
// remaining valid words.
function strategy2 (template, misses) {
  const key = template + ',' + misses
  if (strategyCache[key]) {
    return strategyCache[key]
  }

  const matchingWords = findMatchingWords(template, misses)
  const letterFrequencies = getLetterFrequencies(matchingWords, template + misses)

  return (strategyCache[key] = {
    guesses: letterFrequencies,
    sum: letterFrequencies.reduce((acc, curr) => acc + curr, 0)
  })
}

// Guess the letter that most restricts the number of valid words
function strategy3 (template, misses) {
  const key = template + ',' + misses
  if (strategyCache[key]) {
    return strategyCache[key]
  }

  const matchingWords = findMatchingWords(template, misses)
  const letterScores = ALPHABET.map(letter => {
    if (~template.indexOf(letter) || ~misses.indexOf(letter)) {
      return Number.MAX_SAFE_INTEGER
    }

    let sumLengths = 0
    for (const validWord of matchingWords) {
      const { template: nextTemplate, misses: nextMisses } = applyGuess(template, misses, validWord, letter)
      sumLengths += findMatchingWords(nextTemplate, nextMisses).length
    }
    return sumLengths
  })

  const min = Math.min(...letterScores)
  for (let i = 0; i < ALPHABET.length; ++i) {
    letterScores[i] = letterScores[i] === min ? 1 : 0
  }
  return (strategyCache[key] = {
    guesses: letterScores,
    sum: letterScores.reduce((acc, curr) => acc + curr, 0)
  })
}

function scoreWordExact (word, strategy) {
  strategyCache = {}
  const scoreCache = {}

  function computeScore (template, misses) {
    const key = template + ',' + misses
    if (scoreCache[key]) {
      return scoreCache[key]
    }

    let score
    if (template === word) {
      score = new Fraction(misses.length, 1)
    } else {
      score = new Fraction(0, 1)
      const { guesses, sum } = strategy(template, misses)
      for (let i = 0; i < ALPHABET.length; ++i) {
        if (guesses[i] > 0) {
          const { template: nextTemplate, misses: nextMisses } = applyGuess(template, misses, word, ALPHABET[i])
          score = score.add(computeScore(nextTemplate, nextMisses).multiply(new Fraction(guesses[i], sum)))
        }
      }
    }

    return (scoreCache[key] = score)
  }

  return computeScore('_'.repeat(word.length), '')
}

function scoreWordMC (word, strategy, trials) {
  strategyCache = {}
  const scores = []

  for (let n = 0; n < trials; ++n) {
    let template = '_'.repeat(word.length)
    let misses = ''

    while (template !== word) {
      const { guesses, sum } = strategy(template, misses)
      const guessIndex = sum * Math.random()
      let freqSum = guesses[0]
      let letterIndex = 0
      while (freqSum < guessIndex) {
        ++letterIndex
        freqSum += guesses[letterIndex]
      }
      ({ template, misses } = applyGuess(template, misses, word, ALPHABET[letterIndex]))
    }

    scores.push(misses.length)
  }

  return scores
}

if (require.main === module) {
  // Write results
  const fs = require('fs')
  const path = require('path')
  const RESULTS_PATH = path.resolve(__dirname, './results.csv')
  const TRIALS = 100

  try {
    let skip
    if (fs.existsSync(RESULTS_PATH)) {
      const csv = fs.readFileSync(RESULTS_PATH).toString().split('\n')
      csv.pop()

      const lastWord = csv.pop().split(',')[0]
      skip = sowpods.indexOf(lastWord) + 1
    } else {
      throw new Error('Are you sure? :(')
      // fs.writeFileSync(RESULTS_PATH, 'word,strategy1,strategy2\n')
    }

    for (let i = skip || 0; i < sowpods.length; ++i) {
      const word = sowpods[i]
      console.log((i / sowpods.length).toFixed(2), word)

      const result1 = scoreWordExact(word, strategy1)
      const result2 = scoreWordMC(word, strategy2, TRIALS)
      fs.appendFileSync(RESULTS_PATH, [
        word,
        result1.q === 1 ? result1.p : result1.p + '/' + result1.q,
        (result2.reduce((acc, curr) => acc + curr, 0) / TRIALS).toFixed(2)
      ].join(',') + '\n')
    }
  } catch (err) {
    console.error(err)
  }
} else {
  module.exports = {
    strategy1,
    strategy2,
    strategy3,
    scoreWordExact,
    scoreWordMC
  }
}
