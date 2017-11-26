import React, { Component } from 'react'
import { execute, transpile } from 'moofuck'

import Page from '../Page.jsx'

class Moofuck extends Component {
  render () {
    return (
      <Page title='moofuck' github='pillowfication/moofuck'>
        <section>
          <p>moo</p>
        </section>
      </Page>
    )
  }
}

export default Moofuck
