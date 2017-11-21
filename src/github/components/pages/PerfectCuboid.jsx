/* global MathJax */
import React, { Component } from 'react'
import classnames from 'classnames'
import { toId, fromId, getEquivalents } from 'perfect-cuboid/src/enumerate'
import verify from 'perfect-cuboid/src/verify'

import Code from '../Code.jsx'
import $ from '../Math.jsx'
import zf from '../../foundation.scss'
import '../../font-awesome.scss'
import styles from './PerfectCuboid.scss'

const lineStyle = {
  black: { stroke: '#000', strokeWidth: 2, strokeLinecap: 'round' },
  gray: { stroke: '#aaa', strokeWidth: 2, strokeLinecap: 'round' },
  blackDash: { stroke: '#000', strokeDasharray: '5,8', strokeWidth: 2, strokeLinecap: 'round' },
  grayDash: { stroke: '#aaa', strokeDasharray: '5,8', strokeWidth: 2, strokeLinecap: 'round' }
}

const TRIPLES = createMap([
  { name: 'abd', label: '(a, b, d)' },
  { name: 'ace', label: '(a, c, e)' },
  { name: 'bcf', label: '(b, c, f)' },
  { name: 'afg', label: '(a, f, g)' },
  { name: 'beg', label: '(b, e, g)' },
  { name: 'cdg', label: '(c, d, g)' }
])
const TYPES = createMap([
  { name: 'xN', label: '\\times N' },
  { name: 'x2', label: '\\times 2' },
  { name: 'x3', label: '\\times 3' },
  { name: 'x4', label: '\\times 4' },
  { name: 'x5', label: '\\times 5' },
  { name: 'x2 x3', label: '\\times 2, 3' },
  { name: 'x2 x5', label: '\\times 2, 5' },
  { name: 'x3 x4', label: '\\times 3, 4' },
  { name: 'x3 x5', label: '\\times 3, 5' },
  { name: 'x4 x5', label: '\\times 4, 5' },
  { name: 'x2 x3 x5', label: '\\times 2, 3, 5' },
  { name: 'x3 x4 x5', label: '\\times 3, 4, 5' }
])
const SIDES = createMap([
  { name: 'a', label: 'a' },
  { name: 'b', label: 'b' },
  { name: 'c', label: 'c' },
  { name: 'd', label: 'd' },
  { name: 'e', label: 'e' },
  { name: 'f', label: 'f' },
  { name: 'g', label: 'g' }
])
const DIVISIBILITY = createMap([
  { name: 'd2', label: '2 \\mid n' },
  { name: 'd3', label: '3 \\mid n' },
  { name: 'd4', label: '4 \\mid n' },
  { name: 'd5', label: '5 \\mid n' }
])
const TRUTH_STATES = createMap([
  { name: -1, label: styles.false },
  { name: 0, label: styles.unknown },
  { name: 1, label: styles.true }
])
function createMap (map) {
  map._map = {}
  map.forEach(pair => { map._map[pair.name] = pair.label })
  map.get = name => map._map[name]
  return map
}

const PASSED = [ 3, 7, 9, 11, 27, 33, 40, 44, 55, 328, 3463, 3467, 3483, 3489, 3500, 3511, 3890, 3896, 3916, 4039, 4059, 4754, 6915, 6919, 6939, 7203, 7344, 7346, 7920, 13831, 13851, 14258, 44935, 44939, 44966, 44972, 44983, 45038, 45410, 48391, 48422, 48675, 48708, 48818, 49392, 55303, 55334, 55730, 546339, 547056 ]

class CuboidTester extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: Math.pow(12, 6) * Math.random() | 0,
      stepIndex: -1
    }

    this.inputId = this.inputId.bind(this)
    this.inputIdRadio = this.inputIdRadio.bind(this)
    this.selectId = this.selectId.bind(this)
    this.selectStep = this.selectStep.bind(this)
    this.selectKnowledge = this.selectKnowledge.bind(this)
  }

  componentDidUpdate () {
    MathJax.Hub.Queue([ 'Typeset', MathJax.Hub ])
  }

  inputId (event) {
    this.setState({
      id: event.target.value,
      stepIndex: -1
    })
  }

  inputIdRadio (triple, type) {
    const permutation = fromId(this.state.id)
    permutation[triple] = type
    this.setState({
      id: toId(permutation),
      stepIndex: -1
    })
  }

  selectId (id) {
    this.setState({
      id,
      stepIndex: -1
    })
  }

  selectStep (stepIndex) {
    this.setState({ stepIndex })
  }

  selectKnowledge (stateArray, side, divisibility) {
    const stepIndex = stateArray.findIndex(step =>
      step.rule &&
      side === step.rule.triplet[step.rule.rule._then.side] &&
      divisibility === step.rule.rule._then.d
    )

    if (stepIndex !== -1 && (this.state.stepIndex === -1 || stepIndex <= this.state.stepIndex)) {
      this.setState({ stepIndex })
    }
  }

  stringifyCondition (triplet, condition) {
    return condition.d.substring(1) + ' ' +
      (condition.truth === 1 ? '\\mid ' : '\\nmid ') +
      SIDES.get(triplet[condition.side])
  }

  stringifyStep (permutation, step) {
    if (!step) {
      return '\\text{Initialization}'
    }

    const conditionType = '\\text{' +
      '$' + TRIPLES.get(step.triplet) + '$ is ' +
      '$' + TYPES.get(permutation[step.triplet]) + '$}'
    const _if = [ conditionType ]
      .concat(step.rule._if.map(condition => this.stringifyCondition(step.triplet, condition)))
      .join('\\;\\land\\;')
    const _then = this.stringifyCondition(step.triplet, step.rule._then)

    return _if + ' \\implies ' + _then
  }

  render () {
    const permutation = fromId(this.state.id)
    const verification = verify(this.state.id)
    const stepIndex = this.state.stepIndex === -1 ? verification.stateArray.length - 1 : this.state.stepIndex
    const stateInfo = verification.stateArray[stepIndex]
    const state = stateInfo.state
    const newKnowledge = stepIndex && {
      side: stateInfo.rule.triplet[stateInfo.rule.rule._then.side],
      d: stateInfo.rule.rule._then.d
    }

    return (
      <div className={zf.row}>
        <div className={classnames(zf.columns, zf.small12, zf.medium4, zf.large3)}>
          Case Identifier<br />
          <input type='number' value={this.state.id} onChange={this.inputId} />
        </div>
        <div className={classnames(zf.columns, zf.small12, zf.medium8, zf.large9)}>
          Equivalents<br />
          {getEquivalents(this.state.id).map(id =>
            <button key={id}
              type='button'
              className={classnames(styles.idButton, zf.button, zf.hollow)}
              onClick={this.selectId.bind(this, id)}
            >
              {id}
            </button>
          )}
        </div>
        <div className={classnames(zf.columns, zf.small12, zf.tableScroll)}>
          <table className={styles.inputTable}>
            <thead>
              <tr>
                <th />
                {TRIPLES.map(triple => <th key={triple.name}><$ $={triple.label} /></th>)}
              </tr>
            </thead>
            <tbody>
              {TYPES.map(type =>
                <tr key={type.name}>
                  <th><$ $={type.label} /></th>
                  {TRIPLES.map(triple =>
                    <td key={triple.name}>
                      <label>
                        <input type='radio'
                          name={triple.name}
                          checked={permutation[triple.name] === type.name}
                          onChange={this.inputIdRadio.bind(this, triple.name, type.name)}
                        />
                      </label>
                    </td>
                  )}
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className={classnames(zf.columns, zf.small12, zf.large6, zf.tableScroll)}>
          Steps<br />
          <ol className={styles.steps} start={0}>
            {verification.stateArray.map((step, index) =>
              <li key={index}
                className={classnames({ [styles.selected]: stepIndex === index })}
                onClick={this.selectStep.bind(this, index)}
              >
                <$ $={this.stringifyStep(permutation, step.rule)} />
              </li>
            )}
            <li className={classnames({ [styles.contradiction]: verification.contradiction })}>
              <$ $={verification.contradiction
                ? this.stringifyStep(permutation, verification.contradiction)
                : '\\text{No contradiction}'}
              />
            </li>
          </ol>
        </div>
        <div className={classnames(zf.columns, zf.small12, zf.large6, zf.tableScroll)}>
          Knowledge (step {stepIndex})<br />
          <table className={styles.knowledgeTable}>
            <thead>
              <tr>
                <th />
                {DIVISIBILITY.map(divisibility =>
                  <th key={divisibility.name}>
                    <$ $={divisibility.label} />
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {SIDES.map(side =>
                <tr key={side.name}>
                  <th><$ $={side.label} /></th>
                  {DIVISIBILITY.map(divisibility =>
                    <td key={divisibility.name}
                      className={classnames({
                        [TRUTH_STATES.get(state[side.name][divisibility.name])]: true,
                        [styles.selected]: stepIndex &&
                          newKnowledge.side === side.name &&
                          newKnowledge.d === divisibility.name
                      })}
                      onClick={this.selectKnowledge.bind(this, verification.stateArray, side.name, divisibility.name)}
                    />
                  )}
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className={classnames(zf.columns, zf.small12)}>
          Passed Cases<br />
          {PASSED.map(id =>
            <button key={id}
              type='button'
              className={classnames(styles.idButton, zf.button, zf.hollow)}
              onClick={this.selectId.bind(this, id)}
            >
              {id}
            </button>
          )}
        </div>
      </div>
    )
  }
}

export default class PerfectCuboid extends Component {
  componentDidMount () {
    MathJax.Hub.Queue([ 'Typeset', MathJax.Hub ])
  }

  render () {
    return (
      <div>
        <h1>Perfect Cuboid</h1>
        <p>Also a known as a perfect Euler brick or a perfect box, a <a href='https://en.wikipedia.org/wiki/Euler_brick#Perfect_cuboid'>perfect cuboid</a> is a cuboid where all distances between vertices are integers. Existence of a perfect cuboid is an unsolved problem in mathematics.</p>
        <div className={classnames(styles.diagramContainer, zf.tableScroll)}>
          <div>
            <svg className={styles.diagram}>
              <line x1='320' y1='20' x2='320' y2='160' style={lineStyle.gray} />
              <line x1='420' y1='240' x2='320' y2='160' style={lineStyle.gray} />
              <line x1='320' y1='160' x2='20' y2='160' style={lineStyle.gray} />
              <line x1='120' y1='240' x2='320' y2='20' style={lineStyle.grayDash} />
              <line x1='20' y1='20' x2='120' y2='100' style={lineStyle.black} />
              <line x1='120' y1='100' x2='420' y2='100' style={lineStyle.black} />
              <line x1='420' y1='100' x2='320' y2='20' style={lineStyle.black} />
              <line x1='320' y1='20' x2='20' y2='20' style={lineStyle.black} />
              <line x1='20' y1='20' x2='20' y2='160' style={lineStyle.black} />
              <line x1='120' y1='100' x2='120' y2='240' style={lineStyle.black} />
              <line x1='420' y1='100' x2='420' y2='240' style={lineStyle.black} />
              <line x1='20' y1='160' x2='120' y2='240' style={lineStyle.black} />
              <line x1='120' y1='240' x2='420' y2='240' style={lineStyle.black} />
              <line x1='20' y1='20' x2='120' y2='240' style={lineStyle.blackDash} />
              <line x1='120' y1='240' x2='420' y2='100' style={lineStyle.blackDash} />
              <line x1='420' y1='100' x2='20' y2='20' style={lineStyle.blackDash} />
            </svg>
            <div className={styles.labels}>
              <div style={{ left: '0px', top: '80px' }}>\(a\)</div>
              <div style={{ left: '50px', top: '198px' }}>\(b\)</div>
              <div style={{ left: '260px', top: '242px' }}>\(c\)</div>
              <div style={{ left: '70px', top: '100px' }}>\(d\)</div>
              <div style={{ left: '140px', top: '44px' }}>\(e\)</div>
              <div style={{ left: '240px', top: '184px' }}>\(f\)</div>
              <div style={{ left: '190px', top: '124px' }}>\(g\)</div>
            </div>
            <$ $$={`
              \\begin{align}
                a^2 + b^2 &= d^2\\\\
                a^2 + c^2 &= e^2\\\\
                b^2 + c^2 &= f^2\\\\
                a^2 + f^2 = b^2 + e^2 = c^2 + d^2 &= g^2
              \\end{align}
              \\quad
              \\text{where $a, b, c, d, e, f, g \\in \\mathbb{Z}^+$}
            `} />
          </div>
        </div>
        <p>There are six <a href='https://en.wikipedia.org/wiki/Pythagorean_triple'>Pythagorean triples</a> to satisfy. I tried to test which kinds of triples are possible using modular arithmetic. Triples were categorized by their divisibility:</p>
        <$ $$={`
          \\begin{align}
            \\times N &: \\text{not divisible by $2, 3, 5$}\\\\
            \\times 2 &: \\text{divisible by only $2$}\\\\
            \\times 3 &: \\text{divisible by only $3$}\\\\
            \\times 4 &: \\text{divisible by only $4$}\\\\
            \\times 5 &: \\text{divisible by only $5$}\\\\
            \\times 2, 3 &: \\text{divisible by only $2, 3$}\\\\
            \\times 2, 5 &: \\text{divisible by only $2, 5$}\\\\
            \\times 3, 4 &: \\text{divisible by only $3, 4$}\\\\
            \\times 3, 5 &: \\text{divisible by only $3, 5$}\\\\
            \\times 4, 5 &: \\text{divisible by only $4, 5$}\\\\
            \\times 2, 3, 5 &: \\text{divisible by only $2, 3, 5$}\\\\
            \\times 3, 4, 5 &: \\text{divisible by only $3, 4, 5$}
          \\end{align}
        `} />
        <p>For example, if <$ $='(a, b, d)' /> is <$ $='\times 5' /> and <$ $='(b, c, f)' /> is <$ $='\times 3' />, then <$ $='f' /> cannot be divisible by <$ $='5' /> and <$ $='(a, f, g)' /> cannot be <$ $='\times 5' />.</p>
        <p>With <$ $='6' /> triples and <$ $='12' /> kinds each, I created a program to check each of the <$ $='12^6 = 2{,}985{,}984' /> cases. During a check, a knowledge table would keep track of each length’s divisibility by <$ $='2' />, <$ $='3' />, <$ $='4' />, and <$ $='5' />. A list of possible proof steps was created for the program to use to update the knowledge table. For a triple <$ $='(x, y, z)' /> that was <$ $='\times 2, 3' />, possible proof steps looked like</p>
        <Code lang='javascript' $={`
'x2 x3': [
  { _if: [ y.d4 ], _then: x.not.d4 },
  { _if: [ x.not.d5, y.not.d5 ], _then: z.d5 },
  // ...
]
        `} />
        <p>The program would keep updating the knowledge table until no new facts were available, or if a contradiction was reached.</p>
        <p>To speed up checking, some extra considerations were made. Due to symmetries of a cuboid, certain cases could be identical to each other. The case with the smallest identifier was used as the representative for each group of identical cases. In addition, some cases did not represent a primitive cuboid, and those cases were disregarded.</p>
        <hr />
        <h3>Playground</h3>
        <p>See the old playground at <a href='http://old.pillowfication.com/projects/cuboid/'>old.pillowfication.com/projects/cuboid</a>.</p>
        <CuboidTester />
      </div>
    )
  }
}
