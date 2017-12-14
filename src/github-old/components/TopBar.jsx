import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import pfIcon from '../pf-icon.png'
import fa from '../font-awesome.scss'
import styles from './TopBar.scss'

class TopBar extends Component {
  render () {
    return (
      <header className={styles.topBar}>
        <nav className={styles.nav}>
          <div className={styles.left}>
            <a href='http://pillowfication.com'><img className={styles.icon} src={pfIcon} />pillowfication</a>
          </div>
          <div className={styles.right}>
            <Link to='/'><i className={`${fa.fa} ${fa.faHome}`} /></Link>
            <a href='https://github.com/pillowfication/pillowfication'><i className={`${fa.fa} ${fa.faGithub}`} /></a>
          </div>
        </nav>
      </header>
    )
  }
}

export default TopBar
