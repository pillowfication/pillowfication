import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import zf from '../../foundation.scss'
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

class PassedCases extends PureComponent {
  render () {
    return (
      <div className={zf.row}>
        <div className={classnames(zf.columns, zf.small12)}>
          Passed Cases ({PASSED.length} total)<br />
          {PASSED.map(id =>
            <button key={id}
              type='button'
              className={classnames(styles.idButton, zf.button, zf.hollow)}
              onClick={this.props.onSelectId.bind(this, id)}
            >
              {id}
            </button>
          )}
        </div>
      </div>
    )
  }
}

PassedCases.propTypes = {
  onSelectId: PropTypes.func.isRequired
}

export default PassedCases
