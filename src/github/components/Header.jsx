import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import pfIcon from './pf-icon.png'
import zf from '../../foundation.scss'
import fa from '../../font-awesome.scss'
import styles from './Header.scss'

class Header extends Component {
  render () {
    const { onOpenOffCanvas } = this.props

    return (
      <header className={styles.header}>
        <div className={zf.gridContainer}>
          <nav className={zf.topBar}>
            <div className={zf.topBarLeft}>
              <a href='/' className={styles.pfLogo}><img className={styles.pfIcon} src={pfIcon} />pillowfication</a>
            </div>
            <div className={zf.topBarRight}>
              <div className={zf.showForSmallOnly}>
                <a onClick={onOpenOffCanvas}><i className={`${fa.fa} ${fa.faNavicon}`} /></a>
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

Header.propTypes = {
  onOpenOffCanvas: PropTypes.func.isRequired
}

export default Header
