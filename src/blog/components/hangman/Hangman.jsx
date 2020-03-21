import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { registerBlog } from '../Blog.jsx'
import Footnotes from '../../../shared/Footnotes.jsx'
import HideShow from '../../../shared/HideShow.jsx'
import $ from '../../../shared/Math.jsx'

import styles from './Hangman.scss'
import zf from '../../../foundation.scss'
import hangmanData from './gists/hangman-data.json'

const LENGTHS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

class HangmanGame extends Component {
  render () {
    return (
      <div className={styles.hangmanGame}>
        <div>{this.props.template}</div>
        {this.props.misses &&
          <div>
            {this.props.misses.split('')
              .map((letter, index) => <span key={index} className={styles.miss}>{letter}</span>)}
          </div>}
      </div>
    )
  }
}

HangmanGame.propTypes = {
  template: PropTypes.string.isRequired,
  misses: PropTypes.string
}

class WordsTable extends Component {
  render () {
    return (
      <div className={zf.scroller}>
        <table className={classnames(styles.wordsTable)}>
          <tbody>
            {LENGTHS.map(length =>
              <tr key={length}>
                {this.props.data[length].map(datum =>
                  <td key={datum.word}>
                    <span className={styles.word}>{datum.word}</span>
                    <br />
                    <span className={styles.difficulty}>{datum.diff.toFixed(2)}</span>
                  </td>
                )}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

WordsTable.propTypes = {
  data: PropTypes.object.isRequired
}

function offset (percent, offset) {
  return `calc(${percent}% - ${offset}px)`
}

class LengthsPlot extends Component {
  render () {
    return (
      <div className={styles.lengthsPlot}>
        <div className={styles.header}>{this.props.header}</div>
        <div className={styles.body}>
          {[0, 5, 10, 15, 20].map(difficulty =>
            <div className={styles.gridLine} key={difficulty} style={{ bottom: offset(difficulty * 5, 0.5) }}>
              <div className={styles.label}><$ $={String(difficulty)} /></div>
              <div className={styles.line} />
            </div>
          )}
          <div className={styles.boxPlotContainer}>
            {LENGTHS.map(length => {
              const [min, Q1, Q2, Q3, max] = this.props.data[length]
              return (
                <div key={length} className={styles.boxPlot}>
                  <div className={styles.whiskers} style={{ top: offset((20 - max) * 5, 0.5), bottom: offset(min * 5, 0.5) }} />
                  <div className={styles.box} style={{ top: offset((20 - Q3) * 5, 0.5), bottom: offset(Q1 * 5, 0.5) }} />
                  <div className={styles.median} style={{ bottom: offset(Q2 * 5, 1) }} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

LengthsPlot.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired
}

class Hangman extends Component {
  render () {
    const { createReference, createFootnotes } = new Footnotes()

    return (
      <>
        <section>
          <h2>Rules of the Game</h2>
          <p>
            The game of <a href='https://en.wikipedia.org/wiki/Hangman_(game)'>Hangman</a> involves one player thinking of a word or phrase, and another player guessing that word by guessing letters one at a time to reveal information. If the guesser guesses too many letters incorrectly, that player loses.
          </p>
          <p>What is the most difficult Hangman word to guess?</p>
        </section>

        <section>
          <h2>Strategy 1 (most common letter)</h2>
          <p>In this article, I assume that the only valid words are those listed in a certain version of the <a href='https://github.com/pillowfication/pf-sowpods'>SOWPODS dictionary</a>. This dictionary does not include proper nouns and does not include words longer than 15 letters.</p>
          <p>A typical strategy involves</p>
          <ol>
            <li>determining all words that match a given template, then</li>
            <li>determining which letter appears in most of the valid words.</li>
          </ol>
          <p>If multiple letters have the same rank in Step 2, then any is chosen with equal probability. The difficulty of a word under this strategy is the average number of misses made before the word is guessed. The most difficult words by length are listed in the following table:</p>
          <HideShow showText='Show Table' hideText='Hide Table'>
            <WordsTable data={hangmanData.strat1.words} />
          </HideShow>
          <p>Typically, shorter words are more difficult than longer words, with the most difficult being <a href='https://www.oed.com/view/Entry/61244141'><samp>JAI</samp></a> (or <samp>KOI</samp> for a common word). However, a human player may find longer words to be harder. This is because the challenge of Hangman lies in Step 1. I asked several players to guess two words:</p>
          <ol>
            <li><samp>VISUALIZED</samp>—10-letter word with difficult 0.</li>
            <li><samp>BAKING</samp>—6-letter word with difficulty 11.58.</li>
          </ol>
          <p>One player reached the state</p>
          <HangmanGame template='_IS___I__D' misses='NT' />
          <p>of which only 2 valid words remained.{createReference('mis')} The player was unable to find either easily and ended with 12 misses. The difficulty of this word also came from the presence of a <samp>V</samp> and <samp>Z</samp> which human players tend to disregard. The best score I saw was 7.</p>
          <p>On the other hand, many players reached the state</p>
          <HangmanGame template='_A_ING' misses='???' />
          <p>and they were aware that many, many words fit this template.{createReference('bak')} Guessing the word became a game of chance, which a computer cannot overcome either. The best score I saw was 8.</p>
        </section>

        <section>
          <h2>Strategy 2 (all valid letters)</h2>
          <p>An alternate strategy generalizes Step 2 of Strategy 1. Instead of guessing only the letter that is most common, the computer will guess any valid letter with probability proportional to the letter’s frequency in the remaining words.</p>
          <p>Some “easy” words became more difficult, because the computer now had a small chance to guess uncommon letters that missed. But “hard” words also became easier, because if the computer happened to guess an uncommon letter that was correct, the number of valid words would decrease dramatically. Compare the distribution of difficulties between Strategy 1 and Strategy 2 by word length.{createReference('dif')}</p>
          <div className={classnames(zf.gridX, zf.gridPaddingX)}>
            <div className={classnames(zf.cell, zf.medium6)}>
              <LengthsPlot header='Strategy 1' data={hangmanData.strat1.diff} />
            </div>
            <div className={classnames(zf.cell, zf.medium6)}>
              <LengthsPlot header='Strategy 2' data={hangmanData.strat2.diff} />
            </div>
          </div>
          <p>Strategy 2 plays more consistently so it is harder to outplay, but it is worse overall. These are the best words for Strategy 2:{createReference('di2')}</p>
          <HideShow showText='Show Table' hideText='Hide Table'>
            <WordsTable data={hangmanData.strat2.words} />
          </HideShow>
          <p>Strategy 2 does the worst when the word contains very uncommon letters such as <samp>J</samp> and <samp>Z</samp>, and like Strategy 1, it finds repeated letters difficult.</p>
        </section>

        <section>
          <h2>Strategy 3 (most knowledge)</h2>
          <p>For another strategy, the focus is on the number of valid words remaining after every guess. To judge the value of guessing the letter <samp>A</samp>, first all currently valid words are assumed to be in play with equal probability. The guess of <samp>A</samp> is applied to each valid word, and all the valid words after each application are counted up. The guess that results in the fewest number of valid words is chosen. Again, if multiple letters tie, then either is chosen with equal probability.</p>
          <p>This strategy was too computationally expensive for me to calculate anything meaningful. It seems to perform the worst too, since it disregards whether a guess is likely to be right or wrong.{createReference('st3')}</p>
        </section>

        <section>
          <h2>Data</h2>
          <p>All the data can be found on the <a href='https://github.com/pillowfication/pillowfication/tree/master/src/blog/components/hangman/gists'>GitHub repo</a>.</p>
        </section>

        <hr />
        {createFootnotes({
          mis: (
            <p>
              The other word is <samp>MISCLAIMED</samp>.
            </p>
          ),
          bak: (
            <p>
              102 words match <samp>_A_ING</samp>, and the frequencies of remaining letters are somewhat evenly distributed.<br />
              <samp>B</samp>-6, <samp>C</samp>-11, <samp>D</samp>-11, <samp>E</samp>-7, <samp>F</samp>-10, <samp>H</samp>-11, <samp>J</samp>-3, <samp>K</samp>-10, <samp>L</samp>-13, <samp>M</samp>-12, <samp>O</samp>-1, <samp>P</samp>-10, <samp>Q</samp>-0, <samp>R</samp>-23, <samp>S</samp>-12, <samp>T</samp>-15, <samp>U</samp>-0, <samp>V</samp>-8, <samp>W</samp>-19, <samp>X</samp>-5, <samp>Y</samp>-10, <samp>Z</samp>-6.
            </p>
          ),
          dif: (
            <p>
              While the difficulty values for Strategy 1 were computed exactly, the values for Strategy 2 were approximated. Computing the probabilities of every possible path became too time-consuming, so instead the computer played every word 100 times and averaged the results. In some instances, the difficulty could fluctuate by a few points.
            </p>
          ),
          di2: (
            <p>
              After computing difficulties using 100 trials, the top 50 words in each category had their difficulties recalculated using 1000 trials for more accurate rankings. As a result, these values may differ from the data file where only the results using 100 trials were recorded.
            </p>
          ),
          st3: (
            <p>
              Using a dictionary of <samp>ABC</samp>, <samp>BAC</samp>, <samp>DDD</samp>, <samp>DDE</samp>, Strategy 3 was on average 3.94× worse than Strategy 1 and 3.06× worse than Strategy 2.
            </p>
          )
        })}
      </>
    )
  }
}

export default registerBlog(Hangman, '2020/01/20', 'Hangman')
