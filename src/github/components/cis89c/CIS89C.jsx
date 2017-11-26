import React, { Component } from 'react'
import classnames from 'classnames'

import Page from '../Page.jsx'
import fa from '../../font-awesome.scss'
import styles from './CIS89C.scss'

class CIS89C extends Component {
  render () {
    return (
      <Page title='CIS89C' github='pillowfication/cis89c'>
        <section>
          <p><a href='/~20198403'><i className={classnames(fa.fa, fa.faReply, fa.faRotate180)} /> Enter the website here</a></p>
          <p>This repository was created through a college course. Some practices and features we were forced to implement are so <b>awful</b> (pop-ups, alerts, eval) that I want to apologize beforehand for those who try to browse the site and for those who view the source. I ended up dropping the course.</p>
        </section>
        <hr />
        <section>
          <div className={styles.cube}><div>
            {/* 1 */}<div className={styles.F}>M</div>
            {/* 6 */}<div className={styles.B}>S</div>
            {/* 4 */}<div className={styles.U}>K</div>
            {/* 5 */}<div className={styles.D}>U</div>
            {/* 3 */}<div className={styles.L}>R</div>
            {/* 2 */}<div className={styles.R}>A</div>
          </div></div>
        </section>
      </Page>
    )
  }
}

export default CIS89C
