import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { $, $$ } from '../../MathJax'
import Graph, { fromSystem } from './Graph.jsx'
import { Fraction } from './gists/math'
import results from './gists/results.json'

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
        <Grid container spacing={2}>
          <Grid item sm={6} align='right'>
            <Typography>{$('0 < p < q:')}</Typography>
          </Grid>
          <Grid item sm={6}>
            <TextField type='number' value={p} onChange={this.handleInputP} />
          </Grid>
          <Grid item sm={6} align='right'>
            <Typography>{$('1 < q \\leq 64:')}</Typography>
          </Grid>
          <Grid item sm={6}>
            <TextField type='number' value={q} onChange={this.handleInputQ} />
          </Grid>
          <Grid item sm={12}>
            {graph
              ? (
                <>
                  {graph}
                  {$$(`
                    \\frac{${p}}{${q}} =
                    ${findCombination(outputs, new Fraction(mp, mq)).map(i => `\\text{${nodeLabels[i]}}`).join('+')}
                  `)}
                </>
              ) : (
                <Typography paragraph>No results.</Typography>
              )
            }
          </Grid>
        </Grid>
      </>
    )
  }
}

export default AllFractions
