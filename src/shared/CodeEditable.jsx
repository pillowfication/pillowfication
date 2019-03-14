import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './CodeEditable.scss'

class CodeEditable extends Component {
  render () {
    const { $, onChange } = this.props
    const rows = Math.max(1, $.split('\n').length)

    return (
      <textarea className={`${this.props.className} ${styles.codeEditable}`}
        value={$}
        rows={rows}
        onChange={onChange}
      />
    )
  }
}

CodeEditable.propTypes = {
  $: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default CodeEditable
