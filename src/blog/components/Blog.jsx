import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './Blog.scss'

class Blog extends Component {
  render () {
    const { title } = this.props

    return (
      <div className={styles.page}>
        <h1>{title}</h1>
        <hr className={styles.titleDivider} />
        {this.props.children}
      </div>
    )
  }
}

Blog.propTypes = {
  title: PropTypes.string.isRequired
}

export default Blog
