import React, { Component } from 'react'
import classnames from 'classnames'

import Code from '../Code.jsx'
import zf from '../../foundation.scss'
import ad from './awesome-dings.scss'
import styles from './AwesomeDings.scss'

const RADIO_GROUPS = [{
  name: 'Fonts',
  radios: [
    { name: 'Webdings', css: 'wd-webdings', style: ad.wdWebdings },
    { name: 'Wingdings 1', css: 'wd-wingdings-1', style: ad.wdWingdings1 },
    { name: 'Wingdings 2', css: 'wd-wingdings-2', style: ad.wdWingdings2 },
    { name: 'Wingdings 3', css: 'wd-wingdings-3', style: ad.wdWingdings3 }
  ]
}, {
  name: 'Sizing',
  radios: [
    { name: 'None' },
    { name: 'Large', css: 'wd-lg', style: ad.wdLg },
    { name: '2x', css: 'wd-2x', style: ad.wd2x },
    { name: '3x', css: 'wd-3x', style: ad.wd3x },
    { name: '4x', css: 'wd-4x', style: ad.wd4x },
    { name: '5x', css: 'wd-5x', style: ad.wd5x }
  ]
}, {
  name: 'Animations',
  radios: [
    { name: 'None' },
    { name: 'Spin', css: 'wd-spin', style: ad.wdSpin },
    { name: 'Pulse', css: 'wd-pulse', style: ad.wdPulse }
  ]
}, {
  name: 'Transformations',
  radios: [
    { name: 'None' },
    { name: 'Rotate 90', css: 'wd-rotate-90', style: ad.wdRotate90 },
    { name: 'Rotate 180', css: 'wd-rotate-180', style: ad.wdRotate180 },
    { name: 'Rotate 270', css: 'wd-rotate-270', style: ad.wdRotate270 },
    { name: 'Flip Horizontal', css: 'wd-flip-horizontal', style: ad.wdFlipHorizontal },
    { name: 'Flip Vertical', css: 'wd-flip-vertical', style: ad.wdFlipVertical }
  ]
}]

class Playground extends Component {
  constructor (props) {
    super(props)

    this.state = {
      code: 109,
      codeInput: '109'
    }
    RADIO_GROUPS.forEach(radioGroup => {
      this.state[radioGroup.name] = 0
    })

    this.onInputCharacter = this.onInputCharacter.bind(this)
    this.onInputCode = this.onInputCode.bind(this)
    this.onBlurCodeInput = this.onBlurCodeInput.bind(this)
    this.onSelectRadio = this.onSelectRadio.bind(this)
  }

  onInputCharacter (event) {
    const input = event.target.value
    const code = input.charCodeAt(input.length - 1) || 0
    this.setState({
      code,
      codeInput: String(code)
    })
  }

  onInputCode (event) {
    const codeInput = event.target.value
    this.setState({
      code: Math.max(0, Math.floor(+codeInput || 0)),
      codeInput
    })
  }

  onBlurCodeInput () {
    this.setState({ codeInput: String(this.state.code) })
  }

  onSelectRadio (group, event) {
    this.setState({ [group]: +event.target.value })
  }

  render () {
    const { code } = this.state
    const character = String.fromCharCode(code)
    const cssClassNames = classnames(
      RADIO_GROUPS.map(radioGroup => radioGroup.radios[this.state[radioGroup.name]].css)
    )
    const cssModulesClassNames = classnames(
      RADIO_GROUPS.map(radioGroup => radioGroup.radios[this.state[radioGroup.name]].style)
    )

    return (
      <div>
        <h3>Playground</h3>
        <p>This does not go over <a href='http://fontawesome.io/examples/#fixed-width'>Fixed Width Icons</a>, <a href='http://fontawesome.io/examples/#list'>List Icons</a>, <a href='http://fontawesome.io/examples/#bordered-pulled'>Bordered & Pulled Icons</a>, and <a href='http://fontawesome.io/examples/#stacked'>Stacked Icons.</a></p>
        <h5>Settings</h5>
        <div className={zf.row}>
          <fieldset className={classnames(zf.columns, zf.small12, zf.medium6)}>
            <legend>Character</legend>
            <input type='text' value={character} onChange={this.onInputCharacter} />
          </fieldset>
          <fieldset className={classnames(zf.columns, zf.small12, zf.medium6)}>
            <legend>Code</legend>
            <input type='number'
              value={this.state.codeInput}
              onChange={this.onInputCode}
              onBlur={this.onBlurCodeInput}
            />
          </fieldset>
          {RADIO_GROUPS.map(radioGroup =>
            <fieldset key={radioGroup.name} className={classnames(zf.columns, zf.small12, zf.medium6, zf.large3)}>
              <legend>{radioGroup.name}</legend>
              {radioGroup.radios.map((radio, index) => [
                <input key='radio' type='radio' name={radioGroup.name} id={radioGroup.name + '-' + radio.name}
                  value={index}
                  checked={this.state[radioGroup.name] === index}
                  onChange={this.onSelectRadio.bind(this, radioGroup.name)}
                />,
                <label key='label' htmlFor={radioGroup.name + '-' + radio.name}>{radio.name}</label>,
                <br key='br' />
              ])}
            </fieldset>
          )}
        </div>
        <h5>Code</h5>
        <Code lang='html' $={`<i class="${cssClassNames}">&#${code};</i>`} />
        <Code lang='jsx' $={`<i className='${cssClassNames}'>{String.fromCharCode(${code})}</i>`} />
        <h5>Output</h5>
        <div className={styles.output}><div>
          <i className={cssModulesClassNames}>{character}</i>
        </div></div>
      </div>
    )
  }
}

export default Playground
