import React, { Component } from 'react'
import PropTypes from 'prop-types'

import fa from '../../font-awesome.scss'
import styles from './Page.scss'

class Page extends Component {
  render () {
    const { title, github } = this.props

    return (
      <div className={styles.page}>
        <h1>{title}
          <span className={styles.links}>
            {github && <a href={`https://github.com/${github}`}><i className={`${fa.fa} ${fa.faGithub}`} /></a>}
          </span>
        </h1>
        <hr className={styles.titleDivider} />
        {this.props.children}
      </div>
    )
  }
}

Page.propTypes = {
  title: PropTypes.string.isRequired,
  github: PropTypes.string
}

export default Page
