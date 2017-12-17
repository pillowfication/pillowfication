import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import highlight from 'highlight.js'

import './Code.scss'

class Code extends Component {
  componentDidMount () {
    highlight.highlightBlock(findDOMNode(this.refs.code))
  }

  componentDidUpdate () {
    highlight.highlightBlock(findDOMNode(this.refs.code))
  }

  render () {
    const { lang, $ } = this.props

    return (
      <pre>
        <code ref='code' className={`language-${lang}`}>
          {$.trim()}
        </code>
      </pre>
    )
  }
}

Code.propTypes = {
  lang: PropTypes.string.isRequired,
  $: PropTypes.string.isRequired
}

export default Code
