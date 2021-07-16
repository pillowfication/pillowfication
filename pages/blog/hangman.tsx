import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Blog from '../../src/blog/Blog'
import Section from '../../src/blog/Section'
import Footnotes from '../../src/Footnotes'
import HangmanGame from '../../src/blog/hangman/HangmanGame'
import LengthsPlot from '../../src/blog/hangman/LengthsPlot'
import WordsTable from '../../src/blog/hangman/WordsTable'
import hangmanData from '../../src/blog/hangman/gists/hangman-data.json'

const useStyles = makeStyles(() => ({
  word: {
    fontFamily: 'monospace',
    fontSize: '1.33em'
  }
}))

const Hangman = (): React.ReactElement => {
  const classes = useStyles()
  const { createReference, createFootnote } = new Footnotes()

  return (
    <Blog title='Hangman' date='2020/01/20'>
      <Section title='Rules of the Game'>
        <Typography paragraph>The game of <Link href='https://en.wikipedia.org/wiki/Hangman_(game)'>Hangman</Link> involves one player thinking of a word or phrase, and another player guessing that word by guessing letters one at a time to reveal information. If the guesser guesses too many letters incorrectly, that player loses.</Typography>
        <Typography paragraph>What is the most difficult Hangman word to guess?</Typography>
      </Section>

      <Section title='Strategy 1 - Most Common Letter'>
        <Typography paragraph>In this article, I assume that the only valid words are those listed in a certain version of <Link href='https://github.com/pillowfication/pf-sowpods'>SOWPODS</Link>. This dictionary does not include proper nouns and does not include words longer than 15 letters.</Typography>
        <Typography>A typical strategy involves</Typography>
        <ol>
          <Typography component='li'>determining all words that match a given template, then</Typography>
          <Typography component='li'>determining which letter appears in most of the valid words.</Typography>
        </ol>
        <Typography paragraph>If multiple letters have the same rank in Step 2, then any is chosen with equal probability. The difficulty of a word under this strategy is the average number of misses made before the word is guessed. The most difficult words by length are listed in the following table:</Typography>
        <WordsTable data={hangmanData.strat1.words} />
        <Typography paragraph>Typically, shorter words are more difficult than longer words, with the most difficult being <Link href='https://www.oed.com/view/Entry/61244141'><Typography component='samp' className={classes.word}>JAI</Typography></Link> (or <Typography component='samp' className={classes.word}>KOI</Typography> for a common word). However, a human player may find longer words to be harder, because Step 1 is extremely difficult to calculate. I asked several players to guess two words:</Typography>
        <ol>
          <Typography component='li'><Typography component='samp' className={classes.word}>VISUALIZED</Typography>—a 10-letter word with difficulty 0.</Typography>
          <Typography component='li'><Typography component='samp' className={classes.word}>BAKING</Typography>—a 6-letter word with difficulty 11.58.</Typography>
        </ol>
        <Typography paragraph>One player reached the state</Typography>
        <HangmanGame template='_IS___I__D' misses='NT' />
        <Typography paragraph>of which only 2 valid words remained.{createReference('mis')} The player was unable to find either easily and ended with 12 misses. The difficulty of this word also came from the presence of a <Typography component='samp' className={classes.word}>V</Typography> and <Typography component='samp' className={classes.word}>Z</Typography> which players tend to overlook. The best score I saw was 7.</Typography>
        <Typography paragraph>On the other hand, many players reached the state</Typography>
        <HangmanGame template='_A_ING' misses='???' />
        <Typography paragraph>and they were aware that many, many words fit this template.{createReference('bak')} Guessing the word became a game of chance, which a computer cannot overcome either. The best score I saw was 8.</Typography>
      </Section>

      <Section title='Strategy 2 - All Valid Letters'>
        <Typography paragraph>An alternate strategy generalizes Step 2 of Strategy 1. Instead of guessing only the letter that is most common, the computer will guess any valid letter with probability proportional to the letter’s frequency in the remaining words.</Typography>
        <Typography paragraph>Some “easy” words became more difficult, because the computer now had a small chance to guess uncommon letters that missed. But “hard” words also became easier, because if the computer happened to guess an uncommon letter that was correct, the number of valid words would decrease dramatically. Compare the distribution of difficulties between Strategy 1 and Strategy 2 by word length.{createReference('dif')}</Typography>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <LengthsPlot header='Strategy 1' data={hangmanData.strat1.diff} />
          </Grid>
          <Grid item md={6}>
            <LengthsPlot header='Strategy 2' data={hangmanData.strat2.diff} />
          </Grid>
        </Grid>
        <Typography paragraph>Strategy 2 plays more consistently so it is harder to outplay, but it is worse overall. These are the best words for Strategy 2:{createReference('di2')}</Typography>
        <WordsTable data={hangmanData.strat2.words} />
        <Typography paragraph>Strategy 2 does the worst when the word contains very uncommon letters such as <Typography component='samp' className={classes.word}>J</Typography> and <Typography component='samp' className={classes.word}>Z</Typography>, and like Strategy 1, it finds repeated letters difficult.</Typography>
      </Section>

      <Section title='Strategy 3 - Most Knowledge'>
        <Typography paragraph>For another strategy, the focus is on the number of valid words remaining after every guess. To judge the value of guessing the letter <Typography component='samp' className={classes.word}>A</Typography>, first all currently valid words are assumed to be in play with equal probability. The guess of <Typography component='samp' className={classes.word}>A</Typography> is applied to each valid word, and all the valid words after each application are counted up. The guess that results in the fewest number of valid words is chosen. Again, if multiple letters tie, then either is chosen with equal probability.</Typography>
        <Typography paragraph>This strategy was too computationally expensive for me to calculate anything meaningful. It seems to perform the worst too, since it disregards whether a guess is likely to be right or wrong.{createReference('st3')}</Typography>
      </Section>

      <Section title='Data'>
        <Typography paragraph>All the data and code used can be found on the <Link href='https://github.com/pillowfication/pillowfication/tree/master/src/blog/components/hangman/gists'>GitHub repo</Link>.</Typography>
      </Section>

      <hr />
      <Section>
        {createFootnote({
          mis: (
            <Typography variant='body2'>
              The other word is <Typography component='samp' className={classes.word}>MISCLAIMED</Typography>.
            </Typography>
          ),
          bak: (
            <Typography variant='body2'>
              102 words match <Typography component='samp' className={classes.word}>_A_ING</Typography>, and the frequencies of remaining letters are somewhat evenly distributed.<br />
              <Typography component='samp' className={classes.word}>B</Typography>-6, <Typography component='samp' className={classes.word}>C</Typography>-11, <Typography component='samp' className={classes.word}>D</Typography>-11, <Typography component='samp' className={classes.word}>E</Typography>-7, <Typography component='samp' className={classes.word}>F</Typography>-10, <Typography component='samp' className={classes.word}>H</Typography>-11, <Typography component='samp' className={classes.word}>J</Typography>-3, <Typography component='samp' className={classes.word}>K</Typography>-10, <Typography component='samp' className={classes.word}>L</Typography>-13, <Typography component='samp' className={classes.word}>M</Typography>-12, <Typography component='samp' className={classes.word}>O</Typography>-1, <Typography component='samp' className={classes.word}>P</Typography>-10, <Typography component='samp' className={classes.word}>Q</Typography>-0, <Typography component='samp' className={classes.word}>R</Typography>-23, <Typography component='samp' className={classes.word}>S</Typography>-12, <Typography component='samp' className={classes.word}>T</Typography>-15, <Typography component='samp' className={classes.word}>U</Typography>-0, <Typography component='samp' className={classes.word}>V</Typography>-8, <Typography component='samp' className={classes.word}>W</Typography>-19, <Typography component='samp' className={classes.word}>X</Typography>-5, <Typography component='samp' className={classes.word}>Y</Typography>-10, <Typography component='samp' className={classes.word}>Z</Typography>-6.
            </Typography>
          ),
          dif: (
            <Typography variant='body2'>
              While the difficulty values for Strategy 1 were computed exactly, the values for Strategy 2 were approximated. Computing the probabilities of every possible path became too time-consuming, so instead the computer played every word 100 times and averaged the results. In some instances, the difficulty could fluctuate by a few points.
            </Typography>
          ),
          di2: (
            <Typography variant='body2'>
              After computing difficulties using 100 trials, the top 50 words in each category had their difficulties recalculated using 1000 trials for more accurate rankings. As a result, these values may differ from the data file where only the results using 100 trials were recorded.
            </Typography>
          ),
          st3: (
            <Typography variant='body2'>
              Using a dictionary of <Typography component='samp' className={classes.word}>ABC</Typography>, <Typography component='samp' className={classes.word}>BAC</Typography>, <Typography component='samp' className={classes.word}>DDD</Typography>, <Typography component='samp' className={classes.word}>DDE</Typography>, Strategy 3 is on average 3.94× worse than Strategy 1 and 3.06× worse than Strategy 2.
            </Typography>
          )
        })}
      </Section>
    </Blog>
  )
}

export default Hangman
