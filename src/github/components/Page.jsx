import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './Page.scss'

class Page extends Component {
  render () {
    const { title } = this.props

    return (
      <div>
        <h1 className={styles.title}>{title}</h1>
        <hr className={styles.titleDivider} />
        {this.props.children}
      </div>
    )
  }
}

Page.propTypes = {
  title: PropTypes.string.isRequired
}

export default Page
