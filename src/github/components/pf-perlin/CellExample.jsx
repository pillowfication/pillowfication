import React, { Component } from 'react'
import PropTypes from 'prop-types'

import $ from '../Math.jsx'
import zf from '../../foundation.scss'
import styles from './PFPerlin.scss'

const MAX_CELL_RESOLUTION = 200

class CellExample extends Component {
  constructor (props) {
    super(props)

    this.state = {
      cellGradients: Array(4).fill(0).map(() => Math.random() * 2 * Math.PI),
      cellMouseX: Math.random(),
      cellMouseY: Math.random()
    }

    this.cell = React.createRef()
    this.onClickCell = this.onClickCell.bind(this)
    this.onMouseMoveCell = this.onMouseMoveCell.bind(this)
  }

  onClickCell () {
    this.setState({ cellGradients: Array(4).fill(0).map(() => Math.random() * 2 * Math.PI) })
  }

  onMouseMoveCell (event) {
    const { width } = this.props
    const cellResolution = Math.min(width, MAX_CELL_RESOLUTION * 2) / 2
    const boundingRect = this.cell.current.getBoundingClientRect()
    this.setState({
      cellMouseX: Math.max(0, Math.min(1, (event.clientX - boundingRect.x - width / 2) / cellResolution + 1 / 2)),
      cellMouseY: Math.max(0, Math.min(1, (event.clientY - boundingRect.y - cellResolution) / cellResolution + 1 / 2))
    })
  }

  render () {
    const { width } = this.props
    const { cellMouseX, cellMouseY } = this.state

    const cellResolution = Math.min(width, MAX_CELL_RESOLUTION * 2) / 2
    const cellLeft = (width - cellResolution) / 2
    const cellTop = cellResolution / 2
    const cellRight = cellLeft + cellResolution
    const cellBottom = cellTop + cellResolution
    const canvasMouseX = cellLeft + cellMouseX * cellResolution
    const canvasMouseY = cellTop + cellMouseY * cellResolution

    const gradient0 = { x: Math.cos(this.state.cellGradients[0]), y: Math.sin(this.state.cellGradients[0]) }
    const gradient1 = { x: Math.cos(this.state.cellGradients[1]), y: Math.sin(this.state.cellGradients[1]) }
    const gradient2 = { x: Math.cos(this.state.cellGradients[2]), y: Math.sin(this.state.cellGradients[2]) }
    const gradient3 = { x: Math.cos(this.state.cellGradients[3]), y: Math.sin(this.state.cellGradients[3]) }

    const dotProduct0 = cellMouseX * gradient0.x + cellMouseY * gradient0.y
    const dotProduct1 = (cellMouseX - 1) * gradient1.x + cellMouseY * gradient1.y
    const dotProduct2 = cellMouseX * gradient2.x + (cellMouseY - 1) * gradient2.y
    const dotProduct3 = (cellMouseX - 1) * gradient3.x + (cellMouseY - 1) * gradient3.y

    return (
      <>
        <div className={styles.cellExample}
          ref={this.cell}
          onClick={this.onClickCell}
          onMouseMove={this.onMouseMoveCell}
        >
          <svg width={width} height={Math.min(width, MAX_CELL_RESOLUTION * 2)}>
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
            <rect
              x={cellLeft} y={cellTop}
              width={cellResolution} height={cellResolution}
              stroke='#7caff0' strokeWidth='2' fillOpacity='0'
            />
            <line
              x1={cellLeft} y1={cellTop}
              x2={cellLeft + cellResolution * gradient0.x / 2}
              y2={cellTop + cellResolution * gradient0.y / 2}
              stroke='#000000' strokeWidth='2'
              markerEnd='url(#arrow)'
            />
            <line
              x1={cellRight} y1={cellTop}
              x2={cellRight + cellResolution * gradient1.x / 2}
              y2={cellTop + cellResolution * gradient1.y / 2}
              stroke='#000000' strokeWidth='2'
              markerEnd='url(#arrow)'
            />
            <line
              x1={cellLeft} y1={cellBottom}
              x2={cellLeft + cellResolution * gradient2.x / 2}
              y2={cellBottom + cellResolution * gradient2.y / 2}
              stroke='#000000' strokeWidth='2'
              markerEnd='url(#arrow)'
            />
            <line
              x1={cellRight} y1={cellBottom}
              x2={cellRight + cellResolution * gradient3.x / 2}
              y2={cellBottom + cellResolution * gradient3.y / 2}
              stroke='#000000' strokeWidth='2'
              markerEnd='url(#arrow)'
            />
            <line
              x1={cellLeft} y1={cellTop}
              x2={canvasMouseX} y2={canvasMouseY}
              stroke={dotProduct0 >= 0 ? '#0000ff' : '#ff0000'} strokeWidth={5 * Math.abs(dotProduct0)}
            />
            <line
              x1={cellRight} y1={cellTop}
              x2={canvasMouseX} y2={canvasMouseY}
              stroke={dotProduct1 >= 0 ? '#0000ff' : '#ff0000'} strokeWidth={5 * Math.abs(dotProduct1)}
            />
            <line
              x1={cellLeft} y1={cellBottom}
              x2={canvasMouseX} y2={canvasMouseY}
              stroke={dotProduct2 >= 0 ? '#0000ff' : '#ff0000'} strokeWidth={5 * Math.abs(dotProduct2)}
            />
            <line
              x1={cellRight} y1={cellBottom}
              x2={canvasMouseX} y2={canvasMouseY}
              stroke={dotProduct3 >= 0 ? '#0000ff' : '#ff0000'} strokeWidth={5 * Math.abs(dotProduct3)}
            />
          </svg>
        </div>
        <div className={zf.textCenter}>
          <small>
            Distance vectors are drawn with thickness proportional to the influence value. <$ $='\color{#00f}{\text{Blue}}' /> indicates a positive influence value, while <$ $='\color{#f00}{\text{Red}}' /> is negative.
            <br />
            Click to randomize the gradient vectors.
          </small>
        </div>
      </>
    )
  }
}

CellExample.propTypes = {
  width: PropTypes.number.isRequired
}

export default CellExample
