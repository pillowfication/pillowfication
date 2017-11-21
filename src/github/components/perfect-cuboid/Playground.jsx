import React, { PureComponent } from 'react'

import CaseSelector from './CaseSelector.jsx'
import StepSelector from './StepSelector.jsx'
import PassedCases from './PassedCases.jsx'
import '../../font-awesome.scss'

class Playground extends PureComponent {
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
      <div >
        <h3>Playground</h3>
        <p>See the old playground at <a href='http://old.pillowfication.com/projects/cuboid/'>old.pillowfication.com/projects/cuboid</a>.</p>
        <CaseSelector id={this.state.id} onSelectId={this.onSelectId} />
        <StepSelector id={this.state.id} />
        <PassedCases onSelectId={this.onSelectId} />
      </div>
    )
  }
}

export default Playground
