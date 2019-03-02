import React, { Component } from 'react'
import PropTypes from 'prop-types'

import $ from '../Math.jsx'
import zf from '../../foundation.scss'
import styles from './PFPerlin.scss'

const GRID_RESOLUTION = 50
const GRID_HEIGHT = 200

class GridExample extends Component {
  constructor (props) {
    super(props)

    this.state = {
      gridOffsetX: 0,
      gridOffsetY: 0,
      gridDrag: null
    }

    this.gridTheta = {}

    this.onMouseDownGrid = this.onMouseDownGrid.bind(this)
    this.onMouseUpGrid = this.onMouseUpGrid.bind(this)
    this.onDragGrid = this.onDragGrid.bind(this)
  }

  onMouseDownGrid (event) {
    this.setState({ gridDrag: { x: event.clientX, y: event.clientY } })
  }

  onMouseUpGrid () {
    this.setState({ gridDrag: null })
  }

  onDragGrid (event) {
    if (this.state.gridDrag) {
      this.setState({
        gridOffsetX: this.state.gridOffsetX + (event.clientX - this.state.gridDrag.x),
        gridOffsetY: this.state.gridOffsetY + (event.clientY - this.state.gridDrag.y),
        gridDrag: { x: event.clientX, y: event.clientY }
      })
    }
  }

  getGridTheta (x, y) {
    const axis = this.gridTheta[x] || (this.gridTheta[x] = {})
    return axis[y] === undefined ? (axis[y] = Math.random() * 2 * Math.PI) : axis[y]
  }

  render () {
    const { width } = this.props
    const { gridOffsetX, gridOffsetY } = this.state

    const left = gridOffsetX < 0 ? gridOffsetX % GRID_RESOLUTION : gridOffsetX % GRID_RESOLUTION - GRID_RESOLUTION
    const up = gridOffsetY < 0 ? gridOffsetY % GRID_RESOLUTION : gridOffsetY % GRID_RESOLUTION - GRID_RESOLUTION
    const startX = -Math.floor((gridOffsetX + width / 2) / GRID_RESOLUTION) - 1
    const startCanvasX = ((width / 2 + left) % GRID_RESOLUTION) - GRID_RESOLUTION
    const startY = -Math.floor((gridOffsetY + GRID_HEIGHT / 2) / GRID_RESOLUTION) - 1
    const startCanvasY = ((GRID_HEIGHT / 2 + up) % GRID_RESOLUTION) - GRID_RESOLUTION

    return (
      <>
        <div className={styles.gridExample}
          onMouseDown={this.onMouseDownGrid}
          onMouseUp={this.onMouseUpGrid}
          onMouseMove={this.onDragGrid}
        >
          <svg width={width} height={GRID_HEIGHT}>
            <defs>
              <marker id='arrow'
                viewBox='0 0 10 10'
                refX='5' refY='5'
                markerWidth='6' markerHeight='6'
                orient='auto-start-reverse'
              >
                <path d='M 0 0 L 10 5 L 0 10 z' />
              </marker>
            </defs>
            {(() => {
              const children = []

              for (let x = startX, canvasX = startCanvasX; canvasX <= width + GRID_RESOLUTION; ++x, canvasX += GRID_RESOLUTION) {
                children.push(
                  <line key={`x${x}`}
                    x1={canvasX} y1={0}
                    x2={canvasX} y2={GRID_HEIGHT}
                    stroke='#7caff0'
                  />
                )
              }
              for (let y = startY, canvasY = startCanvasY; canvasY <= GRID_HEIGHT + GRID_RESOLUTION; ++y, canvasY += GRID_RESOLUTION) {
                children.push(
                  <line key={`y${y}`}
                    x1={0} y1={canvasY}
                    x2={width} y2={canvasY}
                    stroke='#7caff0'
                  />
                )
              }

              for (let x = startX, canvasX = startCanvasX; canvasX <= width + GRID_RESOLUTION; ++x, canvasX += GRID_RESOLUTION) {
                for (let y = startY, canvasY = startCanvasY; canvasY <= GRID_HEIGHT + GRID_RESOLUTION; ++y, canvasY += GRID_RESOLUTION) {
                  const theta = this.getGridTheta(x, y)
                  children.push(
                    <line key={`x${x}y${y}`}
                      x1={canvasX} y1={canvasY}
                      x2={canvasX + GRID_RESOLUTION * Math.cos(theta) / 2}
                      y2={canvasY + GRID_RESOLUTION * Math.sin(theta) / 2}
                      stroke='#000000'
                      markerEnd='url(#arrow)'
                    />
                  )
                }
              }

              return children
            })()}
          </svg>
        </div>
        <div className={zf.textCenter}>
          <small>
            The vectors are pictured with length <$ $='1/2' />.
            <br />
            You can drag around the grid.
          </small>
        </div>
      </>
    )
  }
}

GridExample.propTypes = {
  width: PropTypes.number.isRequired
}

export default GridExample
