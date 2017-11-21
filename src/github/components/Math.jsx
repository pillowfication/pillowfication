import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Math extends Component {
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
