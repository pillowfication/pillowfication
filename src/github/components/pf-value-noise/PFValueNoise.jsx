import React, { Component } from 'react'

import Page from '../Page.jsx'
import RainbowValueNoise from './RainbowValueNoise.jsx'
import _4DValueNoise from './4DValueNoise.jsx'

class PFValueNoise extends Component {
  render () {
    return (
      <Page title='pf-value-noise' github='pillowfication/pf-value-noise'>
        <p>
          A <a href='https://en.wikipedia.org/wiki/Value_noise'>value noise</a> generator for any number of dimensions.
        </p>
        <hr />
        <RainbowValueNoise />
        <hr />
        <_4DValueNoise />
      </Page>
    )
  }
}

export default PFValueNoise
