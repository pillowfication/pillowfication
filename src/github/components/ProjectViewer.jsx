import React, { Component } from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'
import classnames from 'classnames'
import routes from './routes'

import Home from './Home.jsx'
import _404 from './404.jsx'
import zf from '../foundation.scss'
import styles from './ProjectViewer.scss'

class ProjectViewer extends Component {
  render () {
    return (
      <div className={classnames(styles.projectViewer, zf.row, zf.columns, zf.small12)}>
        <nav className={styles.sideBar}>
          <ul className={classnames(zf.menu, zf.vertical)}>
            {routes.map(routeGroup =>
              <li key={routeGroup.header}>
                {routeGroup.header}<span className={styles.pathDivider} />
                <ul className={classnames(zf.menu, zf.vertical, zf.nested)}>
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
    )
  }
}

export default ProjectViewer
