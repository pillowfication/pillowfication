import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './components/Home.jsx'
import _404 from './components/404.jsx'
import PFSowpods from './components/PFSowpods.jsx'

export default class App extends React.Component {
  render () {
    return (
      <BrowserRouter basename='/github'>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/pf-sowpods' component={PFSowpods} />
          <Route component={_404} />
        </Switch>
      </BrowserRouter>
    )
  }
}
