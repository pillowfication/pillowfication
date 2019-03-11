import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import zf from '../../../foundation.scss'
import styles from './PerfectCuboid.scss'

const PASSED = [
  3,
  7,
  9,
  11,
  27,
  33,
  40,
  44,
  55,
  328,
  3463,
  3467,
  3483,
  3489,
  3500,
  3511,
  3890,
  3896,
  3916,
  4039,
  4059,
  4754,
  6915,
  6919,
  6939,
  7203,
  7344,
  7346,
  7920,
  13831,
  13851,
  14258,
  44935,
  44939,
  44966,
  44972,
  44983,
  45038,
  45410,
  48391,
  48422,
  48675,
  48708,
  48818,
  49392,
  55303,
  55334,
  55730,
  546339,
  547056
]

class PassedCases extends Component {
  render () {
    const { id, onSelectId } = this.props

    return (
      <fieldset className={classnames(zf.cell, zf.small12)}>
        <legend>Passed Cases ({PASSED.length} total)</legend>
        {PASSED.map(passed =>
          <button key={passed}
            type='button'
            className={classnames(styles.idButton, zf.button, zf.hollow, {
              [styles.selected]: id === passed
            })}
            onClick={onSelectId.bind(this, passed)}
          >
            {passed}
          </button>
        )}
      </fieldset>
    )
  }
}

PassedCases.propTypes = {
  id: PropTypes.number.isRequired,
  onSelectId: PropTypes.func.isRequired
}

export default PassedCases
