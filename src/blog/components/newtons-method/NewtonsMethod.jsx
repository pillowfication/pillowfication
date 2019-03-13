import React, { Component } from 'react'

import { registerBlog } from '../Blog.jsx'
import zf from '../../../foundation.scss'

class NewtonsMethod extends Component {
  render () {
    return (
      <div className={zf.googleSlides}>
        <iframe
          src='https://docs.google.com/presentation/d/e/2PACX-1vQ_6PKum8MIIfHLqJ5wbIpHJ0-6UDkBI3EAtyGYbvHLCcOK87eHhrJCapPSmA3Ty6-NODbimewgpLL5/embed?start=false&loop=false'
          frameBorder='0'
          allowFullScreen
        />
      </div>
    )
  }
}

export default registerBlog(NewtonsMethod, '2013/12/15', 'Newton’s Method')
