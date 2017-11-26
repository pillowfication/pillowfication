import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import TopBar from './components/TopBar.jsx'
import ProjectViewer from './components/ProjectViewer.jsx'
import styles from './App.scss'

class App extends Component {
  render () {
    return (
      <Router basename='/github'>
        <div className={styles.app}>
          <TopBar />
          <ProjectViewer />
        </div>
      </Router>
    )
  }
}

export default App
