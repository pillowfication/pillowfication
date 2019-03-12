import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import routes from './routes'

import Home from './Home.jsx'
import _404 from './404.jsx'

class BlogViewer extends Component {
  render () {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Home} />
          {routes.map(route =>
            <Route key={route.path} path={'/' + route.path} component={route.component} />
          )}
          <Route component={_404} />
        </Switch>
      </main>
    )
  }
}

export default BlogViewer
