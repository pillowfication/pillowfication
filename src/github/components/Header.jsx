import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import pfIcon from './pf-icon.png'
import zf from '../foundation.scss'
import fa from '../font-awesome.scss'
import styles from './Header.scss'

class Header extends Component {
  render () {
    return (
      <header className={styles.header}>
        <div className={zf.gridContainer}>
          <nav className={zf.topBar}>
            <div className={zf.topBarLeft}>
              <a href='http://pillowfication.com'><img className={styles.pfIcon} src={pfIcon} />pillowfication</a>
            </div>
            <div className={zf.topBarRight}>
              <div className={zf.showForSmallOnly}>
                <a href="#"><i className={`${fa.fa} ${fa.faNavicon}`} /></a>
              </div>
              <div className={zf.showForMedium}>
                <Link to='/'><i className={`${fa.fa} ${fa.faHome}`} /></Link>
                <a href='https://github.com/pillowfication/pillowfication'><i className={`${fa.fa} ${fa.faGithub}`} /></a>
              </div>
            </div>
          </nav>
        </div>
      </header>
    )
  }
}

export default Header
