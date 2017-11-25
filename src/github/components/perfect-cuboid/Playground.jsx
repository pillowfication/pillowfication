import React, { Component } from 'react'

import CaseSelector from './CaseSelector.jsx'
import StepSelector from './StepSelector.jsx'
import PassedCases from './PassedCases.jsx'

class Playground extends Component {
  constructor (props) {
    super(props)

    this.state = {
      id: Math.pow(12, 6) * Math.random() | 0
    }

    this.onSelectId = this.onSelectId.bind(this)
  }

  onSelectId (id) {
    this.setState({ id })
  }

  render () {
    return (
      <section>
        <h3>Playground</h3>
        <p>See the old playground at <a href='http://old.pillowfication.com/projects/cuboid/'>old.pillowfication.com/projects/cuboid</a>.</p>
        <CaseSelector id={this.state.id} onSelectId={this.onSelectId} />
        <StepSelector id={this.state.id} />
        <PassedCases id={this.state.id} onSelectId={this.onSelectId} />
      </section>
    )
  }
}

export default Playground
