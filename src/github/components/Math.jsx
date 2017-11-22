/* global MathJax */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import zf from '../foundation.scss'

let calledRender = false
function queueRenderMath () {
  if (!calledRender) {
    MathJax.Hub.Queue([ 'Typeset', MathJax.Hub ])
    calledRender = true
  }
  setImmediate(() => {
    calledRender = false
  })
}

class Math extends Component {
  componentDidMount () {
    queueRenderMath()
  }

  componentDidUpdate () {
    queueRenderMath()
  }

  render () {
    return this.props.$$
      ? <div className={zf.tableScroll}><p>{`\\[${this.props.$$}\\]`}</p></div>
      : <span>{`\\(${this.props.$}\\)`}</span>
  }
}

Math.propTypes = {
  $: (props, propName, componentName) => {
    const error = PropTypes.string.apply(arguments)
    if (error) {
      return error
    }

    if (!props.$ && !props.$$) {
      return new Error(`One of props '$' or '$$' was not specified in '${componentName}'.`)
    }
    if (props.$ && props.$$) {
      return new Error(`Only one of props '$' or '$$' should be specified in '${componentName}'.`)
    }
  },

  $$: (props, propName, componentName) => {
    const error = PropTypes.string.apply(arguments)
    if (error) {
      return error
    }

    if (!props.$ && !props.$$) {
      return new Error(`One of props '$' or '$$' was not specified in '${componentName}'.`)
    }
    if (props.$ && props.$$) {
      return new Error(`Only one of props '$' or '$$' should be specified in '${componentName}'.`)
    }
  }
}

export default Math
