import React, { Component } from 'react'

import Page from '../Page.jsx'
import TheAlgorithm from './TheAlgorithm.jsx'

class PFPerlin extends Component {
  render () {
    return (
      <Page title='pf-perlin' github='pillowfication/pf-perlin'>
        <section>
          <p>
            A <a href='https://en.wikipedia.org/wiki/Perlin_noise'>Perlin noise</a> generator for any number of dimensions.
          </p>
          <hr />
          <TheAlgorithm />
        </section>
      </Page>
    )
  }
}

export default PFPerlin
