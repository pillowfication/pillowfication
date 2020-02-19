import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './Blog.scss'

class Blog extends Component {
  render () {
    const { date, title } = this.props

    return (
      <article className={styles.page}>
        <h1>
          {title}
          <span className={styles.date}>{date}</span>
        </h1>
        <hr className={styles.titleDivider} />
        {this.props.children}
      </article>
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
