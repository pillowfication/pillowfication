import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { fromId } from 'perfect-cuboid/src/enumerate'
import verify from 'perfect-cuboid/src/verify'
import { TRIPLES, TYPES, SIDES, DIVISIBILITY, TRUTH_STATES } from './maps'

import $ from '../Math.jsx'
import zf from '../../foundation.scss'
import styles from './PerfectCuboid.scss'

class StepSelector extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      stepIndex: -1
    }

    this.selectStep = this.selectStep.bind(this)
    this.selectKnowledge = this.selectKnowledge.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.id !== this.props.id) {
      this.setState({ stepIndex: -1 })
    }
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
    const permutation = fromId(this.props.id)
    const verification = verify(this.props.id)
    const stepIndex = this.state.stepIndex === -1 ? verification.stateArray.length - 1 : this.state.stepIndex
    const stateInfo = verification.stateArray[stepIndex]
    const state = stateInfo.state
    const newKnowledge = stepIndex && {
      side: stateInfo.rule.triplet[stateInfo.rule.rule._then.side],
      d: stateInfo.rule.rule._then.d
    }

    return (
      <div className={zf.row}>
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
      </div>
    )
  }
}

StepSelector.propTypes = {
  id: PropTypes.number.isRequired
}

export default StepSelector
