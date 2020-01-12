import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './FactorioFractions.scss'

Object.assign(styles, {
  node: { fill: 'white', stroke: '#1663c7', strokeWidth: '2px' },
  nodeSize: 25,
  nodeText: { fontFamily: 'Times New Roman', fontSize: '35px', textAnchor: 'middle', dominantBaseline: 'central' },
  nodeFractionText: { fontFamily: 'Times New Roman', fontSize: '20px', textAnchor: 'middle', dominantBaseline: 'central' },
  edge: { stroke: 'black', strokeWidth: '2px' }
})

class Graph extends Component {
  render () {
    const { nodes, edges } = this.props.data

    const nodeMap = {}
    for (const node of nodes) {
      nodeMap[node.name] = node
    }

    return (
      <div className={styles.graph}>
        <svg {...this.props}>
          <marker
            id='arrow'
            viewBox='0 0 10 10'
            refX='8' refY='5'
            markerWidth='6' markerHeight='6'
            orient='auto-start-reverse'
          >
            <path d='M0 0 L10 5 L0 10 z' />
          </marker>
          {nodes && nodes.map(node =>
            <React.Fragment key={node.name}>
              <circle cx={node.x} cy={node.y} r={styles.nodeSize} style={styles.node} />
              <text x={node.x} y={node.y} style={node.isFraction ? styles.nodeFractionText : styles.nodeText}>
                {node.label || node.name}
              </text>
            </React.Fragment>
          )}
          {edges && edges.map(edge => {
            let { x: fromX, y: fromY } = nodeMap[edge.from]
            let { x: toX, y: toY } = nodeMap[edge.to]
            const dx = toX - fromX
            const dy = toY - fromY
            const hypot = Math.hypot(dx, dy)
            const offsetFrom = (styles.nodeSize + 1) / hypot
            const offsetTo = (styles.nodeSize + 4) / hypot

            if (edge.offset) {
              const perpX = -dy / hypot * 4
              const perpY = dx / hypot * 4
              fromX += perpX
              toX += perpX
              fromY += perpY
              toY += perpY
            }

            return (
              <line
                key={`${edge.from}-${edge.to}`}
                x1={fromX + dx * offsetFrom} y1={fromY + dy * offsetFrom}
                x2={toX - dx * offsetTo} y2={toY - dy * offsetTo}
                style={styles.edge}
                markerEnd='url(#arrow)'
              />
            )
          })}
          {this.props.children}
        </svg>
      </div>
    )
  }
}

Graph.data = PropTypes.shape({
  nodes: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    offset: PropTypes.bool,
    isFraction: PropTypes.bool
  }).isRequired).isRequired,
  edges: PropTypes.arrayOf(PropTypes.shape({
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired
  })).isRequired
})

const edgeLength = 100
const nodeLabels = 'ABCDEF'

function fromSystem (system) {
  const n = system.edges.length
  const radius = edgeLength / 2 / Math.sin(Math.PI / n)
  const outputRadius = radius + edgeLength
  const mid = radius + edgeLength + 30
  const size = mid * 2

  const nodes = []
  const edges = []
  for (let i = 0; i < n; ++i) {
    const theta = 2 * Math.PI / n * i
    nodes.push({
      name: '' + nodeLabels[i],
      x: mid - Math.cos(theta) * radius,
      y: mid - Math.sin(theta) * radius
    })
  }
  if (system.outputs[0]) {
    nodes.push({ name: 'I', x: mid - outputRadius, y: mid - 30 })
    edges.push({ from: 'I', to: 'A' })
    nodes.push({ name: 'OA', label: system.outputs[0], x: mid - outputRadius, y: mid + 30, isFraction: true })
    edges.push({ from: 'A', to: 'OA' })
  } else {
    nodes.push({ name: 'I', x: mid - outputRadius, y: mid })
    edges.push({ from: 'I', to: 'A' })
  }
  for (let i = 1; i < n; ++i) {
    if (system.outputs[i]) {
      const theta = 2 * Math.PI / n * i
      nodes.push({
        name: 'O' + nodeLabels[i],
        label: system.outputs[i],
        x: mid - Math.cos(theta) * outputRadius,
        y: mid - Math.sin(theta) * outputRadius,
        isFraction: true
      })
      edges.push({ from: '' + nodeLabels[i], to: 'O' + nodeLabels[i] })
    }
  }
  for (let i = 0; i < n; ++i) {
    for (const j of system.edges[i]) {
      edges.push({ from: '' + nodeLabels[i], to: '' + nodeLabels[j], offset: system.edges[j].includes(i) })
    }
  }

  return (
    <Graph
      width={size}
      height={size}
      data={{ nodes, edges }}
    />
  )
}

export default Graph
export { fromSystem }
