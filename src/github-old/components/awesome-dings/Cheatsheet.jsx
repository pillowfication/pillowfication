import React, { Component } from 'react'

import zf from '../../foundation.scss'
import fa from '../../font-awesome.scss'
import ad from './awesome-dings.scss'
import styles from './AwesomeDings.scss'

function isControlCharacter (charCode) {
  return charCode <= 31 || charCode === 127
}

function toHex2 (num) {
  return '0x' + ('0' + num.toString(16).toUpperCase()).substr(-2)
}

class Cheatsheet extends Component {
  render () {
    return (
      <section>
        <h3>Cheatsheet</h3>
        <p><a href='http://unicode.org/~asmus/web-wing-ding-ext.pdf'><i className={`${fa.fa} ${fa.faReply} ${fa.faRotate180}`} /> Webdings and Wingdings Symbol Collection</a></p>
        <div className={zf.tableScroll}>
          <table className={styles.cheatsheet}>
            <thead>
              <tr>
                <th>Code</th>
                <th>Hex</th>
                <th>Character</th>
                <th>Webdings</th>
                <th>Wingdings 1</th>
                <th>Wingdings 2</th>
                <th>Wingdings 3</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                const rows = []

                for (let code = 0x00; code <= 0xFF; ++code) {
                  if (isControlCharacter(code)) {
                    continue
                  }

                  const char = String.fromCharCode(0xF000 + code)
                  rows.push(
                    <tr key={code}>
                      <td>{code}</td>
                      <td>{toHex2(code)}</td>
                      <td><code>{String.fromCharCode(code)}</code></td>
                      <td><i className={ad.wdWebdings}>{char}</i></td>
                      <td><i className={ad.wdWingdings1}>{char}</i></td>
                      <td><i className={ad.wdWingdings2}>{char}</i></td>
                      <td><i className={ad.wdWingdings3}>{char}</i></td>
                    </tr>
                  )
                }

                return rows
              })()}
            </tbody>
          </table>
        </div>
      </section>
    )
  }
}

export default Cheatsheet
