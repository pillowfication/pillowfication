import React, { Component } from 'react'
import classnames from 'classnames'
import 'pf-konami'

import Page from '../Page.jsx'
import Code from '../Code.jsx'
import ExampleKeypress from './ExampleKeypress.jsx'
import fa from '../../font-awesome.scss'
import styles from './PFKonami.scss'

class PFKonami extends Component {
  render () {
    return (
      <Page title='pf-konami' github='pillowfication/pf-konami'>
        <p>This package is meant to be a little easter egg that you can safely sneak into any project. I dropped it off as a goodbye gift at work. What it does is shower the screen in confetti whenever the Konami code is triggered.</p>
        <ExampleKeypress />
        <p>All that’s required is for the packaged to be included at least once from anywhere in the project, and it will silently do nothing if it is unable to initialize.</p>
        <Code lang='javascript' $={`require('pf-konami')`} />
        <p>It was intended to be tiny and non-configurable, but I made an updated version mostly for playing around on this page.</p>
        <Code lang='javascript' $={`
// Requires CSS Modules enabled
import PFKonami from 'pf-konami/src/webpack/konami'

PFKonami.enable(options)
// PFKonami.disable()
        `} />
      </Page>
    )
  }
}

export default PFKonami
