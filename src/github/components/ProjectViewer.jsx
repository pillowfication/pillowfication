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

class ProjectViewer extends Component {
  render () {
    return (
      <div className={classnames(styles.projectViewer, zf.row, zf.columns, zf.small12)}>
        <nav className={styles.sideBar}>
          <ul className={classnames(zf.menu, zf.vertical)}>
            <li>
              pillowfication<span className={styles.pathDivider} />
              <ul className={classnames(zf.menu, zf.vertical, zf.nested)}>
                <li><NavLink activeClassName={styles.active} to='/awesome-dings'>awesome-dings</NavLink></li>
                <li><NavLink activeClassName={styles.active} to='/cis89c'>cis89c</NavLink></li>
                <li><NavLink activeClassName={styles.active} to='/perfect-cuboid'>perfect-cuboid</NavLink></li>
                <li><NavLink activeClassName={styles.active} to='/pf-konami'>pf-konami</NavLink></li>
              </ul>
            </li>
          </ul>
        </nav>
        <main className={styles.main}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/awesome-dings' component={AwesomeDings} />
            <Route path='/cis89c' component={CIS89C} />
            <Route path='/perfect-cuboid' component={PerfectCuboid} />
            <Route path='/pf-konami' component={PFKonami} />
            <Route component={_404} />
          </Switch>
        </main>
      </div>
    )
  }
}

export default ProjectViewer
