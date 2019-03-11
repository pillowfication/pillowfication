import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { fromId } from 'perfect-cuboid/src/enumerate'
import verify from 'perfect-cuboid/src/verify'
import { TRUE } from 'perfect-cuboid/src/Statement'
import { TRIPLES, TYPES, SIDES, DIVISIBILITY, TRUTH_STATES } from './maps'

import $ from '../../../shared/Math.jsx'
import zf from '../../../foundation.scss'
import styles from './PerfectCuboid.scss'

function stringifyStatement (statement) {
  return statement.divisibility.substring(1) + ' ' +
    (statement.truth === TRUE ? '\\mid ' : '\\nmid ') +
    SIDES.get(statement.triple[statement.side])
}

function stringifyStep (permutation, stepRule) {
  if (!stepRule) {
    return '\\text{Initialization}'
  }

  const conditionType = '\\text{' +
    '$' + TRIPLES.get(stepRule.then.triple) + '$ is ' +
    '$' + TYPES.get(permutation[stepRule.then.triple]) + '$}'
  const _if = [ conditionType ]
    .concat(stepRule.if.map(stringifyStatement))
    .join('\\;\\land\\;')
  const _then = stringifyStatement(stepRule.then)

  return _if + ' \\implies ' + _then
}

class StepSelector extends Component {
  constructor (props) {
    super(props)

    this.state = {
      stepIndex: -1
    }

    this.onSelectStep = this.onSelectStep.bind(this)
    this.onSelectKnowledge = this.onSelectKnowledge.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.id !== this.props.id) {
      this.setState({ stepIndex: -1 })
    }
  }

  onSelectStep (stepIndex) {
    this.setState({ stepIndex })
  }

  onSelectKnowledge (steps, side, divisibility) {
    const currStepIndex = this.state.stepIndex
    const nextStepIndex = steps.findIndex(step => {
      if (!step.rule) {
        return false
      }

      const then = step.rule.then
      return side === then.triple[then.side] && divisibility === then.divisibility
    })

    if (nextStepIndex !== -1 && (currStepIndex === -1 || nextStepIndex <= currStepIndex)) {
      this.setState({ stepIndex: nextStepIndex })
    }
  }

  render () {
    const { id } = this.props
    const permutation = fromId(id)
    const verification = verify(id)
    const stepIndex = this.state.stepIndex === -1 ? verification.steps.length - 1 : this.state.stepIndex
    const step = verification.steps[stepIndex]
    const then = stepIndex && step.rule.then
    const newKnowledge = stepIndex && {
      side: then.triple[then.side],
      divisibility: then.divisibility
    }

    return [
      <fieldset key='steps' className={`${zf.cell} ${zf.small12} ${zf.large6}`}>
        <legend>Steps</legend>
        <div className={zf.scroller}>
          <div className={styles.scrollerFix}>
            <ol className={styles.steps} start={0}>
              {verification.steps.map((step, index) =>
                <li key={index}
                  className={classnames({ [styles.selected]: stepIndex === index })}
                  onClick={this.onSelectStep.bind(this, index)}
                >
                  <$ $={stringifyStep(permutation, step.rule)} />
                </li>
              )}
              <li className={classnames({ [styles.contradiction]: verification.contradiction })}>
                <$ $={verification.contradiction
                  ? stringifyStep(permutation, verification.contradiction)
                  : '\\text{No contradiction}'}
                />
              </li>
            </ol>
          </div>
        </div>
      </fieldset>,
      <fieldset key='knowledge-table' className={`${zf.cell} ${zf.small12} ${zf.large6}`}>
        <legend>Knowledge (step {stepIndex})</legend>
        <div className={zf.scroller}>
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
                        [TRUTH_STATES.get(step.knowledge[side.name][divisibility.name])]: true,
                        [styles.selected]: stepIndex &&
                          newKnowledge.side === side.name &&
                          newKnowledge.divisibility === divisibility.name
                      })}
                      onClick={this.onSelectKnowledge.bind(this, verification.steps, side.name, divisibility.name)}
                    />
                  )}
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </fieldset>
    ]
  }
}

StepSelector.propTypes = {
  id: PropTypes.number.isRequired
}

export default StepSelector
