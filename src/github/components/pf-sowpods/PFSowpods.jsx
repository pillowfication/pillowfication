import React, { Component } from 'react'
import sowpods from 'pf-sowpods'

import Page from '../Page.jsx'
import Statistics from './Statistics.jsx'

class PFSowpods extends Component {
  render () {
    return (
      <Page title='pf-sowpods' github='pillowfication/pf-sowpods'>
        <section>
          <p>This package exports the <a href='https://en.wikipedia.org/wiki/Collins_Scrabble_Words'>SOWPODS</a> dictionary and related functionality.</p>
          <Statistics />
        </section>
      </Page>
    )
  }
}

export default PFSowpods
