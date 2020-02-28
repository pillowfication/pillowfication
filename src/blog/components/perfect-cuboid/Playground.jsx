import React, { Component } from 'react'

import CaseSelector from './CaseSelector.jsx'
import StepSelector from './StepSelector.jsx'
import PassedCases from './PassedCases.jsx'
import zf from '../../../foundation.scss'

class Playground extends Component {
  constructor (props) {
    super(props)

    this.state = {
      id: 2985984 * Math.random() | 0
    }

    this.handleSelectId = this.handleSelectId.bind(this)
  }

  handleSelectId (id) {
    this.setState({ id })
  }

  render () {
    return (
      <section>
        <h2>Playground</h2>
        <p>See the old playground <a href='http://old.pillowfication.com/projects/cuboid/'>here</a>. All code and data are in the <a href='https://github.com/pillowfication/perfect-cuboid'>GitHub repo</a>.</p>
        <div className={`${zf.gridX} ${zf.gridMarginX}`}>
          <CaseSelector id={this.state.id} onSelectId={this.handleSelectId} />
          <StepSelector id={this.state.id} />
          <PassedCases id={this.state.id} onSelectId={this.handleSelectId} />
        </div>
      </section>
    )
  }
}

export default Playground
