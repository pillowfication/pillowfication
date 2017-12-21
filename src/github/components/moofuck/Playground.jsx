import React, { Component } from 'react'
import { execute, transpile } from 'moofuck'

import Section from '../Section.jsx'
import CodeEditable from '../CodeEditable.jsx'
import helloWorld from './hello-world.brainfuck'
import zf from '../../foundation.scss'
import styles from './Moofuck.scss'

const stdout = {
  buffer: '',
  clear () {
    stdout.buffer = ''
  },
  write (str) {
    stdout.buffer += str
  }
}

class Playground extends Component {
  constructor (props) {
    super(props)

    this.state = {
      brainfuck: helloWorld,
      inputString: '',
      output: ''
    }

    this.onInputBrainfuck = this.onInputBrainfuck.bind(this)
    this.onInputInputString = this.onInputInputString.bind(this)
    this.onExecuteMoofuck = this.onExecuteMoofuck.bind(this)
  }

  onInputBrainfuck (event) {
    this.setState({ brainfuck: event.target.value })
  }

  onInputInputString (event) {
    this.setState({ inputString: event.target.value })
  }

  onExecuteMoofuck () {
    const { brainfuck, inputString } = this.state

    stdout.clear()
    try {
      execute(transpile.brainfuckToMoofuck(brainfuck), inputString, stdout)
    } catch (err) {
      stdout.write('Error: moo')
    }

    this.setState({ output: stdout.buffer })
  }

  render () {
    const { brainfuck, inputString, output } = this.state
    const moofuck = transpile.brainfuckToMoofuck(brainfuck)
    const invisibles = moofuck.match(/\r?\n/g) || []

    return (
      <Section title='Playground'>
        <div className={`${zf.gridX} ${zf.gridMarginX}`}>
          <fieldset className={`${zf.cell} ${zf.small12}`}>
            <legend>Brainfuck</legend>
            <CodeEditable $={brainfuck} onChange={this.onInputBrainfuck} />
          </fieldset>
          <fieldset className={`${zf.cell} ${zf.small12}`}>
            <legend>Moofuck</legend>
            <pre><code className={`hljs ${styles.moofuck}`}>
              {invisibles.map(invisible => [
                'moo',
                <span key='moo' className={styles.invisible}>
                  {invisible === '\n' ? '\\n' : '\\r\\n'}
                </span>,
                '\n'
              ])}
            </code></pre>
          </fieldset>
          <fieldset className={`${zf.cell} ${zf.small12}`}>
            <legend>Input String</legend>
            <input type='text' value={inputString} onChange={this.onInputInputString} />
          </fieldset>
          <fieldset className={`${zf.cell} ${zf.small12}`}>
            <legend>Output</legend>
            <button className={zf.button} onClick={this.onExecuteMoofuck}>Execute Moofuck</button>
            <pre><code className={`hljs ${styles.moofuck}`}>
              {output}
            </code></pre>
          </fieldset>
        </div>
      </Section>
    )
  }
}

export default Playground
