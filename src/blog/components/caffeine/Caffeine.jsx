import React, { Component } from 'react'

import { registerBlog } from '../Blog.jsx'
import zf from '../../../foundation.scss'

class Caffeine extends Component {
  render () {
    return (
      <div className={zf.googleSlides}>
        <iframe
          src='https://docs.google.com/presentation/d/e/2PACX-1vRYc0Zywh_QpAwJ9cq9c2O0zi4D3Ho8xHQfVQpkOwX_pIwBeO9i1gs8otQv-lr-i-q8XqPbUCFrE4DJ/embed?start=false&loop=false'
          frameBorder='0'
          allowFullScreen
        />
      </div>
    )
  }
}

export default registerBlog(Caffeine, '2017/08/07', 'Caffeine')
