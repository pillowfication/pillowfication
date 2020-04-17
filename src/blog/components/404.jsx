import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import styles from './Blog.scss'

class _404 extends Component {
  render () {
    return (
      <article className={styles.page}>
        <h1>404 - Page Not Found</h1>
        <hr className={styles.titleDivider} />
        <p>You’re not supposed to be here. Head back to the <Link to='/'>archives</Link>.</p>
      </article>
    )
  }
}

export default _404
