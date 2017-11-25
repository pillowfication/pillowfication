import React, { Component } from 'react'
import classnames from 'classnames'

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
          <div className={classnames(styles.imageContainer, zf.tableScroll)}>
            <img src={pullRequest} />
          </div>
          <p>I took the entire <a href='http://fontawesome.io/'>FontAwesome</a> package that my workplace was using and replaced it with my homemade AwesomeDings package and proceeded to change all our icons. (Elements on this page may not render correctly if you don’t have the Webdings or Wingdings fonts installed.)</p>
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
                    <button type='button' className={zf.button}>
                      <i className={classnames(fa.fa, fa.faHome)} /> Home
                    </button>
                  </td>
                  <td>
                    <button type='button' className={zf.button}>
                      <i className={ad.wdWebdings}>J</i> Home
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <button type='button' className={classnames(zf.button, zf.secondary, zf.hollow)}>
                      <i className={classnames(fa.fa, fa.faPlus)} /> Add Impairment
                    </button>
                  </td>
                  <td>
                    <button type='button' className={classnames(zf.button, zf.secondary, zf.hollow)}>
                      <i className={ad.wdWingdings1}>N</i> Add Impairment
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <button type='button' className={classnames(zf.button, zf.alert)}>
                      <i className={classnames(fa.fa, fa.faTrash)} /> Delete
                    </button>
                  </td>
                  <td>
                    <button type='button' className={classnames(zf.button, zf.alert)}>
                      <i className={ad.wdWingdings1}>M</i> Delete
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <i className={classnames(styles.loader, fa.fa, fa.faCircleONotch, fa.faSpin, fa.fa5x)} />
                  </td>
                  <td>
                    <i className={classnames(styles.loader, ad.wdWingdings1, ad.wdPulse, ad.wd5x)}>6</i>
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
