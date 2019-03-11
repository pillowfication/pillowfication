import React, { Component } from 'react'
import kebabCase from 'lodash/kebabCase'

import fa from '../../font-awesome.scss'
import styles from './Section.scss'

class Section extends Component {
  render () {
    const { title } = this.props
    const hash = kebabCase(title)

    return (
      <section>
        <h2 className={styles.title} id={hash}>
          {title}
          <a className={styles.hash} href={'#' + hash}>
            <i className={`${fa.fa} ${fa.faHashtag}`} />
          </a>
        </h2>
        {this.props.children}
      </section>
    )
  }
}

export default Section
