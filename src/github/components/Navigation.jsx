import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import routes from './routes'

import zf from '../foundation.scss'
import fa from '../font-awesome.scss'
import styles from './Navigation.scss'

class Navigation extends Component {
  render () {
    const { closeOffCanvas } = this.props

    return (
      <nav className={styles.nav}>
        <div className={`${styles.iconBar} ${zf.showForSmallOnly} ${zf.gridX} ${zf.gridPaddingX} ${zf.smallUp3}`}>
          <Link to='/' className={zf.cell} onClick={closeOffCanvas}><i className={`${fa.fa} ${fa.faHome}`} /></Link>
          <a href='https://github.com/pillowfication/pillowfication' className={zf.cell}><i className={`${fa.fa} ${fa.faGithub}`} /></a>
          <a className={zf.cell} onClick={closeOffCanvas}><i className={`${fa.fa} ${fa.faClose}`} /></a>
        </div>
        <ul>
          {routes.map(routeGroup =>
            <li key={routeGroup.header}>
              <b>{routeGroup.header}</b><span className={styles.pathDivider} />
              <ul>
                {routeGroup.children.map(route =>
                  <li key={route.path}>
                    <NavLink to={route.fullPath} activeClassName={styles.active} onClick={closeOffCanvas}>{route.path}</NavLink>
                  </li>
                )}
              </ul>
            </li>
          )}
        </ul>
      </nav>
    )
  }
}

Navigation.propTypes = {
  closeOffCanvas: PropTypes.func.isRequired
}

export default Navigation
