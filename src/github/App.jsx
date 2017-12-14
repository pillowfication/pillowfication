import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import Header from './components/Header.jsx'
import ProjectViewer from './components/ProjectViewer.jsx'
import styles from './App.scss'

class App extends Component {
  render () {
    return (
      <Router basename='/github'>
        <div className={styles.app}>
          <Header />
          <ProjectViewer />
        </div>
      </Router>
    )
  }
}

export default App
