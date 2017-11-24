import React, { Component } from 'react'

import Page from '../Page.jsx'
import styles from './CIS89C.scss'

class CIS89C extends Component {
  render () {
    return (
      <Page title='CIS89C' github='pillowfication/cis89c'>
        <p><a href='/~20198403'>Enter the website here.</a></p>
        <p>This repository was created through a college course. Some practices and features we were forced to implement are so <b>awful</b> (pop-ups, alerts) that I want to apologize beforehand for those who try to browse the site. I ended up dropping the course.</p>
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
