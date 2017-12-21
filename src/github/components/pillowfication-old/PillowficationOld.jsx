import React, { Component } from 'react'

import Page from '../Page.jsx'
import pillowfication from 'pillowfication-old/www/assets/img/pillowfication.png'
import fa from '../../font-awesome.scss'
import styles from './PillowficationOld.scss'

class PillowficationOld extends Component {
  render () {
    return (
      <Page title='pillowfication-old' github='pillowfication/pillowfication-old'>
        <section>
          <p><a href='/~20198403'><i className={`${fa.fa} ${fa.faReply} ${fa.faRotate180}`} /> Enter the website here</a></p>
          <p>This is the first website I ever made for myself.</p>
          <div className={styles.ambigram}>
            <img src={pillowfication} />
          </div>
        </section>
      </Page>
    )
  }
}

export default PillowficationOld
