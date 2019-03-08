import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import zf from '../../foundation.scss'
import fa from '../../font-awesome.scss'
import styles from './PFPerlin.scss'

const GRAPH_RESOLUTION = 100
const GRAPH_INTERVAL = 1
const GRAPH_PADDING = 5
const INTERPOLATION = t => t * t * t * (t * (t * 6 - 15) + 10)

class GridExample extends Component {
  constructor (props) {
    super(props)

    this.state = {
      graphOffsetX: 0,
      graphDrag: null,
      octaves: 1
    }

    this.graphValues = {}

    this.onMouseDownGraph = this.onMouseDownGraph.bind(this)
    this.onMouseUpGraph = this.onMouseUpGraph.bind(this)
    this.onDragGraph = this.onDragGraph.bind(this)
    this.onClickSubtractOctave = this.onClickSubtractOctave.bind(this)
    this.onClickAddOctave = this.onClickAddOctave.bind(this)
  }

  onMouseDownGraph (event) {
    this.setState({ graphDrag: { x: event.clientX } })
  }

  onMouseUpGraph () {
    this.setState({ graphDrag: null })
  }

  onDragGraph (event) {
    if (this.state.graphDrag) {
      this.setState({
        graphOffsetX: this.state.graphOffsetX + (event.clientX - this.state.graphDrag.x),
        graphDrag: { x: event.clientX }
      })
    }
  }

  onClickSubtractOctave () {
    if (this.state.octaves > 1) {
      this.setState({ octaves: this.state.octaves - 1 })
    }
  }

  onClickAddOctave () {
    this.setState({ octaves: this.state.octaves + 1 })
  }

  getGraphValue (x) {
    const value = this.graphValues[x]
    return value === undefined ? (this.graphValues[x] = Math.random() > 0.5 ? 1 : -1) : value
  }

  getNoiseValue (x) {
    const { octaves } = this.state
    let value = 0
    let scale = 1
    let persistence = 1

    for (let octave = 0; octave < octaves; ++octave) {
      const xPrime = x * scale
      const intX = Math.floor(xPrime)
      const x0 = this.getGraphValue(intX) * (xPrime - intX)
      const x1 = this.getGraphValue(intX + 1) * (xPrime - (intX + 1))

      value += (INTERPOLATION(xPrime - intX) * (x1 - x0) + x0) * persistence
      scale *= 2
      persistence /= 2
    }

    return value
  }

  render () {
    const { width } = this.props
    const { graphOffsetX } = this.state

    const left = graphOffsetX >= 0 ? graphOffsetX % GRAPH_RESOLUTION : graphOffsetX % GRAPH_RESOLUTION + GRAPH_RESOLUTION
    const leftX = -graphOffsetX / GRAPH_RESOLUTION

    return (
      <>
        <div className={styles.gridExample}
          onMouseDown={this.onMouseDownGraph}
          onMouseUp={this.onMouseUpGraph}
          onMouseMove={this.onDragGraph}
        >
          <svg width={width} height={(GRAPH_RESOLUTION + GRAPH_PADDING) * 2}>
            <line
              x1={GRAPH_PADDING} y1={GRAPH_RESOLUTION * 2 + GRAPH_PADDING}
              x2={GRAPH_PADDING} y2={GRAPH_PADDING}
              stroke='#7caff0' strokeWidth='3'
            />
            <line
              x1={GRAPH_PADDING} y1={GRAPH_RESOLUTION * 2 + GRAPH_PADDING}
              x2={width - GRAPH_PADDING} y2={GRAPH_RESOLUTION * 2 + GRAPH_PADDING}
              stroke='#7caff0' strokeWidth='3'
            />
            {(() => {
              const children = []

              for (let index = 0, canvasX = GRAPH_PADDING + left; canvasX <= width - GRAPH_PADDING; ++index, canvasX += GRAPH_RESOLUTION) {
                children.push(
                  <line key={index}
                    x1={canvasX} y1={GRAPH_RESOLUTION * 2 + GRAPH_PADDING}
                    x2={canvasX} y2={GRAPH_PADDING}
                    stroke='#7caff0' strokeWidth='1'
                  />
                )
              }

              const points = []
              for (let x = 0; x <= width - GRAPH_PADDING * 2; x += GRAPH_INTERVAL) {
                const noise = this.getNoiseValue(leftX + x / GRAPH_RESOLUTION)
                points.push(`${GRAPH_PADDING + x},${GRAPH_RESOLUTION + GRAPH_PADDING - noise * GRAPH_RESOLUTION}`)
              }
              children.push(
                <polyline key='graph'
                  points={points.join(' ')}
                  stroke='#000000'
                  strokeWidth='2'
                  fill='none'
                />
              )

              return children
            })()}
            <text
              x={width / 2}
              y={GRAPH_PADDING + 5}
              dominantBaseline='hanging'
              textAnchor='middle'
            >
              Octaves: {this.state.octaves}
            </text>
          </svg>
          <div className={classnames(zf.buttonGroup, zf.textCenter)}>
            <button className={zf.button} onClick={this.onClickSubtractOctave}>
              <i className={classnames(fa.fa, fa.faFw, fa.faMinus)} />
            </button>
            &nbsp;
            <button className={zf.button} onClick={this.onClickAddOctave}>
              <i className={classnames(fa.fa, fa.faFw, fa.faPlus)} />
            </button>
          </div>
          <div className={zf.textCenter}>
            <small>
              You can drag the graph around.
            </small>
          </div>
        </div>
      </>
    )
  }
}

GridExample.propTypes = {
  width: PropTypes.number.isRequired
}

export default GridExample
