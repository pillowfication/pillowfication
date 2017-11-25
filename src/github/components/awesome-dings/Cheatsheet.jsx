import React, { Component } from 'react'

import zf from '../../foundation.scss'
import ad from './awesome-dings.scss'
import styles from './AwesomeDings.scss'

const START_CODE = 0x21
const END_CODE = 0xFF

function toHex2 (num) {
  return '0x' + ('0' + num.toString(16).toUpperCase()).substr(-2)
}

class Cheatsheet extends Component {
  render () {
    return (
      <section>
        <h3>Cheatsheet</h3>
        <div className={zf.tableScroll}>
          <table className={styles.cheatsheet}>
            <thead>
              <tr>
                <th>ASCII</th>
                <th>Hex</th>
                <th>Symbol</th>
                <th>Webdings</th>
                <th>Wingdings 1</th>
                <th>Wingdings 2</th>
                <th>Wingdings 3</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                const rows = []

                for (let code = START_CODE; code <= END_CODE; ++code) {
                  const char = String.fromCharCode(code)
                  rows.push(
                    <tr key={code}>
                      <td>{code}</td>
                      <td>{toHex2(code)}</td>
                      <td><code>{char}</code></td>
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
