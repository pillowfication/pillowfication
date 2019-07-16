import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AirbnbPropTypes from 'airbnb-prop-types'

class Figure extends Component {
  render () {
    return <figure {...this.props}>{this.props.children}</figure>
  }
}

class FigureImage extends Component {
  render () {
    return <img {...this.props} />
  }
}

class FigureCaption extends Component {
  render () {
    return <figcaption {...this.props}>{this.props.children}</figcaption>
  }
}

Figure.propTypes = {
  children: PropTypes.oneOfType([
    AirbnbPropTypes.elementType(FigureImage),
    AirbnbPropTypes.childrenSequenceOf(
      { validator: AirbnbPropTypes.elementType(FigureImage) },
      { validator: AirbnbPropTypes.elementType(FigureCaption) }
    )
  ])
}

Figure.Image = FigureImage
Figure.Caption = FigureCaption

export default Figure
export { FigureImage, FigureCaption }
