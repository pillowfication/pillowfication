import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import routes from './routes'

import styles from './Navigation.scss'

class Navigation extends Component {
  render () {
    return (
      <nav className={styles.nav}>
        <ul>
          {routes.map(routeGroup =>
            <li key={routeGroup.header}>
              <b>{routeGroup.header}</b><span className={styles.pathDivider} />
              <ul>
                {routeGroup.children.map(route =>
                  <li key={route.path}>
                    <NavLink activeClassName={styles.active} to={route.fullPath}>{route.path}</NavLink>
                  </li>
                )}
              </ul>
            </li>
          )}
        </ul>
      </nav>
    )
  }
}

export default Navigation
