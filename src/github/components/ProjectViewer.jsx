import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import flatten from 'lodash/flatten'
import routes from './routes'

import Home from './Home.jsx'
import _404 from './404.jsx'

class ProjectViewer extends Component {
  render () {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Home} />
          {flatten(
            routes.map(routeGroup => routeGroup.children.map(route =>
              <Route key={route.path} path={route.fullPath} component={route.component} />
            ))
          )}
          <Route component={_404} />
        </Switch>
      </main>
    )
  }
}

export default ProjectViewer
