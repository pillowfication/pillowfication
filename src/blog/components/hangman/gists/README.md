# Hangman

These gists depend on the [pf-sowpods](https://www.npmjs.com/package/pf-sowpods) package.

The file `hangman.js` contains code for the analyzing the 3 strategies described [here](http://pillowfication.com/blog/hangman). Data on strategies 1 and 2 are in `results.csv`. This file was created by running

```bash
node hangman.js
```

To get results on specific words, you can use

```js
const {
  strategy1,
  strategy2,
  strategy3,
  scoreWordExact,
  scoreWordMC
} = require('./hangman')

const score1 = scoreWordExact('PILLOW', strategy1)
console.log(score1) // Fraction { p: 6, q: 1 }

const score2 = scoreWordMC('PILLOW', strategy1, 100)
console.log(score2.reduce((a, c) => a + c, 0) / 100) // 6.07
```

The functions `scoreWordExact` and `scoreWordMC` are described in the source file.

The file `hangman-anal.js` uses `results.csv` to create the data for the boxplots and tables [here](http://pillowfication.com/blog/hangman). This data is in `hangman-data.json`.
