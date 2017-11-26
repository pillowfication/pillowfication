import React, { Component } from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'
import classnames from 'classnames'

import Home from './Home.jsx'
import _404 from './404.jsx'
import AwesomeDings from './awesome-dings/AwesomeDings.jsx'
import CIS89C from './cis89c/CIS89C.jsx'
import PerfectCuboid from './perfect-cuboid/PerfectCuboid.jsx'
import PFKonami from './pf-konami/PFKonami.jsx'
import zf from '../foundation.scss'
import styles from './ProjectViewer.scss'

// TODO: add `/{org}` for other ROUTE groups
const ROUTES = [{
  header: 'pillowfication',
  children: [
    { path: 'awesome-dings', component: AwesomeDings },
    { path: 'cis89c', component: CIS89C },
    { path: 'perfect-cuboid', component: PerfectCuboid },
    { path: 'pf-konami', component: PFKonami }
  ]
}]

class ProjectViewer extends Component {
  render () {
    return (
      <div className={classnames(styles.projectViewer, zf.row, zf.columns, zf.small12)}>
        <nav className={styles.sideBar}>
          <ul className={classnames(zf.menu, zf.vertical)}>
            {ROUTES.map(routeGroup =>
              <li key={routeGroup.header}>
                {routeGroup.header}<span className={styles.pathDivider} />
                <ul className={classnames(zf.menu, zf.vertical, zf.nested)}>
                  {routeGroup.children.map(route =>
                    <li key={route.path}>
                      <NavLink activeClassName={styles.active} to={'/' + route.path}>{route.path}</NavLink>
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
            {ROUTES.reduce((routes, routeGroup) =>
              routes.concat(routeGroup.children.map(route =>
                <Route key={route.path} path={'/' + route.path} component={route.component} />
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
