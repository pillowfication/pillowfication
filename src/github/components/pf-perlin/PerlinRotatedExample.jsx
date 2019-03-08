import React, { Component } from 'react'
import PFPerlin from 'pf-perlin'

import $ from '../Math.jsx'
import zf from '../../foundation.scss'
import styles from './PFPerlin.scss'

const PERLIN_RESOLUTION = 100
const PERLIN_HEIGHT = 400
const PERLIN_THETA = (1 + Math.sqrt(5)) * Math.PI

class PerlinRotatedExample extends Component {
  constructor (props) {
    super(props)

    this.perlinOffsetX = 0
    this.perlinOffsetY = 0
    this.perlinDrag = null
    this.perlinNoise = new PFPerlin({ octaves: 1 })
    this.perlinImageData = {}

    this.canvas = React.createRef()
    this.onMouseDownPerlin = this.onMouseDownPerlin.bind(this)
    this.onMouseUpPerlin = this.onMouseUpPerlin.bind(this)
    this.onDragPerlin = this.onDragPerlin.bind(this)
  }

  componentDidMount () {
    const canvas = this.canvas.current
    const { offsetWidth: width } = canvas
    const dpi = window.devicePixelRatio || 1
    canvas.setAttribute('height', PERLIN_HEIGHT * dpi)
    canvas.setAttribute('width', width * dpi)
    this.drawPerlin()
  }

  onMouseDownPerlin (event) {
    this.perlinDrag = { x: event.clientX, y: event.clientY }
  }

  onMouseUpPerlin () {
    this.perlinDrag = null
  }

  onDragPerlin (event) {
    if (this.perlinDrag) {
      this.perlinOffsetX = this.perlinOffsetX + (event.clientX - this.perlinDrag.x)
      this.perlinOffsetY = this.perlinOffsetY + (event.clientY - this.perlinDrag.y)
      this.perlinDrag.x = event.clientX
      this.perlinDrag.y = event.clientY
      this.drawPerlin()
    } else {
      const canvas = this.canvas.current
      const boundingRect = this.canvas.current.getBoundingClientRect()
      const x = Math.floor((event.clientX - boundingRect.x - canvas.width / 2 - this.perlinOffsetX) / PERLIN_RESOLUTION)
      const y = Math.floor((event.clientY - boundingRect.y - canvas.height / 2 - this.perlinOffsetY) / PERLIN_RESOLUTION)
      this.createPerlinImageData(x, y)
      this.drawPerlin()
    }
  }

  createPerlinImageData (x, y) {
    let axis = this.perlinImageData[x]
    if (axis && axis[y]) {
      return
    }

    const imageData = this.canvas.current
      .getContext('2d')
      .createImageData(PERLIN_RESOLUTION, PERLIN_RESOLUTION)
    const { data } = imageData
    let dataIndex = 0

    const { perlinNoise } = this
    for (let row = 0; row < PERLIN_RESOLUTION; ++row) {
      const y0 = y + row / PERLIN_RESOLUTION
      for (let col = 0; col < PERLIN_RESOLUTION; ++col) {
        const x0 = x + col / PERLIN_RESOLUTION
        const coordRadius = Math.hypot(x0, y0)
        const coordTheta = Math.atan2(y0, x0)
        let value = 0
        let persistence = 1
        for (let octave = 0; octave < 8; ++octave) {
          const theta = coordTheta + octave * PERLIN_THETA
          const radius = coordRadius * Math.pow(2, octave)
          const coord = [ radius * Math.cos(theta), radius * Math.sin(theta) ]
          value += perlinNoise.get(coord) * persistence
          persistence /= 2
        }
        value = value / 2 * 256
        data[dataIndex++] = value
        data[dataIndex++] = value
        data[dataIndex++] = 255
        data[dataIndex++] = 255
      }
    }

    (axis || (this.perlinImageData[x] = {}))[y] = imageData
  }

  drawPerlin () {
    const canvas = this.canvas.current
    const { width, height } = canvas
    const ctx = canvas.getContext('2d')

    const { perlinOffsetX, perlinOffsetY } = this

    const left = perlinOffsetX < 0 ? perlinOffsetX % PERLIN_RESOLUTION : perlinOffsetX % PERLIN_RESOLUTION - PERLIN_RESOLUTION
    const up = perlinOffsetY < 0 ? perlinOffsetY % PERLIN_RESOLUTION : perlinOffsetY % PERLIN_RESOLUTION - PERLIN_RESOLUTION
    const startX = -Math.floor((perlinOffsetX + width / 2) / PERLIN_RESOLUTION) - 1
    const startCanvasX = (Math.floor(width / 2 + left) % PERLIN_RESOLUTION) - PERLIN_RESOLUTION
    const startY = -Math.floor((perlinOffsetY + PERLIN_HEIGHT / 2) / PERLIN_RESOLUTION) - 1
    const startCanvasY = (Math.floor(PERLIN_HEIGHT / 2 + up) % PERLIN_RESOLUTION) - PERLIN_RESOLUTION

    ctx.clearRect(0, 0, width, height)

    for (let x = startX, canvasX = startCanvasX; canvasX <= width + PERLIN_RESOLUTION; ++x, canvasX += PERLIN_RESOLUTION) {
      for (let y = startY, canvasY = startCanvasY; canvasY <= PERLIN_HEIGHT + PERLIN_RESOLUTION; ++y, canvasY += PERLIN_RESOLUTION) {
        const axis = this.perlinImageData[x]
        const imageData = axis && axis[y]
        if (imageData) {
          ctx.putImageData(imageData, canvasX, canvasY)
        }
      }
    }
  }

  render () {
    return (
      <>
        <div className={styles.perlinExample}
          onMouseDown={this.onMouseDownPerlin}
          onMouseUp={this.onMouseUpPerlin}
          onMouseMove={this.onDragPerlin}
        >
          <canvas ref={this.canvas} />
        </div>
        <div className={zf.textCenter}>
          <small>
            2D Perlin noise with 8 octaves, each rotated by <$ $='\theta = \pi \cdot (1 + \sqrt{5})' />.
            <br />
            Mouseover areas to generate noise. You can also drag the image around.
          </small>
        </div>
      </>
    )
  }
}

export default PerlinRotatedExample
