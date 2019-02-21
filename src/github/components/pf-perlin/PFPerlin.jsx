import React, { Component } from 'react'

import Page from '../Page.jsx'
import RainbowPerlin from './RainbowPerlin.jsx'
import _4DPerlin from './4DPerlin.jsx'

class PFPerlin extends Component {
  render () {
    return (
      <Page title='pf-perlin' github='pillowfication/pf-perlin'>
        <p>
          A Perlin noise generator for any number of dimensions.
        </p>
        <RainbowPerlin />
        <hr />
        <_4DPerlin />
      </Page>
    )
  }
}

export default PFPerlin
