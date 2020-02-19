import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './HideShow.scss'

class HideShow extends Component {
  constructor () {
    super()
    this.state = { open: false }

    this.handleToggleOpen = this.handleToggleOpen.bind(this)
  }

  handleToggleOpen () {
    this.setState({ open: !this.state.open })
  }

  render () {
    const { open } = this.state
    const showText = `${this.props.showText || 'Expand Section'} ▼`
    const hideText = `${this.props.hideText || 'Hide Section'} ▲`

    return (
      <div className={classnames(styles.hideShow, open && styles.open)}>
        <button onClick={this.handleToggleOpen}>{open ? hideText : showText}</button>
        <div className={styles.content}>
          <hr />
          {this.props.children}
        </div>
      </div>
    )
  }
}

HideShow.propTypes = {
  showText: PropTypes.string,
  hideText: PropTypes.string
}

export default HideShow
