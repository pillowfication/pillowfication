import React, { Component } from 'react'
import classnames from 'classnames'

import $ from '../../../shared/Math.jsx'
import Graph, { fromSystem } from './Graph.jsx'
import { Fraction } from './gists/math'
import results from './gists/results.json'
import zf from '../../../foundation.scss'

function gcd (a, b) {
  a = Math.abs(a)
  while (b) {
    [a, b] = [b, a % b]
  }
  return a
}

const nodeLabels = 'ABCDEF'

function findCombination (outputs, target, _skip = []) {
  const n = outputs.length
  for (let i = 0; i < n; ++i) {
    if (outputs[i] && outputs[i].equals(target)) {
      return [i]
    }
  }

  const subCombinations = outputs.map((output, i) => {
    if (_skip.includes(i) || !output || output.greaterThan(target)) {
      return null
    }
    return findCombination(outputs, target.add(new Fraction(-output.p, output.q)), _skip.slice().concat([i]))
  })

  let minLength = Number.MAX_SAFE_INTEGER
  let minCombinationIndex = -1
  for (let i = 0; i < n; ++i) {
    const subCombination = subCombinations[i]
    if (subCombination && subCombination.length < minLength) {
      minLength = subCombination.length
      minCombinationIndex = i
    }
  }

  return minCombinationIndex >= 0 ? subCombinations[minCombinationIndex].concat([minCombinationIndex]).sort() : null
}

class AllFractions extends Component {
  constructor (props) {
    super(props)

    this.state = { p: 41, q: 47 }

    this.handleInputP = this.handleInputP.bind(this)
    this.handleInputQ = this.handleInputQ.bind(this)
  }

  handleInputP (event) {
    this.setState({ p: event.target.value })
  }

  handleInputQ (event) {
    this.setState({ q: event.target.value })
  }

  render () {
    const p = Number(this.state.p)
    const q = Number(this.state.q)
    const m = gcd(p, q)
    const mp = p / m
    const mq = q / m

    const fraction = `${mp}/${mq}`
    const isPowerOf2 = mq > 1 && (mq & (mq - 1)) === 0

    let graph, outputs
    if (isPowerOf2 && mp < mq) {
      const exponent = Math.log2(mq)
      const nodes = []
      const edges = []
      outputs = []

      nodes.push({ name: 'I', x: 30, y: 120 })
      edges.push({ from: 'I', to: nodeLabels[0] })
      for (let i = 0; i < exponent; ++i) {
        nodes.push({ name: nodeLabels[i], x: 110 + 80 * i, y: 70 })
        nodes.push({ name: 'O' + nodeLabels[i], label: '1/' + (2 << i), x: 110 + 80 * i, y: 170, isFraction: true })
        edges.push({ from: nodeLabels[i], to: 'O' + nodeLabels[i] })
        outputs.push(new Fraction(1, 2 << i))
        if (i < exponent - 1) {
          edges.push({ from: nodeLabels[i], to: nodeLabels[i + 1] })
        }
      }
      nodes.push({ name: 'O' + nodeLabels[exponent], label: '1/' + (1 << exponent), x: 110 + 80 * exponent, y: 120, isFraction: true })
      edges.push({ from: nodeLabels[exponent - 1], to: 'O' + nodeLabels[exponent] })

      graph = (
        <Graph
          width={80 * exponent + 140}
          height={200}
          data={{ nodes, edges }}
        />
      )
    } else {
      for (const result of results) {
        if (result.v.includes(fraction)) {
          graph = fromSystem(result.s)
          outputs = result.s.o.map(f => {
            if (f) {
              const [p, q] = f.split('/')
              return new Fraction(Number(p), Number(q))
            } else {
              return null
            }
          })
          break
        }
      }
    }

    return (
      <>
        <div className={classnames(zf.gridX, zf.gridPaddingX)}>
          <div className={classnames(zf.medium6, zf.cell)}>
            <label>
              <span style={{ fontSize: '1.2rem' }}><$ $='0 < p < q' /></span>
              <input type='number' value={p} onChange={this.handleInputP} />
            </label>
          </div>
          <div className={classnames(zf.medium6, zf.cell)}>
            <label>
              <span style={{ fontSize: '1.2rem' }}><$ $='1 < q \leq 64' /></span>
              <input type='number' value={q} onChange={this.handleInputQ} />
            </label>
          </div>
        </div>
        {graph
          ? (
            <>
              {graph}
              <$ $$={`
                \\frac{${p}}{${q}} =
                ${findCombination(outputs, new Fraction(mp, mq)).map(i => `\\text{${nodeLabels[i]}}`).join('+')}`}
              />
            </>
          )
          : <p>No results.</p>}
      </>
    )
  }
}

export default AllFractions
