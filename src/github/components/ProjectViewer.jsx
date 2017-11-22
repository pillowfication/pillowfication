import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import PerfectCuboid from './perfect-cuboid/PerfectCuboid.jsx'
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

class ProjectViewer extends Component {
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

export default ProjectViewer
