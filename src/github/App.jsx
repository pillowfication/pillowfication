import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import classnames from 'classnames'

import Header from './components/Header.jsx'
import Navigation from './components/Navigation.jsx'
import ProjectViewer from './components/ProjectViewer.jsx'
import zf from '../foundation.scss'
import styles from './App.scss'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      open: false
    }

    this.handleOpenOffCanvas = this.handleOpenOffCanvas.bind(this)
    this.handleCloseOffCanvas = this.handleCloseOffCanvas.bind(this)
  }

  handleOpenOffCanvas () {
    this.setState({ open: true })
  }

  handleCloseOffCanvas () {
    this.setState({ open: false })
  }

  render () {
    const { open } = this.state

    return (
      <Router basename='/github'>
        <div className={classnames(styles.app, open && styles.open)}>
          <div className={`${zf.gridFrame} ${zf.gridY}`}>
            <div className={styles.canvasShield} onClick={this.handleCloseOffCanvas} />
            <div className={`${zf.cell} ${zf.shrink}`}>
              <Header onOpenOffCanvas={this.handleOpenOffCanvas} />
            </div>
            <div className={`${styles.body} ${zf.cell} ${zf.auto} ${zf.cellBlock}`}>
              <div className={`${styles.bodyContent} ${zf.gridContainer} ${zf.gridX} ${zf.gridPaddingX}`}>
                <div className={`${zf.hideForSmallOnly} ${zf.cell} ${zf.shrink}`}>
                  <Navigation onCloseOffCanvas={this.handleCloseOffCanvas} />
                </div>
                <div className={`${zf.cell} ${zf.auto}`}>
                  <ProjectViewer />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.offCanvas}>
            <Navigation offCanvas onCloseOffCanvas={this.handleCloseOffCanvas} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App
