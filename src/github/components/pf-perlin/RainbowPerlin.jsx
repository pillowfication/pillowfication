import React, { Component } from 'react'
import classnames from 'classnames'
import PFPerlin from 'pf-perlin'

import Section from '../Section.jsx'
import zf from '../../foundation.scss'
import styles from './PFPerlin.scss'

class RainbowPerlin extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isDrawing: false
    }

    this.canvas = React.createRef()
    this.drawRainbowPerlin = this.drawRainbowPerlin.bind(this)
  }

  componentDidMount () {
    this.drawRainbowPerlin()
  }

  componentWillUnmount () {
    if (this.animationId) {
      clearImmediate(this.animationId)
    }
  }

  drawRainbowPerlin () {
    if (this.state.isDrawing) {
      return
    }
    const _this = this
    _this.setState({ isDrawing: true })

    const canvas = _this.canvas.current
    const { offsetWidth: width, offsetHeight: height } = canvas
    const dpi = window.devicePixelRatio || 1
    canvas.setAttribute('height', height * dpi)
    canvas.setAttribute('width', width * dpi)

    const ctx = canvas.getContext('2d')
    const perlin3D = new PFPerlin({ dimensions: 3, octaves: 6 })
    const resolution = Math.max(width / 10, 50)

    const pillowText = document.createElement('canvas')
    pillowText.setAttribute('height', height * dpi)
    pillowText.setAttribute('width', width * dpi)
    const pillowTextCtx = pillowText.getContext('2d')
    pillowTextCtx.fillStyle = '#000000'
    pillowTextCtx.fillRect(0, 0, width, height)
    pillowTextCtx.font = `bold ${height * 0.7 | 0}px Times New Roman`
    pillowTextCtx.strokeStyle = '#FFFFFF'
    pillowTextCtx.fillStyle = '#FFFFFF'
    pillowTextCtx.textAlign = 'center'
    pillowTextCtx.textBaseline = 'middle'
    pillowTextCtx.fillText('Pillow', width * 0.5, height * 0.55)
    const pillowTextData = pillowTextCtx.getImageData(0, 0, width, height).data

    let row = 0
    _this.animationId = setImmediate(function loop () {
      if (row < height) {
        drawRow()
        ++row
        _this.animationId = setImmediate(loop)
      } else {
        _this.setState({ isDrawing: false })
        _this.animationId = undefined
      }
    })

    function drawRow () {
      const imageData = ctx.getImageData(0, 0, width, height)
      const data = imageData.data
      let dataIndex = row * width << 2
      for (let col = 0; col < width; ++col) {
        let r = perlin3D.get([ row / resolution, col / resolution, 0 ]) * 256
        let g = perlin3D.get([ row / resolution, col / resolution, 1 ]) * 256
        let b = perlin3D.get([ row / resolution, col / resolution, 2 ]) * 256
        const pillowTextValue = pillowTextData[dataIndex] / 255
        r += (255 - 2 * r) * pillowTextValue
        g += (255 - 2 * g) * pillowTextValue
        b += (255 - 2 * b) * pillowTextValue
        const gray = 0.2989 * r + 0.5870 * g + 0.1140 * b
        data[dataIndex++] = 1.5 * r - 0.5 * gray
        data[dataIndex++] = 1.5 * g - 0.5 * gray
        data[dataIndex++] = 1.5 * b - 0.5 * gray
        data[dataIndex++] = 255
      }
      ctx.putImageData(imageData, 0, 0)
    }
  }

  render () {
    return (
      <Section title='Rainbow Perlin'>
        <p>
          Each RGB channel is sampled over a 2D Perlin noise. Pixels in the text are inverted (with anti-aliasing). Then the pixels were brightened.
        </p>
        <canvas ref={this.canvas} className={styles.rainbowPerlin} />
        <br />
        <button
          type='button'
          className={classnames(zf.button, zf.expanded, { [zf.disabled]: this.state.isDrawing })}
          onClick={this.drawRainbowPerlin}
        >
          Redraw
        </button>
      </Section>
    )
  }
}

export default RainbowPerlin
