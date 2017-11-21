/* global MathJax */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
      ? <p dangerouslySetInnerHTML={{ __html: `\\[${this.props.$$}\\]` }} />
      : <span dangerouslySetInnerHTML={{ __html: `\\(${this.props.$}\\)` }} />
  }
}

Math.propTypes = {
  $: PropTypes.string,
  $$: PropTypes.string
}

export default Math
