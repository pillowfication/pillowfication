import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import fa from '../font-awesome.scss'
import styles from './Page.scss'

class Page extends PureComponent {
  render () {
    const { title, github } = this.props

    return (
      <div>
        <h1 className={styles.title}>{title}
          <small>
            {github &&
              <a href={`https://github.com/${github}`}>
                <i className={classnames(fa.fa, fa.faGithub)} />
              </a>
            }
          </small>
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
