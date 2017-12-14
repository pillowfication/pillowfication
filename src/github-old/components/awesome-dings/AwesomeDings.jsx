import React, { Component } from 'react'

import Page from '../Page.jsx'
import Playground from './Playground.jsx'
import Cheatsheet from './Cheatsheet.jsx'
import pullRequest from './pull-request.png'
import zf from '../../foundation.scss'
import fa from '../../font-awesome.scss'
import ad from './awesome-dings.scss'
import styles from './AwesomeDings.scss'

class AwesomeDings extends Component {
  render () {
    return (
      <Page title='AwesomeDings' github='pillowfication/AwesomeDings'>
        <section>
          <p>This package was created as an April Fools’ Day joke.</p>
          <div className={styles.imageContainer}>
            <img src={pullRequest} />
          </div>
          <p>I took the entire <a href='http://fontawesome.io/'>FontAwesome</a> package that my workplace was using and replaced it with my homemade AwesomeDings package and proceeded to change all our icons. Elements on this page may not render correctly if you don’t have the Webdings or Wingdings fonts installed.</p>
          <div className={zf.tableScroll}>
            <table className={styles.examples}>
              <thead>
                <tr>
                  <th>Before</th>
                  <th>After</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <button type='button' className={styles.primaryButton}>
                      <i className={`${fa.fa} ${fa.faLg} ${fa.faHome}`} /> Home
                    </button>
                  </td>
                  <td>
                    <button type='button' className={styles.primaryButton}>
                      <i className={`${ad.wdWebdings} ${ad.wdLg}`}>J</i> Home
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <button type='button' className={styles.secondaryButton}>
                      <i className={`${fa.fa} ${fa.faLg} ${fa.faPlus}`} /> Add Impairment
                    </button>
                  </td>
                  <td>
                    <button type='button' className={styles.secondaryButton}>
                      <i className={`${ad.wdWingdings1} ${ad.wdLg}`}>N</i> Add Impairment
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <button type='button' className={styles.alertButton}>
                      <i className={`${fa.fa} ${fa.faLg} ${fa.faTrash}`} /> Delete
                    </button>
                  </td>
                  <td>
                    <button type='button' className={styles.alertButton}>
                      <i className={`${ad.wdWingdings1} ${ad.wdLg}`}>M</i> Delete
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <i className={`${styles.spinner} ${fa.fa} ${fa.faCircleONotch} ${fa.faSpin} ${fa.fa5x}`} />
                  </td>
                  <td>
                    <i className={`${styles.spinner} ${ad.wdWingdings1} ${ad.wdPulse} ${ad.wd5x}`} style={{color: 'black'}}>6</i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <hr />
        <Playground />
        <hr />
        <Cheatsheet />
      </Page>
    )
  }
}

export default AwesomeDings
