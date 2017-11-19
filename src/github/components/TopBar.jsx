import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

import zf from '../foundation.scss'
import styles from './TopBar.scss'

export default class TopBar extends Component {
  render () {
    return (
      <div className={styles.topBar}>
        <div className={classnames(zf.row, zf.columns, zf.small12)}>
          <nav className={zf.topBar}>
            <div className={zf.topBarLeft}>
              <Link to='/'>pillowfication</Link>
            </div>
            <div className={zf.topBarRight}>
              {/* moo */}
            </div>
          </nav>
        </div>
      </div>
    )
  }
}
