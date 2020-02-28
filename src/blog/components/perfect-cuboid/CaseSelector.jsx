import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { toId, fromId } from 'perfect-cuboid/src/enumerate'
import { getEquivalents } from 'perfect-cuboid/src/equivalent'
import { TRIPLES, TYPES } from './maps'

import $ from '../../../shared/Math.jsx'
import zf from '../../../foundation.scss'
import styles from './PerfectCuboid.scss'

const MIN_ID = 0
const MAX_ID = 2985983

class CaseSelector extends Component {
  constructor (props) {
    super(props)

    this.state = {
      idInput: String(this.props.id),
      inputIdFocused: false
    }

    this.handleInputId = this.handleInputId.bind(this)
    this.handleFocusIdInput = this.handleFocusIdInput.bind(this)
    this.handleBlurIdInput = this.handleBlurIdInput.bind(this)
    this.handleSelectEquivalent = this.handleSelectEquivalent.bind(this)
    this.handleSelectRadio = this.handleSelectRadio.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (!this.state.inputIdFocused) {
      this.setState({ idInput: String(nextProps.id) })
    }
  }

  handleInputId (event) {
    const idInput = event.target.value
    this.setState({ idInput })

    const id = Math.min(MAX_ID, Math.max(MIN_ID, Math.floor(+idInput || 0)))
    this.props.onSelectId(id)
  }

  handleFocusIdInput () {
    this.setState({ inputIdFocused: true })
  }

  handleBlurIdInput () {
    this.setState({ inputIdFocused: false, idInput: String(this.props.id) })
  }

  handleSelectEquivalent (event) {
    this.props.onSelectId(+event.target.value)
  }

  handleSelectRadio (triple, type) {
    const permutation = fromId(this.props.id)
    permutation[triple] = type
    this.props.onSelectId(toId(permutation))
  }

  render () {
    const { id } = this.props
    const permutation = fromId(id)

    return [
      <fieldset key='case-identifier' className={`${zf.cell} ${zf.small12} ${zf.medium4} ${zf.large3}`}>
        <legend>Case Identifier</legend>
        <input
          type='number'
          value={this.state.idInput}
          min={MIN_ID}
          max={MAX_ID}
          onChange={this.handleInputId}
          onFocus={this.handleFocusIdInput}
          onBlur={this.handleBlurIdInput}
        />
      </fieldset>,
      <fieldset key='equivalents' className={`${zf.cell} ${zf.small12} ${zf.medium8} ${zf.large9}`}>
        <legend>Equivalents</legend>
        {getEquivalents(id).map(equivalent =>
          <button
            key={equivalent}
            type='button'
            className={classnames(styles.idButton, id === equivalent && styles.selected)}
            value={equivalent}
            onClick={this.handleSelectEquivalent}
          >
            {equivalent}
          </button>
        )}
      </fieldset>,
      <fieldset key='input-table' className={`${zf.cell} ${zf.small12}`}>
        <div className={zf.scroller}>
          <table className={styles.inputTable}>
            <thead>
              <tr>
                <th />
                {TRIPLES.map(triple =>
                  <th key={triple.name}><$ $={triple.label} /></th>
                )}
              </tr>
            </thead>
            <tbody>
              {TYPES.map(type =>
                <tr key={type.name}>
                  <th><$ $={type.label} /></th>
                  {TRIPLES.map(triple =>
                    <td key={triple.name}>
                      <label className={classnames(permutation[triple.name] === type.name && styles.selected)}>
                        <input
                          type='radio'
                          name={triple.name}
                          checked={permutation[triple.name] === type.name}
                          onChange={this.handleSelectRadio.bind(this, triple.name, type.name)}
                        />
                      </label>
                    </td>
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

CaseSelector.propTypes = {
  id: PropTypes.number.isRequired,
  onSelectId: PropTypes.func.isRequired
}

export default CaseSelector
