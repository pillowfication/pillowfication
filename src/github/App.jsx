import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import classnames from 'classnames'

import Header from './components/Header.jsx'
import Navigation from './components/Navigation.jsx'
import ProjectViewer from './components/ProjectViewer.jsx'
import zf from './foundation.scss'
import styles from './App.scss'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      open: false
    }

    this.openOffCanvas = this.openOffCanvas.bind(this)
    this.closeOffCanvas = this.closeOffCanvas.bind(this)
  }

  openOffCanvas () {
    this.setState({ open: true })
  }

  closeOffCanvas () {
    this.setState({ open: false })
  }

  render () {
    const { open } = this.state

    return (
      <Router basename='/github'>
        <div className={classnames({ [styles.open]: open }, `${styles.canvas} ${zf.gridFrame} ${zf.gridY}`)}>
          <div className={styles.canvasShield} onClick={this.closeOffCanvas} />
          <div className={`${zf.cell} ${zf.shrink}`}>
            <Header openOffCanvas={this.openOffCanvas} />
          </div>
          <div className={`${zf.cell} ${zf.auto} ${zf.cellBlock}`}>
            <div className={`${styles.body} ${zf.gridContainer} ${zf.gridX} ${zf.gridPaddingX}`}>
              <div className={`${styles.offCanvas} ${zf.cell} ${zf.shrink}`}>
                <Navigation closeOffCanvas={this.closeOffCanvas} />
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
