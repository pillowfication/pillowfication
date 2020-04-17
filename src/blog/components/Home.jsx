import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import routes from './routes'
import styles from './Blog.scss'

class Home extends Component {
  render () {
    return (
      <div className={styles.page}>
        <h1>Archives</h1>
        <hr className={styles.titleDivider} />
        <ul className={styles.archivesList}>
          {routes
            .sort((a, b) => b.date.localeCompare(a.date))
            .map(route =>
              <li key={route.path}>
                <Link to={route.path}>{route.date} - {route.title}</Link>
              </li>
            )}
        </ul>
      </div>
    )
  }
}

export default Home
