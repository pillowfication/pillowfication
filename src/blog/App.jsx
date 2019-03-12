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
          <div className={`${zf.gridFrame} ${zf.gridY}`}>
            <div className={`${zf.cell} ${zf.shrink}`}>
              <Header />
            </div>
            <div className={`${styles.body} ${zf.cell} ${zf.auto} ${zf.cellBlock}`}>
              <div className={`${styles.bodyContent} ${zf.gridContainer} ${zf.gridX} ${zf.gridPaddingX}`}>
                <div className={`${zf.cell} ${zf.auto}`}>
                  <BlogViewer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
