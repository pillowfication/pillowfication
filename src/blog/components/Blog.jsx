import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './Blog.scss'

class Blog extends Component {
  render () {
    const { date, title } = this.props

    return (
      <div className={styles.page}>
        <h1>{title} - {date}</h1>
        <hr className={styles.titleDivider} />
        {this.props.children}
      </div>
    )
  }
}

Blog.propTypes = {
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

function registerBlog (BlogComponent, date, title) {
  return {
    date,
    title,
    component: () => <Blog date={date} title={title}><BlogComponent /></Blog>
  }
}

export default Blog
export { registerBlog }
