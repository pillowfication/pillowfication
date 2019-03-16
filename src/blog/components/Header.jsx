import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import pfIcon from './pf-icon.png'
import zf from '../../foundation.scss'
import fa from '../../font-awesome.scss'
import styles from './Header.scss'

class Header extends Component {
  render () {
    return (
      <header className={styles.header}>
        <div className={zf.gridContainer}>
          <nav className={zf.topBar}>
            <div className={zf.topBarLeft}>
              <a href='/'><img className={styles.pfIcon} src={pfIcon} />pillowfication</a>
            </div>
            <div className={zf.topBarRight}>
              <Link to='/'><i className={`${fa.fa} ${fa.faHome}`} /></Link>
              <a href='https://github.com/pillowfication/pillowfication'><i className={`${fa.fa} ${fa.faGithub}`} /></a>
            </div>
          </nav>
        </div>
      </header>
    )
  }
}

export default Header