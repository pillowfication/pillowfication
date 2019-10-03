import React, { Component } from 'react'
import PFValueNoise from 'pf-value-noise'

import Section from '../Section.jsx'
import styles from './PFValueNoise.scss'

const CUBE_SIZE = +styles.cubeSize.slice(0, -2)
const CUBE_COLOR = styles.cubeColor
const RESOLUTION = 35
const EASING = 100
const TIMING_SPEED = 800

class _4DValueNoise extends Component {
  constructor (props) {
    super(props)

    this.state = {
      pitch: -0.5,
      roll: 0,
      isDragging: false
    }
    this.mouseX = 0
    this.mouseY = 0

    this.points = {
      F: [],
      B: [],
      U: [],
      D: [],
      L: [],
      R: []
    }
    for (let row = 0; row < RESOLUTION; ++row) {
      const rowF = []; this.points.F.push(rowF)
      const rowB = []; this.points.B.push(rowB)
      const rowU = []; this.points.U.push(rowU)
      const rowD = []; this.points.D.push(rowD)
      const rowL = []; this.points.L.push(rowL)
      const rowR = []; this.points.R.push(rowR)

      for (let col = 0; col < RESOLUTION; ++col) {
        rowF.push([col, row, 0, 0])
        rowB.push([RESOLUTION - 1 - col, row, RESOLUTION, 0])
        rowU.push([col, 0, RESOLUTION - 1 - row, 0])
        rowD.push([col, RESOLUTION, row, 0])
        rowL.push([0, row, RESOLUTION - 1 - col, 0])
        rowR.push([RESOLUTION, row, col, 0])
      }
    }

    this.F = React.createRef()
    this.B = React.createRef()
    this.U = React.createRef()
    this.D = React.createRef()
    this.L = React.createRef()
    this.R = React.createRef()
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
  }

  componentDidMount () {
    const _this = this
    const dpi = window.devicePixelRatio || 1
    const ctx = {}
    for (const face of ['F', 'B', 'U', 'D', 'L', 'R']) {
      const canvas = _this[face].current
      canvas.setAttribute('width', CUBE_SIZE * dpi)
      canvas.setAttribute('height', CUBE_SIZE * dpi)
      const faceCtx = canvas.getContext('2d')
      faceCtx.fillStyle = CUBE_COLOR
      ctx[face] = faceCtx
    }

    const noise4D = new PFValueNoise({
      dimensions: 4,
      wavelength: 12,
      octaves: 2,
      interpolation: (a, b, t) => a + t * (b - a)
    })
    const squareSize = CUBE_SIZE / RESOLUTION

    _this.animationId = window.requestAnimationFrame(function loop (timestamp) {
      const time = timestamp / TIMING_SPEED
      for (const face of ['F', 'B', 'U', 'D', 'L', 'R']) {
        const faceCtx = ctx[face]
        const facePoints = _this.points[face]
        faceCtx.clearRect(0, 0, CUBE_SIZE, CUBE_SIZE)
        for (let row = 0; row < RESOLUTION; ++row) {
          for (let col = 0; col < RESOLUTION; ++col) {
            const point = facePoints[row][col]
            point[3] = time
            if (noise4D.get(point) > 0.5) {
              faceCtx.fillRect(col * squareSize - 0.5, row * squareSize - 0.5, squareSize + 1, squareSize + 1)
            }
          }
        }
      }
      _this.animationId = window.requestAnimationFrame(loop)
    })
  }

  componentWillUnmount () {
    if (this.animationId) {
      window.cancelAnimationFrame(this.animationId)
    }
  }

  handleMouseDown () {
    this.setState({ isDragging: true })
  }

  handleMouseUp () {
    this.setState({ isDragging: false })
  }

  handleMouseMove (event) {
    if (this.state.isDragging) {
      this.setState({
        pitch: this.state.pitch + (event.pageX - this.mouseX) / EASING,
        roll: this.state.roll + (this.mouseY - event.pageY) / EASING
      })
    }

    this.mouseX = event.pageX
    this.mouseY = event.pageY
  }

  render () {
    const cA = Math.cos(this.state.pitch)
    const sA = Math.sin(this.state.pitch)
    const cB = Math.cos(this.state.roll)
    const sB = Math.sin(this.state.roll)

    /* eslint-disable no-multi-spaces,comma-spacing */
    const rotationMatrix = [
      cA     , 0  , -sA    , 0,
      sA * sB, cB , cA * sB, 0,
      sA * cB, -sB, cA * cB, 0,
      0      , 0  , 0      , 1
    ]
    /* eslint-enable no-multi-spaces,comma-spacing */

    return (
      <Section title='4D Value Noise'>
        <p>
          The following is a visualization of 4D value noise. The cube is a 3D cross section of the noise, moving at a constant speed along the 4th dimension.
        </p>
        <div
          className={styles.cubeContainer}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleMouseMove}
        >
          <div className={styles.cube} style={{ transform: `matrix3d(${rotationMatrix})` }}>
            <div className={styles.F}><canvas ref={this.F} /></div>
            <div className={styles.B}><canvas ref={this.B} /></div>
            <div className={styles.U}><canvas ref={this.U} /></div>
            <div className={styles.D}><canvas ref={this.D} /></div>
            <div className={styles.L}><canvas ref={this.L} /></div>
            <div className={styles.R}><canvas ref={this.R} /></div>
          </div>
        </div>
      </Section>
    )
  }
}

export default _4DValueNoise
