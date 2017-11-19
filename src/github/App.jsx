import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import classnames from 'classnames'

import TopBar from './components/TopBar.jsx'
import SideBar from './components/SideBar.jsx'
import ProjectViewer from './components/ProjectViewer.jsx'
import zf from './foundation.scss'
import styles from './App.scss'

export default class App extends Component {
  render () {
    return (
      <Router basename='/github'>
        <div>
          <TopBar />
          <main className={classnames(styles.main, zf.row, zf.columns, zf.small12)}>
            <SideBar />
            <ProjectViewer />
          </main>
        </div>
      </Router>
    )
  }
}
