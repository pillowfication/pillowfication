import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import PerfectCuboid from './PerfectCuboid.jsx'
import styles from './ProjectViewer.scss'

class Home extends Component {
  render () {
    return <div>Home</div>
  }
}

class _404 extends Component {
  render () {
    return <div>404</div>
  }
}

export default class ProjectViewer extends Component {
  render () {
    return (
      <div className={styles.projectViewer}>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/perfect-cuboid' component={PerfectCuboid} />
          <Route component={_404} />
        </Switch>
      </div>
    )
  }
}
