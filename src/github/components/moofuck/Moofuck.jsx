import React, { Component } from 'react'

import Page from '../Page.jsx'
import Playground from './Playground.jsx'
import zf from '../../foundation.scss'
import styles from './Moofuck.scss'

class Moofuck extends Component {
  render () {
    return (
      <Page title='Moofuck' github='pillowfication/moofuck'>
        <section>
          <p>Moofuck is a language designed to consist entirely of “moo”s. A “moo” ends with either a <kbd>LF</kbd> or <kbd>CRLF</kbd>. Anything else is ignored. 3 “moo”s in a row form a codon, and the 8 possible codons are mapped to the 8 <a href='https://en.wikipedia.org/wiki/Brainfuck'>Brainfuck</a> commands as follows:</p>
          <div className={zf.scroller}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Moofuck</th>
                  <th>Brainfuck</th>
                  <th>Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><kbd>LF LF LF</kbd></td>
                  <td><kbd>></kbd></td>
                  <td className={styles.meaning}>Increment the data pointer</td>
                </tr>
                <tr>
                  <td><kbd>LF LF CRLF</kbd></td>
                  <td><kbd>{'<'}</kbd></td>
                  <td className={styles.meaning}>Decrement the data pointer</td>
                </tr>
                <tr>
                  <td><kbd>LF CRLF LF</kbd></td>
                  <td><kbd>+</kbd></td>
                  <td className={styles.meaning}>Increment the byte at the data pointer</td>
                </tr>
                <tr>
                  <td><kbd>LF CRLF CRLF</kbd></td>
                  <td><kbd>-</kbd></td>
                  <td className={styles.meaning}>Decrement the byte at the data pointer</td>
                </tr>
                <tr>
                  <td><kbd>CRLF LF LF</kbd></td>
                  <td><kbd>.</kbd></td>
                  <td className={styles.meaning}>Output the byte at the data pointer</td>
                </tr>
                <tr>
                  <td><kbd>CRLF LF CRLF</kbd></td>
                  <td><kbd>,</kbd></td>
                  <td className={styles.meaning}>Accept one byte of input and store its value in the byte at the data pointer</td>
                </tr>
                <tr>
                  <td><kbd>CRLF CRLF LF</kbd></td>
                  <td><kbd>[</kbd></td>
                  <td className={styles.meaning}>If the byte at the data pointer is <samp>0</samp>, jump the instruction pointer forward to the matching <kbd>]</kbd></td>
                </tr>
                <tr>
                  <td><kbd>CRLF CRLF CRLF</kbd></td>
                  <td><kbd>]</kbd></td>
                  <td className={styles.meaning}>Jump the instruction pointer back to the matching <kbd>[</kbd></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>All errors are thrown as <kbd>new Error('moo')</kbd>.</p>
        </section>
        <hr />
        <Playground />
      </Page>
    )
  }
}

export default Moofuck
