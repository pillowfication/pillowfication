import React, { Component } from 'react'

import { registerBlog } from '../Blog.jsx'
import zf from '../../../foundation.scss'

class NewtonsMethod extends Component {
  render () {
    return (
      <div className={zf.googleSlides}>
        <iframe
          src='https://docs.google.com/presentation/d/e/2PACX-1vRFO5LkkleHdlWne7DZ5E86m3IE4vq45tzsGRVPLp5F6mC0epQnrsqUHl9J4dcI1sWPZW0q4deKofQo/embed?start=false&loop=false'
          frameBorder='0'
          allowFullScreen
        />
      </div>
    )
  }
}

export default registerBlog(NewtonsMethod, '2014/05/12', 'Solid Angles')
