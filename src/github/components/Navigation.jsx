import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import routes from './routes'

import zf from '../foundation.scss'
import fa from '../font-awesome.scss'
import styles from './Navigation.scss'

class Navigation extends Component {
  render () {
    // `offCanvas` is a workaround for CSS Modules not being able to reference
    // a class from another file.
    const { closeOffCanvas, offCanvas } = this.props

    return (
      <nav className={classnames({ [styles.offCanvas]: offCanvas }, styles.nav)}>
        <div className={`${styles.iconBar} ${zf.gridX} ${zf.gridPaddingX} ${zf.smallUp3}`}>
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
  closeOffCanvas: PropTypes.func.isRequired,
  offCanvas: PropTypes.bool
}

export default Navigation
