import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import highlight from 'highlight.js'

import './Code.scss'

class Code extends Component {
  componentDidMount () {
    highlight.highlightBlock(findDOMNode(this.refs.code))
  }

  render () {
    return (
      <pre>
        <code ref='code'
          className={`language-${this.props.lang}`}
          dangerouslySetInnerHTML={{ __html: this.props.$.trim() }}
        />
      </pre>
    )
  }
}

Code.propTypes = {
  lang: PropTypes.string.isRequired,
  $: PropTypes.string
}

export default Code
