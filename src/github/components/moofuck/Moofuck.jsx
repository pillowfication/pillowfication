import React, { Component } from 'react'
import { execute, transpile } from 'moofuck'

import Page from '../Page.jsx'
import zf from '../../foundation.scss'
import styles from './Moofuck.scss'

class Moofuck extends Component {
  render () {
    return (
      <Page title='moofuck' github='pillowfication/moofuck'>
        <section>
          <p>Moofuck is a language designed to consist entirely of “moo”s. A “moo” ends with either a <code>LF</code> or <code>CRLF</code>. Anything else is ignored. 3 “moo”s in a row form a codon, and the 8 possible codons are mapped to the 8 <a href='https://en.wikipedia.org/wiki/Brainfuck'>Brainfuck</a> commands as follows:</p>
          <div className={zf.tableScroll}>
            <table className={styles.mappingTable}>
              <thead>
                <tr>
                  <th>Moofuck</th>
                  <th>Brainfuck</th>
                  <th className={styles.meaning}>Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>LF LF LF</code></td>
                  <td><code>></code></td>
                  <td>Increment the data pointer</td>
                </tr>
                <tr>
                  <td><code>LF LF CRLF</code></td>
                  <td><code>{'<'}</code></td>
                  <td>Decrement the data pointer</td>
                </tr>
                <tr>
                  <td><code>LF CRLF LF</code></td>
                  <td><code>+</code></td>
                  <td>Increment the byte at the data pointer</td>
                </tr>
                <tr>
                  <td><code>LF CRLF CRLF</code></td>
                  <td><code>-</code></td>
                  <td>Decrement the byte at the data pointer</td>
                </tr>
                <tr>
                  <td><code>CRLF LF LF</code></td>
                  <td><code>.</code></td>
                  <td>Output the byte at the data pointer</td>
                </tr>
                <tr>
                  <td><code>CRLF LF CRLF</code></td>
                  <td><code>,</code></td>
                  <td>Accept one byte of input and store its value in the byte at the data pointer</td>
                </tr>
                <tr>
                  <td><code>CRLF CRLF LF</code></td>
                  <td><code>[</code></td>
                  <td>If the byte at the data pointer is 0, jump the instruction pointer forward to the matching <code>]</code></td>
                </tr>
                <tr>
                  <td><code>CRLF CRLF CRLF</code></td>
                  <td><code>]</code></td>
                  <td>Jump the instruction pointer back to the matching <code>[</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </Page>
    )
  }
}

export default Moofuck
