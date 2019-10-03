import React, { Component } from 'react'

import Section from '../Section.jsx'
import CaseSelector from './CaseSelector.jsx'
import StepSelector from './StepSelector.jsx'
import PassedCases from './PassedCases.jsx'
import zf from '../../../foundation.scss'
import fa from '../../../font-awesome.scss'

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
      <Section title='Playground'>
        <p><a href='http://old.pillowfication.com/projects/cuboid/'><i className={`${fa.fa} ${fa.faReply} ${fa.faRotate180}`} /> See the old playground here</a></p>
        <div className={`${zf.gridX} ${zf.gridMarginX}`}>
          <CaseSelector id={this.state.id} onSelectId={this.handleSelectId} />
          <StepSelector id={this.state.id} />
          <PassedCases id={this.state.id} onSelectId={this.handleSelectId} />
        </div>
      </Section>
    )
  }
}

export default Playground
