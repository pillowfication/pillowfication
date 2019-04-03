import React, { Component } from 'react'

import Page from '../Page.jsx'
import pillowfication, { minX, maxX, minY, maxY } from '../../../pillowfication/components/pillowfication'
import styles from './Pillowfication.scss'

const width = maxX - minX
const height = maxY - minY

class SVGTriangle extends Component {
  render () {
    return <polygon className={styles.pfTriangle} points={this.props.points} />
  }
}

class Pillowfication extends Component {
  render () {
    return (
      <Page title='pillowfication' github='pillowfication/pillowfication'>
        <section>
          <p>This repository is for the site you’re on right now&hellip;</p>
          <div className={styles.container}>
            <svg width={width} height={height}>
              {pillowfication.map((points, index) =>
                <SVGTriangle key={index} points={points} />
              )}
            </svg>
          </div>
        </section>
      </Page>
    )
  }
}

export default Pillowfication
