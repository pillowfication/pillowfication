import React, { Component } from 'react'

import Page from '../Page.jsx'
import RainbowPerlin from './RainbowPerlin.jsx'

class PFPerlin extends Component {
  render () {
    return (
      <Page title='pf-perlin' github='pillowfication/pf-perlin'>
        <section>
          <RainbowPerlin />
        </section>
      </Page>
    )
  }
}

export default PFPerlin
