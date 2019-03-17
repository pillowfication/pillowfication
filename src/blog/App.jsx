import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import Header from './components/Header.jsx'
import BlogViewer from './components/BlogViewer.jsx'
import zf from '../foundation.scss'
import styles from './App.scss'

class App extends Component {
  render () {
    return (
      <Router basename='/blog'>
        <div className={styles.app}>
          <div className={`${styles.grid} ${zf.gridFrame} ${zf.gridY}`}>
            <div className={`${zf.cell} ${zf.shrink}`}>
              <Header />
            </div>
            <div className={`${zf.cell} ${zf.auto} ${zf.cellBlock}`}>
              <div className={`${styles.bodyContent} ${zf.gridContainer} ${zf.gridX} ${zf.gridPaddingX}`}>
                <div className={styles.bodyPadding} />
                <div className={`${styles.body} ${zf.cell} ${zf.small12} ${zf.large10}`}>
                  <BlogViewer />
                </div>
                <div className={styles.bodyPadding} />
              </div>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
