import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Page from '../Page.jsx'
import RainbowValueNoise from './RainbowValueNoise.jsx'
import _4DValueNoise from './4DValueNoise.jsx'

class PFValueNoise extends Component {
  render () {
    return (
      <Page title='pf-value-noise' github='pillowfication/pf-value-noise'>
        <section>
          <p>
            A <a href='https://en.wikipedia.org/wiki/Value_noise'>value noise</a> generator for any number of dimensions. See <Link to='/pf-perlin'>/pf-perlin</Link> for a description of the algorithm.
          </p>
        </section>
        <hr />
        <RainbowValueNoise />
        <hr />
        <_4DValueNoise />
      </Page>
    )
  }
}

export default PFValueNoise
