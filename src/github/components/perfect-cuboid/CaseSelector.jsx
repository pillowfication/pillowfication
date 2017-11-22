import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { toId, fromId } from 'perfect-cuboid/src/enumerate'
import { getEquivalents } from 'perfect-cuboid/src/equivalent'
import { TRIPLES, TYPES } from './maps'

import $ from '../Math.jsx'
import zf from '../../foundation.scss'
import styles from './PerfectCuboid.scss'

const MIN_ID = 0
const MAX_ID = 2985983

class CaseSelector extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      idInput: String(this.props.id)
    }

    this.inputId = this.inputId.bind(this)
    this.focusIdInput = this.focusIdInput.bind(this)
    this.blurIdInput = this.blurIdInput.bind(this)
    this.selectEquivalent = this.selectEquivalent.bind(this)
    this.selectRadio = this.selectRadio.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (!this.state.inputIdFocused) {
      this.setState({ idInput: String(nextProps.id) })
    }
  }

  static sanitizeIdInput (idInput) {
    const id = Math.floor(+idInput || 0)
    return Math.min(MAX_ID, Math.max(MIN_ID, id))
  }

  inputId (event) {
    const idInput = event.target.value
    this.setState({ idInput })
    this.props.onSelectId(CaseSelector.sanitizeIdInput(idInput))
  }

  focusIdInput () {
    this.setState({ inputIdFocused: true })
  }

  blurIdInput () {
    this.setState({ inputIdFocused: false, idInput: String(this.props.id) })
  }

  selectEquivalent (event) {
    this.props.onSelectId(+event.target.value)
  }

  selectRadio (triple, type) {
    const permutation = fromId(this.props.id)
    permutation[triple] = type
    this.props.onSelectId(toId(permutation))
  }

  render () {
    const { id } = this.props
    const permutation = fromId(id)

    return (
      <div className={zf.row}>
        <div className={classnames(zf.columns, zf.small12, zf.medium4, zf.large3)}>
          <b>Case Identifier</b><br />
          <input type='number'
            value={this.state.idInput}
            min={MIN_ID}
            max={MAX_ID}
            onChange={this.inputId}
            onFocus={this.focusIdInput}
            onBlur={this.blurIdInput}
          />
        </div>
        <div className={classnames(zf.columns, zf.small12, zf.medium8, zf.large9)}>
          <b>Equivalents</b><br />
          {getEquivalents(id).map(equivalent =>
            <button key={equivalent}
              type='button'
              className={classnames(styles.idButton, zf.button, zf.hollow, {
                [styles.selected]: id === equivalent
              })}
              value={equivalent}
              onClick={this.selectEquivalent}
            >
              {equivalent}
            </button>
          )}
        </div>
        <div className={classnames(zf.columns, zf.small12, zf.tableScroll)}>
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
                      <label>
                        <input type='radio'
                          name={triple.name}
                          checked={permutation[triple.name] === type.name}
                          onChange={this.selectRadio.bind(this, triple.name, type.name)}
                        />
                      </label>
                    </td>
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

CaseSelector.propTypes = {
  id: PropTypes.number.isRequired,
  onSelectId: PropTypes.func.isRequired
}

export default CaseSelector
