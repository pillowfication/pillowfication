import React, { Component } from 'react'
import classnames from 'classnames'

import fa from '../../font-awesome.scss'
import styles from './PFKonami.scss'

const KONAMI = [
  { code: 38, icon: fa.faArrowUp },
  { code: 38, icon: fa.faArrowUp },
  { code: 40, icon: fa.faArrowDown },
  { code: 40, icon: fa.faArrowDown },
  { code: 37, icon: fa.faArrowLeft },
  { code: 39, icon: fa.faArrowRight },
  { code: 37, icon: fa.faArrowLeft },
  { code: 39, icon: fa.faArrowRight },
  { code: 66, icon: styles.bButton },
  { code: 65, icon: styles.aButton }
]

class ExampleKeypress extends Component {
  constructor (props) {
    super(props)

    this.state = {
      pointer: 0
    }

    this.captureKeyDown = this.captureKeyDown.bind(this)
  }

  componentDidMount () {
    window.addEventListener('keydown', this.captureKeyDown, true)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.captureKeyDown, true)
  }

  captureKeyDown (event) {
    console.log(event)
    var key = event.which || event.keyCode || 0
    let { pointer } = this.state

    if (key === KONAMI[pointer].code) {
      ++pointer
    } else {
      let count = 1
      while (--pointer >= 0 && KONAMI[pointer].code === key) {
        ++count
      }
      pointer = 0
      while (--count >= 0 && KONAMI[pointer].code === key) {
        ++pointer
      }
    }

    if (pointer === KONAMI.length) {
      pointer = 0
    }

    this.setState({ pointer })
  }

  render () {
    const { pointer } = this.state

    return (
      <p>Try pressing
        <span className={styles.konamiCode}>
          {KONAMI.map((button, index) =>
            <i key={index} className={classnames(fa.fa, fa.faFw, button.icon, {
              [styles.selectedButton]: pointer === index
            })} />
          )}
        </span>
      </p>
    )
  }
}

export default ExampleKeypress
