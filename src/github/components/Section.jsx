import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import kebabCase from 'lodash/kebabCase'

import fa from '../font-awesome.scss'
import styles from './Section.scss'

class Section extends Component {
  render () {
    const { title } = this.props
    const hash = kebabCase(title)

    return (
      <section>
        <h2 className={styles.title} id={hash}>
          {title}
          <Link className={styles.hash} to={{ hash: '#' + hash }}>
            <i className={`${fa.fa} ${fa.faHashtag}`} />
          </Link>
        </h2>
        {this.props.children}
      </section>
    )
  }
}

Section.propTypes = {
  title: PropTypes.string.isRequired
}

export default Section
