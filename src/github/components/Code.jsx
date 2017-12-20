import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'
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
        <code ref='code' className={classnames(this.props.className, lang && `language-${lang}`)}>
          {$.trim()}
        </code>
      </pre>
    )
  }
}

Code.propTypes = {
  lang: PropTypes.string,
  $: PropTypes.string.isRequired
}

export default Code
