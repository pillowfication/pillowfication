import React, { Component } from 'react'
import PropTypes from 'prop-types'

import $ from '../../../shared/Math.jsx'
import zf from '../../../foundation.scss'
import styles from './PFPerlin.scss'

const MAX_INTERPOLATION_RESOLUTION = 200
const INTERPOLATION_PADDING = 20
const GRADIENT_WIDTH = 8
const CIRCLE_RADIUS = 10

class InterpolationExample extends Component {
  constructor (props) {
    super(props)

    this.state = {
      influenceValues: Array(4).fill().map(() => ({
        r: Math.random() * 256,
        g: Math.random() * 256,
        b: Math.random() * 256
      })),
      cellMouseX: Math.random(),
      cellMouseY: Math.random()
    }

    this.cell = React.createRef()
    this.onClickInterpolation = this.onClickInterpolation.bind(this)
    this.onMouseMoveInterpolation = this.onMouseMoveInterpolation.bind(this)
  }

  onClickInterpolation () {
    this.setState({ influenceValues: Array(4).fill().map(() => ({
      r: Math.random() * 256,
      g: Math.random() * 256,
      b: Math.random() * 256
    })) })
  }

  onMouseMoveInterpolation (event) {
    const { width } = this.props
    const cellResolution = Math.max(0, Math.min(width - INTERPOLATION_PADDING * 2, MAX_INTERPOLATION_RESOLUTION))
    const boundingRect = this.cell.current.getBoundingClientRect()
    this.setState({
      cellMouseX: Math.max(0, Math.min(1, (event.clientX - boundingRect.x - width / 2) / cellResolution + 1 / 2)),
      cellMouseY: Math.max(0, Math.min(1, (event.clientY - boundingRect.y - cellResolution / 2 - INTERPOLATION_PADDING) / cellResolution + 1 / 2))
    })
  }

  interpolateColor (a, b, t) {
    return {
      r: t * (b.r - a.r) + a.r,
      g: t * (b.g - a.g) + a.g,
      b: t * (b.b - a.b) + a.b
    }
  }

  toRGBString (color) {
    return `rgb(${color.r}, ${color.g}, ${color.b})`
  }

  render () {
    const { width } = this.props
    const { cellMouseX, cellMouseY } = this.state

    const cellResolution = Math.max(0, Math.min(width - INTERPOLATION_PADDING * 2, MAX_INTERPOLATION_RESOLUTION))
    const cellLeft = (width - cellResolution) / 2
    const cellTop = INTERPOLATION_PADDING
    const cellRight = cellLeft + cellResolution
    const cellBottom = cellTop + cellResolution
    const canvasMouseX = cellLeft + cellMouseX * cellResolution
    const canvasMouseY = cellTop + cellMouseY * cellResolution

    const color0 = this.state.influenceValues[0]
    const color1 = this.state.influenceValues[1]
    const color2 = this.state.influenceValues[2]
    const color3 = this.state.influenceValues[3]
    const colorX0 = this.interpolateColor(color0, color1, cellMouseX)
    const colorX1 = this.interpolateColor(color2, color3, cellMouseX)
    const colorY0 = this.interpolateColor(colorX0, colorX1, cellMouseY)

    return (
      <>
        <div className={styles.interpolationExample}
          ref={this.cell}
          onClick={this.onClickInterpolation}
          onMouseMove={this.onMouseMoveInterpolation}
        >
          <svg width={width} height={Math.min(width, MAX_INTERPOLATION_RESOLUTION + 2 * INTERPOLATION_PADDING)}>
            <defs>
              <linearGradient id='gradientX0'>
                <stop offset='0%' stopColor={this.toRGBString(color0)} />
                <stop offset='100%' stopColor={this.toRGBString(color1)} />
              </linearGradient>
              <linearGradient id='gradientX1'>
                <stop offset='0%' stopColor={this.toRGBString(color2)} />
                <stop offset='100%' stopColor={this.toRGBString(color3)} />
              </linearGradient>
              <linearGradient id='gradientY0' gradientTransform='rotate(90)'>
                <stop offset='0%' stopColor={this.toRGBString(colorX0)} />
                <stop offset='100%' stopColor={this.toRGBString(colorX1)} />
              </linearGradient>
            </defs>
            <rect
              x={cellLeft} y={cellTop}
              width={cellResolution} height={cellResolution}
              stroke='#7caff0' strokeWidth='2' fillOpacity='0'
            />
            <rect
              x={cellLeft} y={cellTop - GRADIENT_WIDTH / 2}
              width={cellResolution} height={GRADIENT_WIDTH}
              fill='url(#gradientX0)'
            />
            <rect
              x={cellLeft} y={cellBottom - GRADIENT_WIDTH / 2}
              width={cellResolution} height={GRADIENT_WIDTH}
              fill='url(#gradientX1)'
            />
            <rect
              x={canvasMouseX - GRADIENT_WIDTH / 2} y={cellTop}
              width={GRADIENT_WIDTH} height={cellResolution}
              fill='url(#gradientY0)'
            />
            <circle
              cx={cellLeft}
              cy={cellTop}
              r={CIRCLE_RADIUS}
              fill={this.toRGBString(color0)}
            />
            <circle
              cx={cellRight}
              cy={cellTop}
              r={CIRCLE_RADIUS}
              fill={this.toRGBString(color1)}
            />
            <circle
              cx={cellLeft}
              cy={cellBottom}
              r={CIRCLE_RADIUS}
              fill={this.toRGBString(color2)}
            />
            <circle
              cx={cellRight}
              cy={cellBottom}
              r={CIRCLE_RADIUS}
              fill={this.toRGBString(color3)}
            />
            <circle
              cx={canvasMouseX}
              cy={cellTop}
              r={CIRCLE_RADIUS}
              fill={this.toRGBString(colorX0)}
            />
            <circle
              cx={canvasMouseX}
              cy={cellBottom}
              r={CIRCLE_RADIUS}
              fill={this.toRGBString(colorX1)}
            />
            <circle
              cx={canvasMouseX}
              cy={canvasMouseY}
              r={CIRCLE_RADIUS}
              fill={this.toRGBString(colorY0)}
            />
          </svg>
        </div>
        <div className={zf.textCenter}>
          <small>
            Each influence value is a constant color. Colors are linearly interpolated with <$ $='\varphi(t) = t' />. Interpolation occurs along the <$ $='x' />-axis, then the <$ $='y' />-axis.
            <br />
            Click to randomize the influence values.
          </small>
        </div>
      </>
    )
  }
}

InterpolationExample.propTypes = {
  width: PropTypes.number.isRequired
}

export default InterpolationExample
