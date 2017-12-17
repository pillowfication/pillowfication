import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import zf from './foundation.scss'
import Header from './components/Header.jsx'
import Navigation from './components/Navigation.jsx'
import ProjectViewer from './components/ProjectViewer.jsx'

class App extends Component {
  render () {
    return (
      <Router basename='/github'>
        <div className={`${zf.gridFrame} ${zf.gridY}`}>
          <div className={`${zf.cell} ${zf.shrink}`}>
            <Header />
          </div>
          <div className={`${zf.cell} ${zf.auto} ${zf.cellBlock}`}>
            <div className={`${zf.gridContainer} ${zf.gridX} ${zf.gridPaddingX}`}>
              <div className={`${zf.cell} ${zf.shrink}`}>
                <Navigation />
              </div>
              <div className={`${zf.cell} ${zf.auto}`}>
                <ProjectViewer />
              </div>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
