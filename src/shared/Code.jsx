import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import highlight from 'highlight.js/lib/highlight'
import php from 'highlight.js/lib/languages/php'
import javascript from 'highlight.js/lib/languages/javascript'

import './Code.scss'

highlight.registerLanguage('javascript', javascript)
highlight.registerLanguage('html', php)

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
