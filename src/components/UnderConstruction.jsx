import React from 'react'
import pillowfication, { minX, maxX, minY, maxY } from './pillowfication'
import styles from './UnderConstruction.scss'

const width = maxX - minX
const height = maxY - minY

class SVGTriangle extends React.Component {
  render () {
    return <polygon className={styles.pfTriangle} points={this.props.points} />
  }
}

export default class UnderConstruction extends React.Component {
  render () {
    return (
      <div className={styles.underConstruction}>
        <div>
          <svg width={width} height={height}>
            {pillowfication.map((points, index) =>
              <SVGTriangle key={index} points={points} />
            )}
          </svg>
          <div className={styles.message}>
            pillowfication.com is under construction
          </div>
        </div>
      </div>
    )
  }
}
