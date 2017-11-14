import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './components/Home.jsx'
import _404 from './components/404.jsx'
import PerfectCuboid from './components/PerfectCuboid.jsx'
import './main.scss'

export default class App extends Component {
  render () {
    return (
      <Router basename='/github'>
        <div>
          <nav>
            foo
          </nav>
          <main>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/perfect-cuboid' component={PerfectCuboid} />
              <Route component={_404} />
            </Switch>
          </main>
        </div>
      </Router>
    )
  }
}
