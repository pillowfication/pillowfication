import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './BarGraph.scss'

class BarGraph extends Component {
  render () {
    const { title, stats } = this.props
    const maxValue = Math.max(...stats.map(stat => stat.value))

    return (
      <div>
        <div className={styles.title}>
          {title}
        </div>
        <table className={styles.barGraph}>
          <tbody>
            {stats.map((stat, index) =>
              <tr key={index}>
                <th className={styles.label}>
                  {stat.label}
                </th>
                <td className={styles.datum}>
                  <div className={styles.bar} style={{ width: stat.value / maxValue * 100 + '%' }} />
                  <div className={styles.displayValue}>{stat.displayValue}</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

BarGraph.propTypes = {
  title: PropTypes.string.isRequired,
  stats: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
  }).isRequired)
}

export default BarGraph
