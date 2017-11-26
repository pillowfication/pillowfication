import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import classnames from 'classnames'

import zf from '../foundation.scss'
import styles from './SideBar.scss'

class SideBar extends Component {
  render () {
    return (
      <nav className={styles.sideBar}>
        <ul className={classnames(zf.menu, zf.vertical)}>
          <li>
            pillowfication<span className={styles.pathDivider}>/</span>
            <ul className={classnames(zf.menu, zf.vertical, zf.nested)}>
              <li><NavLink activeClassName={styles.active} to='/awesome-dings'>awesome-dings</NavLink></li>
              <li><NavLink activeClassName={styles.active} to='/cis89c'>cis89c</NavLink></li>
              <li><NavLink activeClassName={styles.active} to='/perfect-cuboid'>perfect-cuboid</NavLink></li>
              <li><NavLink activeClassName={styles.active} to='/pf-konami'>pf-konami</NavLink></li>
            </ul>
          </li>
        </ul>
      </nav>
    )
  }
}

export default SideBar
