import React, { Component } from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'
import routes from './routes'

import Home from './Home.jsx'
import _404 from './404.jsx'
import styles from './ProjectViewer.scss'

class ProjectViewer extends Component {
  render () {
    return (
      <div className={styles.projectViewerContainer}>
        <div className={styles.projectViewer}>
          <nav className={styles.sideBar}>
            <ul className={styles.navList}>
              {routes.map(routeGroup =>
                <li key={routeGroup.header}>
                  {routeGroup.header}<span className={styles.pathDivider} />
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
          <main className={styles.main}>
            <Switch>
              <Route exact path='/' component={Home} />
              {routes.reduce((routes, routeGroup) =>
                routes.concat(routeGroup.children.map(route =>
                  <Route key={route.path} path={route.fullPath} component={route.component} />
                ))
              , [])}
              <Route component={_404} />
            </Switch>
          </main>
        </div>
      </div>
    )
  }
}

export default ProjectViewer
