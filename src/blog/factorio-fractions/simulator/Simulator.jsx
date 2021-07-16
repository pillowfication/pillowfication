import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import Highlight from '../../../Highlight'
import tokenizeBlueprint from './tokenize-blueprint'
import attachNetwork from './attach-network'
import p from './Path'

const BS = 40 // Grid size in pixels
const BS2 = BS / 2
const BP = 2 // Belt padding in pixels
const BW = BS - BP * 2 // Belt width in pixels
const BA = BS - BP // Belt large arc radius in pixels
const BI = 6 // Belt indicator arrow width
const BI1 = BS2 - BI // Smaller belt indicator padding
const BI2 = BS2 - BI / 2 // Larger belt indicator padding
const BIs = BI * Math.sqrt(2)
const BI1s = BS2 - (3 / 4) * BIs + (1 / 2 - Math.sqrt(2) / 4) * BS
const BI2s = BS2 - (1 / 4) * BIs + (1 / 2 - Math.sqrt(2) / 4) * BS
const BI1sn = BS - BI1s
const BI2sn = BS - BI2s
const BB = 9 // Blob width in pixels (the apothem)
const BR = BB * 2 / Math.sqrt(3)
const BR2 = BR / 2
const BELT_SPEED = 4 // Speed multiplier where 1 results in 1 block/second

const styles = {
  blobFace1: { fill: '#0852ff' },
  blobFace2: { fill: '#3b75ff' },
  blobFace3: { fill: '#739cff' },
  input: { strokeWidth: '4', stroke: '#56d161', fill: '#bdffc3' },
  output: { strokeWidth: '4', stroke: '#ff4747', fill: '#ffbaba' },
  inputText: { textAnchor: 'middle', dominantBaseline: 'central' },
  belt: { fill: '#d0d0d0' },
  beltIndicator: { fill: 'blue' },
  splitterIndicator: { fill: 'yellow' },
  darkGray: { fill: '#777777' },
  lightGray: { fill: '#bbbbbb' },
  darkBlue: { fill: '#0000cc' }
}

function getBlobLocation (node, position) {
  const { inDirection: inn, direction: out } = node
  if (!inn || inn === out) {
    switch (node.direction) {
      case '^': return { x: 0.5, y: 1 - position }
      case '>': return { x: position, y: 0.5 }
      case 'v': return { x: 0.5, y: position }
      case '<': return { x: 1 - position, y: 0.5 }
    }
  } else {
    const theta = Math.PI / 2 * position
    const cos = Math.cos(theta) * 0.5
    const sin = Math.sin(theta) * 0.5
    switch (inn) {
      case '^': return out === '>' ? { x: 1 - cos, y: 1 - sin } : { x: cos, y: 1 - sin }
      case '>': return out === '^' ? { x: sin, y: cos } : { x: sin, y: 1 - cos }
      case 'v': return out === '>' ? { x: 1 - cos, y: sin } : { x: cos, y: sin }
      case '<': return out === '^' ? { x: 1 - sin, y: cos } : { x: 1 - sin, y: 1 - cos }
    }
  }
}

function addBlobs (layers, x, y, node) {
  if (node.items.length) {
    layers[1].push(...node.items.map(item => {
      const { x: px, y: py } = getBlobLocation(node, item.position)
      return { x: x + BS * px, y: y + BS * py }
    }))
  }
}

function drawBlob (blob, index) {
  const M = `M${blob.x} ${blob.y}`
  return (
    <React.Fragment key={index}>
      <path d={`${M} l${BB} ${-BR2} v${BR} l${-BB} ${BR2} Z`} style={styles.blobFace1} />
      <path d={`${M} v${BR} l${-BB} ${-BR2} v${-BR} Z`} style={styles.blobFace2} />
      <path d={`${M} l${-BB} ${-BR2} l${BB} ${-BR2} l${BB} ${BR2} Z`} style={styles.blobFace3} />
    </React.Fragment>
  )
}

function drawInputBlock (layers, x, y, token, skip, bare) {
  const key = `${x},${y}`
  if (!skip) {
    layers[0].push(<rect key={key} x={x + 2} y={y + 2} width={BS - 4} height={BS - 4} style={styles.input} />)
  }

  bare && layers[2].push(<text key={key} x={x + BS2} y={y + BS2} style={styles.inputText}>{token.node.count}</text>)
}

function drawOutputBlock (layers, x, y, token, skip, bare) {
  const key = `${x},${y}`
  if (!skip) {
    layers[0].push(<rect key={key} x={x + 2} y={y + 2} width={BS - 4} height={BS - 4} style={styles.output} />)
  }

  bare && layers[2].push(<text key={key} x={x + BS2} y={y + BS2} style={styles.inputText}>{token.node.count}</text>)
}

function drawDirectionalIndicatorBlock (layers, x, y, token, skip) {
  if (!skip) {
    const key = `${x},${y}`
    switch (token.direction) {
      case '^':
        layers[0].push(
          <React.Fragment key={key}>
            <rect x={x + BP} y={y} width={BW} height={BS} style={styles.lightGray} />
            <rect x={x + BS2 - 2} y={y + 9} width={4} height={BS - 18} style={styles.darkGray} />
            <path d={p(x + BS2 - 8, y + 15).l(8, -8).l(8, 8)} style={styles.darkGray} />
          </React.Fragment>
        )
        break
      case '>':
        layers[0].push(
          <React.Fragment key={key}>
            <rect x={x} y={y + BP} width={BS} height={BW} style={styles.lightGray} />
            <rect x={x + 9} y={y + BS2 - 2} width={BS - 18} height={4} style={styles.darkGray} />
            <path d={p(x + BS - 15, y + BS2 - 8).l(8, 8).l(-8, 8)} style={styles.darkGray} />
          </React.Fragment>
        )
        break
      case 'v':
        layers[0].push(
          <React.Fragment key={key}>
            <rect x={x + BP} y={y} width={BW} height={BS} style={styles.lightGray} />
            <rect x={x + BS2 - 2} y={y + 9} width={4} height={BS - 18} style={styles.darkGray} />
            <path d={p(x + BS2 - 8, y + BS - 15).l(8, 8).l(8, -8)} style={styles.darkGray} />
          </React.Fragment>
        )
        break
      case '<':
        layers[0].push(
          <React.Fragment key={key}>
            <rect x={x} y={y + BP} width={BS} height={BW} style={styles.lightGray} />
            <rect x={x + 9} y={y + BS2 - 2} width={BS - 18} height={4} style={styles.darkGray} />
            <path d={p(x + 15, y + BS2 - 8).l(-8, 8).l(8, 8)} style={styles.darkGray} />
          </React.Fragment>
        )
        break
    }
  }
}

function drawBeltBlock (layers, x, y, token, skip) {
  if (!skip) {
    const key = `${x},${y}`
    switch (token.node.inDirection + token.node.direction) {
      case '^^':
        layers[0].push(<path key={key} d={p(x + BP, y).h(BW).v(BS).h(-BW)} style={styles.belt} />)
        layers[0].push(<path key={key + 'i'} d={p(x + BI1, y + BS - BI2).l(BI, -BI).l(BI, BI)} style={styles.beltIndicator} />)
        break
      case '^>':
        layers[0].push(<path key={key} d={p(x + BP, y + BS).a(BA, -BA, 1).v(BW).a(-BP, BP, 0)} style={styles.belt} />)
        layers[0].push(<path key={key + 'i'} d={p(x + BI1s, y + BI2s).h(BIs).v(BIs)} style={styles.beltIndicator} />)
        break
      case '^<':
        layers[0].push(<path key={key} d={p(x, y + BP).a(BA, BA, 1).h(-BW).a(-BP, -BP, 0)} style={styles.belt} />)
        layers[0].push(<path key={key + 'i'} d={p(x + BI1sn, y + BI2s).h(-BIs).v(BIs)} style={styles.beltIndicator} />)
        break
      case '>^':
        layers[0].push(<path key={key} d={p(x, y + BP).a(BP, -BP, 0).h(BW).a(-BA, BA, 1)} style={styles.belt} />)
        layers[0].push(<path key={key + 'i'} d={p(x + BI2sn, y + BI1sn).v(-BIs).h(-BIs)} style={styles.beltIndicator} />)
        break
      case '>>':
        layers[0].push(<path key={key} d={p(x, y + BP).h(BS).v(BW).h(-BS)} style={styles.belt} />)
        layers[0].push(<path key={key + 'i'} d={p(x + BI2, y + BI1).l(BI, BI).l(-BI, BI)} style={styles.beltIndicator} />)
        break
      case '>v':
        layers[0].push(<path key={key} d={p(x, y + BP).a(BA, BA, 1).h(-BW).a(-BP, -BP, 0)} style={styles.belt} />)
        layers[0].push(<path key={key + 'i'} d={p(x + BI2sn, y + BI1s).v(BIs).h(-BIs)} style={styles.beltIndicator} />)
        break
      case 'v>':
        layers[0].push(<path key={key} d={p(x + BA, y).a(BP, BP, 0).v(BW).a(-BA, -BA, 1)} style={styles.belt} />)
        layers[0].push(<path key={key + 'i'} d={p(x + BI1s, y + BI2sn).h(BIs).v(-BIs)} style={styles.beltIndicator} />)
        break
      case 'vv':
        layers[0].push(<path key={key} d={p(x + BP, y).h(BW).v(BS).h(-BW)} style={styles.belt} />)
        layers[0].push(<path key={key + 'i'} d={p(x + BI1, y + BI2).l(BI, BI).l(BI, -BI)} style={styles.beltIndicator} />)
        break
      case 'v<':
        layers[0].push(<path key={key} d={p(x, y + BP).a(BP, -BP, 0).h(BW).a(-BA, BA, 1)} style={styles.belt} />)
        layers[0].push(<path key={key + 'i'} d={p(x + BI1sn, y + BI2sn).h(-BIs).v(-BIs)} style={styles.beltIndicator} />)
        break
      case '<^':
        layers[0].push(<path key={key} d={p(x + BA, y).a(BP, BP, 0).v(BW).a(-BA, -BA, 1)} style={styles.belt} />)
        layers[0].push(<path key={key + 'i'} d={p(x + BI2s, y + BI1sn).v(-BIs).h(BIs)} style={styles.beltIndicator} />)
        break
      case '<v':
        layers[0].push(<path key={key} d={p(x + BP, y + BS).a(BA, -BA, 1).v(BW).a(-BP, BP, 0)} style={styles.belt} />)
        layers[0].push(<path key={key + 'i'} d={p(x + BI2s, y + BI1s).v(BIs).h(BIs)} style={styles.beltIndicator} />)
        break
      case '<<':
        layers[0].push(<path key={key} d={p(x, y + BP).h(BS).v(BW).h(-BS)} style={styles.belt} />)
        layers[0].push(<path key={key + 'i'} d={p(x + BS - BI2, y + BI1).l(-BI, BI).l(BI, BI)} style={styles.beltIndicator} />)
        break
    }
  }

  addBlobs(layers, x, y, token.node)
}

function drawSplitterLeftBlock (layers, x, y, token, skip, bare) {
  const key = `${x},${y}`
  const { node } = token
  if (!skip) {
    switch (token.node.direction) {
      case '^': layers[0].push(<path key={key} d={p(x + BP, y).h(BW).v(BS).h(-BW)} style={styles.belt} />); break
      case '>': layers[0].push(<path key={key} d={p(x, y + BP).h(BS).v(BW).h(-BS)} style={styles.belt} />); break
      case 'v': layers[0].push(<path key={key} d={p(x + BP, y).h(BW).v(BS).h(-BW)} style={styles.belt} />); break
      case '<': layers[0].push(<path key={key} d={p(x, y + BP).h(BS).v(BW).h(-BS)} style={styles.belt} />); break
    }
  }

  switch (node.direction) {
    case '^':
      layers[2].push(
        <React.Fragment key={key}>
          <rect x={x + 1} y={y + BS2 - 7} width={BS * 2 - 2} height={17} style={styles.darkGray} />
          <rect x={x + 1} y={y + BS2 + 5} width={BS * 2 - 2} height={3} style={styles.lightGray} />
          <path
            d={p(x, y + BS2 - 2)
              .v(-8).l(BS2, -5).l(BS2, 5).l(BS2, -5).l(BS2, 5)
              .v(8).l(-BS2, -5).l(-BS2, 5).l(-BS2, -5).l(-BS2, 5)}
            style={styles.beltIndicator}
          />
          {bare && <path d={p(x + BS2 - 6 + (node.parity > 0 ? 0 : BS), y + BS2 + 2).l(6, -6).l(6, 6)} style={styles.splitterIndicator} />}
        </React.Fragment>
      )
      break
    case '>':
      layers[2].push(
        <React.Fragment key={key}>
          <rect x={x + BS2 - 10} y={y + 1} width={17} height={BS * 2 - 2} style={styles.darkGray} />
          <rect x={x + BS2 - 8} y={y + 1} width={3} height={BS * 2 - 2} style={styles.lightGray} />
          <path
            d={p(x + BS2 + 2, y)
              .h(8).l(5, BS2).l(-5, BS2).l(5, BS2).l(-5, BS2)
              .h(-8).l(5, -BS2).l(-5, -BS2).l(5, -BS2).l(-5, -BS2)}
            style={styles.beltIndicator}
          />
          {bare && <path d={p(x + BS2 - 2, y + BS2 - 6 + (node.parity > 0 ? 0 : BS)).l(6, 6).l(-6, 6)} style={styles.splitterIndicator} />}
        </React.Fragment>
      )
      break
    case 'v':
      layers[2].push(
        <React.Fragment key={key}>
          <rect x={x - BS + 1} y={y + BS2 - 10} width={BS * 2 - 2} height={17} style={styles.darkGray} />
          <rect x={x - BS + 1} y={y + BS2 - 8} width={BS * 2 - 2} height={3} style={styles.lightGray} />
          <path
            d={p(x - BS, y + BS2 + 2)
              .v(8).l(BS2, 5).l(BS2, -5).l(BS2, 5).l(BS2, -5)
              .v(-8).l(-BS2, 5).l(-BS2, -5).l(-BS2, 5).l(-BS2, -5)}
            style={styles.beltIndicator}
          />
          {bare && <path d={p(x + BS2 - 6 - (node.parity > 0 ? 0 : BS), y + BS2 - 2).l(6, 6).l(6, -6)} style={styles.splitterIndicator} />}
        </React.Fragment>
      )
      break
    case '<':
      layers[2].push(
        <React.Fragment key={key}>
          <rect x={x + BS2 - 7} y={y - BS + 1} width={17} height={BS * 2 - 2} style={styles.darkGray} />
          <rect x={x + BS2 + 5} y={y - BS + 1} width={3} height={BS * 2 - 2} style={styles.lightGray} />
          <path
            d={p(x + BS2 - 2, y - BS)
              .h(-8).l(-5, BS2).l(5, BS2).l(-5, BS2).l(5, BS2)
              .h(8).l(-5, -BS2).l(5, -BS2).l(-5, -BS2).l(5, -BS2)}
            style={styles.beltIndicator}
          />
          {bare && <path d={p(x + BS2 + 2, y + BS2 - 6 - (node.parity > 0 ? 0 : BS)).l(-6, 6).l(6, 6)} style={styles.splitterIndicator} />}
        </React.Fragment>
      )
      break
  }

  addBlobs(layers, x, y, node.leftNode)
}

function drawSplitterRightBlock (layers, x, y, token, skip) {
  if (!skip) {
    const key = `${x},${y}`
    switch (token.node.direction) {
      case '^': layers[0].push(<path key={key} d={p(x + BP, y).h(BW).v(BS).h(-BW)} style={styles.belt} />); break
      case '>': layers[0].push(<path key={key} d={p(x, y + BP).h(BS).v(BW).h(-BS)} style={styles.belt} />); break
      case 'v': layers[0].push(<path key={key} d={p(x + BP, y).h(BW).v(BS).h(-BW)} style={styles.belt} />); break
      case '<': layers[0].push(<path key={key} d={p(x, y + BP).h(BS).v(BW).h(-BS)} style={styles.belt} />); break
    }
  }

  addBlobs(layers, x, y, token.node.rightNode)
}

function drawUndergroundDownBlock (layers, x, y, token, skip) {
  const key = `${x},${y}`
  if (!skip) {
    switch (token.node.direction) {
      case '^': layers[0].push(<path key={key} d={p(x + BP, y).h(BW).v(BS).h(-BW)} style={styles.belt} />); break
      case '>': layers[0].push(<path key={key} d={p(x, y + BP).h(BS).v(BW).h(-BS)} style={styles.belt} />); break
      case 'v': layers[0].push(<path key={key} d={p(x + BP, y).h(BW).v(BS).h(-BW)} style={styles.belt} />); break
      case '<': layers[0].push(<path key={key} d={p(x, y + BP).h(BS).v(BW).h(-BS)} style={styles.belt} />); break
    }
  }

  switch (token.node.direction) {
    case '^':
      layers[2].push(
        <React.Fragment key={key}>
          <rect x={x} y={y + 18} width={BS} height={12} style={styles.darkBlue} />
          <path d={`M${x} ${y + 18} l${BP} -18 h${BW} l${BP} 18 Z`} style={styles.beltIndicator} />
        </React.Fragment>
      )
      break
    case '>':
      layers[2].push(
        <React.Fragment key={key}>
          <rect x={x + BS - 30} y={y} width={12} height={BS} style={styles.darkBlue} />
          <path d={`M${x + BS - 18} ${y} l18 ${BP} v${BW} l-18 ${BP} Z`} style={styles.beltIndicator} />
        </React.Fragment>
      )
      break
    case 'v':
      layers[2].push(
        <React.Fragment key={key}>
          <rect x={x} y={y + BS - 30} width={BS} height={12} style={styles.darkBlue} />
          <path d={`M${x} ${y + BS - 18} l${BP} 18 h${BW} l${BP} -18 Z`} style={styles.beltIndicator} />
        </React.Fragment>
      )
      break
    case '<':
      layers[2].push(
        <React.Fragment key={key}>
          <rect x={x + 18} y={y} width={12} height={BS} style={styles.darkBlue} />
          <path d={`M${x} ${y + BP} l18 ${-BP} v${BS} l-18 ${-BP} Z`} style={styles.beltIndicator} />
        </React.Fragment>
      )
      break
  }

  for (const item of token.node.items) {
    if (item.position < 0.5) {
      const { x: px, y: py } = getBlobLocation(token.node, item.position)
      layers[1].push({ x: x + BS * px, y: y + BS * py })
    }
  }
}

function drawUndergroundUpBlock (layers, x, y, token, skip) {
  const key = `${x},${y}`
  if (!skip) {
    switch (token.node.direction) {
      case '^': layers[0].push(<path key={key} d={p(x + BP, y).h(BW).v(BS).h(-BW)} style={styles.belt} />); break
      case '>': layers[0].push(<path key={key} d={p(x, y + BP).h(BS).v(BW).h(-BS)} style={styles.belt} />); break
      case 'v': layers[0].push(<path key={key} d={p(x + BP, y).h(BW).v(BS).h(-BW)} style={styles.belt} />); break
      case '<': layers[0].push(<path key={key} d={p(x, y + BP).h(BS).v(BW).h(-BS)} style={styles.belt} />); break
    }
  }

  switch (token.node.direction) {
    case '^':
      layers[2].push(
        <React.Fragment key={key}>
          <rect x={x} y={y + BS - 30} width={BS} height={12} style={styles.darkBlue} />
          <path d={`M${x} ${y + BS - 18} l${BP} 18 h${BW} l${BP} -18 Z`} style={styles.beltIndicator} />
        </React.Fragment>
      )
      break
    case '>':
      layers[2].push(
        <React.Fragment key={key}>
          <rect x={x + 18} y={y} width={12} height={BS} style={styles.darkBlue} />
          <path d={`M${x} ${y + BP} l18 ${-BP} v${BS} l-18 ${-BP} Z`} style={styles.beltIndicator} />
        </React.Fragment>
      )
      break
    case 'v':
      layers[2].push(
        <React.Fragment key={key}>
          <rect x={x} y={y + 18} width={BS} height={12} style={styles.darkBlue} />
          <path d={`M${x} ${y + 18} l${BP} -18 h${BW} l${BP} 18 Z`} style={styles.beltIndicator} />
        </React.Fragment>
      )
      break
    case '<':
      layers[2].push(
        <React.Fragment key={key}>
          <rect x={x + BS - 30} y={y} width={12} height={BS} style={styles.darkBlue} />
          <path d={`M${x + BS - 18} ${y} l18 ${BP} v${BW} l-18 ${BP} Z`} style={styles.beltIndicator} />
        </React.Fragment>
      )
      break
  }

  for (const item of token.node.items) {
    if (item.position > 0.5) {
      const { x: px, y: py } = getBlobLocation(token.node, item.position)
      layers[1].push({ x: x + BS * px, y: y + BS * py })
    }
  }
}

class Simulator extends Component {
  constructor (props) {
    super(props)
    this.init(props)

    this.animationFrame = null
    this.previousTimestamp = null
    this.loop = null
    this.state = {
      state: 'READY',
      speedModifier: 1
    }

    this.handleClickPlayPause = this.handleClickPlayPause.bind(this)
    this.handleClickReset = this.handleClickReset.bind(this)
    this.handleClickSpeedModifier05 = this.handleClickSpeedModifier.bind(this, 0.5)
    this.handleClickSpeedModifier1 = this.handleClickSpeedModifier.bind(this, 1)
    this.handleClickSpeedModifier2 = this.handleClickSpeedModifier.bind(this, 2)
  }

  init (props) {
    try {
      this.grid = tokenizeBlueprint(props.blueprint)
      attachNetwork(this.grid)
    } catch (err) {
      this.error = err.message + '\n\nPlease check the console.'
      console.error('>>> BLUEPRINT\n', props.blueprint)
      try { console.error('>>> GRID\n', tokenizeBlueprint(props.blueprint)) } catch (_) {}
      console.error(err)
    }
  }

  handleClickPlayPause () {
    switch (this.state.state) {
      case 'READY':
      case 'PAUSED':
        this.setState({ state: 'PLAYING' })
        this.animationFrame = window.requestAnimationFrame(this.loop = timestamp => {
          const delta = this.previousTimestamp ? (timestamp - this.previousTimestamp) / 1000 * BELT_SPEED : 0
          if (this.grid.network.tick(delta * this.state.speedModifier)) {
            this.previousTimestamp = timestamp
            this.forceUpdate()
            this.animationFrame = window.requestAnimationFrame(this.loop)
          } else {
            this.setState({ state: 'DONE' })
            this.animationFrame = null
            this.previousTimestamp = null
            this.loop = null
          }
        })
        break
      case 'PLAYING':
        this.setState({ state: 'PAUSED' })
        window.cancelAnimationFrame(this.animationFrame)
        this.animationFrame = null
        this.previousTimestamp = null
        this.loop = null
        break
    }
  }

  handleClickReset () {
    switch (this.state.state) {
      case 'PLAYING':
      case 'PAUSED':
      case 'DONE':
        this.setState({ state: 'READY' })
        if (this.animationFrame) {
          window.cancelAnimationFrame(this.animationFrame)
          this.animationFrame = null
        }
        this.previousTimestamp = null
        this.loop = null
        this.init(this.props)
        break
    }
  }

  handleClickSpeedModifier (speedModifier) {
    this.setState({ speedModifier })
  }

  render () {
    if (this.error) {
      return <Highlight>{'Error creating simulator.\n' + this.error}</Highlight>
    } else {
      const classes = this.props.classes

      // `layers[0]` contains the base grid graphics
      // `layers[1]` contains the blobs as (x, y) coordinates
      // `layers[2]` contains splitters and underground belts and other graphics
      // that go on top of the blobs
      const { grid } = this
      const layers = [[], [], []]
      let skip = false
      if (this.layer0cache) {
        layers[0] = this.layer0cache
        skip = true
      }

      const bare = !this.props.bare

      for (let row = 0; row < grid.height; ++row) {
        for (let col = 0; col < grid.width; ++col) {
          const token = grid[row][col]
          if (token) {
            const x = col * BS
            const y = row * BS
            switch (token.type) {
              case 'INPUT': drawInputBlock(layers, x, y, token, skip, bare); break
              case 'OUTPUT': drawOutputBlock(layers, x, y, token, skip, bare); break
              case 'INPUT_DIRECTION':
              case 'OUTPUT_DIRECTION': drawDirectionalIndicatorBlock(layers, x, y, token, skip); break
              case 'BELT': drawBeltBlock(layers, x, y, token, skip); break
              case 'SPLITTER_LEFT': drawSplitterLeftBlock(layers, x, y, token, skip, bare); break
              case 'SPLITTER_RIGHT': drawSplitterRightBlock(layers, x, y, token, skip); break
              case 'UNDERGROUND_DOWN': drawUndergroundDownBlock(layers, x, y, token, skip); break
              case 'UNDERGROUND_UP': drawUndergroundUpBlock(layers, x, y, token, skip); break
            }
          }
        }
      }

      if (!skip) {
        this.layer0cache = layers[0]
      }
      layers[1] = layers[1].sort((a, b) => a.y === b.y ? a.x - b.x : a.y - b.y).map(drawBlob)

      const { speedModifier } = this.state

      return (
        <Box mt={2} mb={4} align='center'>
          <Box mb={2}>
            <svg width={grid.width * BS} height={grid.height * BS}>
              {layers[0]}{layers[1]}{layers[2]}{this.props.children}
            </svg>
          </Box>
          {bare &&
            <div>
              <ButtonGroup className={classes.buttonGroup} color='primary' size='small'>
                <Button onClick={this.handleClickPlayPause}>Play/Pause</Button>
                <Button onClick={this.handleClickReset}>Reset</Button>
              </ButtonGroup>
              <ButtonGroup className={classes.buttonGroup} color='primary' size='small'>
                <Button
                  disabled={speedModifier === 0.5}
                  onClick={this.handleClickSpeedModifier05}
                >
                  0.5×
                </Button>
                <Button
                  disabled={speedModifier === 1}
                  onClick={this.handleClickSpeedModifier1}
                >
                  1×
                </Button>
                <Button
                  disabled={speedModifier === 2}
                  onClick={this.handleClickSpeedModifier2}
                >
                  2×
                </Button>
              </ButtonGroup>
            </div>}
        </Box>
      )
    }
  }
}

// Simulator.propTypes = {
//   blueprint: PropTypes.string.isRequired,
//   bare: PropTypes.bool
// }

export default withStyles((theme) => ({
  buttonGroup: {
    margin: theme.spacing(0, 2),
    '& button': {
      textTransform: 'none'
    }
  }
}))(Simulator)
