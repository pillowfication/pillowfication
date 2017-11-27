import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

import pfIcon from '../pf-icon.png'
import zf from '../foundation.scss'
import fa from '../font-awesome.scss'
import styles from './TopBar.scss'

class TopBar extends Component {
  render () {
    return (
      <header className={styles.topBar}>
        <div className={classnames(zf.row, zf.columns, zf.small12)}>
          <nav className={zf.topBar}>
            <div className={zf.topBarLeft}>
              <a href='http://pillowfication.com'><img className={styles.icon} src={pfIcon} />pillowfication</a>
            </div>
            <div className={zf.topBarRight}>
              <Link to='/'><i className={classnames(fa.fa, fa.faHome)} /></Link>
              <a href='https://github.com/pillowfication/pillowfication'><i className={classnames(fa.fa, fa.faGithub)} /></a>
            </div>
          </nav>
        </div>
      </header>
    )
  }
}

export default TopBar
