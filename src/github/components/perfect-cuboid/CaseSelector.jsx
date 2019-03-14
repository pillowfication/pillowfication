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

    this.onInputId = this.onInputId.bind(this)
    this.onFocusIdInput = this.onFocusIdInput.bind(this)
    this.onBlurIdInput = this.onBlurIdInput.bind(this)
    this.onSelectEquivalent = this.onSelectEquivalent.bind(this)
    this.onSelectRadio = this.onSelectRadio.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (!this.state.inputIdFocused) {
      this.setState({ idInput: String(nextProps.id) })
    }
  }

  onInputId (event) {
    const idInput = event.target.value
    this.setState({ idInput })

    const id = Math.min(MAX_ID, Math.max(MIN_ID, Math.floor(+idInput || 0)))
    this.props.onSelectId(id)
  }

  onFocusIdInput () {
    this.setState({ inputIdFocused: true })
  }

  onBlurIdInput () {
    this.setState({ inputIdFocused: false, idInput: String(this.props.id) })
  }

  onSelectEquivalent (event) {
    this.props.onSelectId(+event.target.value)
  }

  onSelectRadio (triple, type) {
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
        <input type='number'
          value={this.state.idInput}
          min={MIN_ID}
          max={MAX_ID}
          onChange={this.onInputId}
          onFocus={this.onFocusIdInput}
          onBlur={this.onBlurIdInput}
        />
      </fieldset>,
      <fieldset key='equivalents' className={`${zf.cell} ${zf.small12} ${zf.medium8} ${zf.large9}`}>
        <legend>Equivalents</legend>
        {getEquivalents(id).map(equivalent =>
          <button key={equivalent}
            type='button'
            className={classnames(styles.idButton, id === equivalent && styles.selected)}
            value={equivalent}
            onClick={this.onSelectEquivalent}
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
                        <input type='radio'
                          name={triple.name}
                          checked={permutation[triple.name] === type.name}
                          onChange={this.onSelectRadio.bind(this, triple.name, type.name)}
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
