import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

import zf from '../foundation.scss'
import styles from './SideBar.scss'

export default class SideBar extends Component {
  render () {
    return (
      <div className={styles.sideBar}>
        <ul className={classnames(zf.menu, zf.vertical)}>
          <li>
            /pillowfication
            <ul className={classnames(zf.menu, zf.vertical, zf.nested)}>
              <li><Link to='/perfect-cuboid'>perfect-cuboid</Link></li>
            </ul>
          </li>
        </ul>
      </div>
    )
  }
}