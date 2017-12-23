import React, { Component } from 'react'
import stats from './stats.json'

import BarGraph from '../BarGraph.jsx'
import zf from '../../foundation.scss'

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

class Statistics extends Component {
  render () {
    const lengthStats = []
    for (let length = 2; length <= 15; ++length) {
      lengthStats.push({
        label: `${length}`,
        value: stats.lengthFrequency[length]
      })
    }

    const letterStats = []
    for (const letter of letters) {
      letterStats.push({
        label: letter,
        value: stats.letterFrequency[letter]
      })
    }

    return (
      <div className={`${zf.gridX} ${zf.gridMarginX}`}>
        <div className={`${zf.cell} ${zf.small12} ${zf.medium6}`}>
          <BarGraph title='Word Length Frequencies' stats={lengthStats} />
        </div>
        <div className={`${zf.cell} ${zf.small12} ${zf.medium6}`}>
          <BarGraph title='Letter Frequencies' stats={letterStats} />
        </div>
      </div>
    )
  }
}

export default Statistics
