import React, { Component } from 'react'

import pillowfication, { minX, maxX, minY, maxY } from './pillowfication'
import styles from './Home.scss'

const width = maxX - minX
const height = maxY - minY

class SVGTriangle extends Component {
  render () {
    return <polygon className={styles.pfTriangle} points={this.props.points} />
  }
}

class Home extends Component {
  render () {
    return (
      <div className={styles.container}>
        <div>
          <svg width={width} height={height}>
            {pillowfication.map((points, index) =>
              <SVGTriangle key={index} points={points} />
            )}
          </svg>
          <ul className={styles.links}>
            <li><a href='/github'>code</a></li>
            <li><a href='/blog'>blog</a></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Home
