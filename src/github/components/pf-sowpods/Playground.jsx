import React, { Component } from 'react'
import sortBy from 'lodash/sortBy'
import sowpods from 'pf-sowpods'

import Section from '../Section.jsx'
import zf from '../../foundation.scss'
import fa from '../../font-awesome.scss'
import styles from './PFSowpods.scss'

class Playground extends Component {
  constructor (props) {
    super(props)

    this.state = {
      verificationWord: '',
      anagramString: '',
      anagramResults: [],
      suggestString: '',
      suggestResults: []
    }

    this.onInputVerificationWord = this.onInputVerificationWord.bind(this)
    this.onClickRandomWord = this.onClickRandomWord.bind(this)
    this.onInputAnagramString = this.onInputAnagramString.bind(this)
    this.onKeyPressAnagramString = this.onKeyPressAnagramString.bind(this)
    this.onClickAnagram = this.onClickAnagram.bind(this)
    this.onInputSuggestString = this.onInputSuggestString.bind(this)
    this.onKeyPressSuggestString = this.onKeyPressSuggestString.bind(this)
    this.onClickSuggest = this.onClickSuggest.bind(this)
  }

  onInputVerificationWord (event) {
    this.setState({ verificationWord: event.target.value })
  }

  onClickRandomWord () {
    this.setState({ verificationWord: sowpods.random() })
  }

  onInputAnagramString (event) {
    this.setState({ anagramString: event.target.value })
  }

  onKeyPressAnagramString (event) {
    if (event.key === 'Enter') {
      this.onClickAnagram()
    }
  }

  onClickAnagram () {
    this.setState({
      anagramResults: sortBy(
        sowpods.anagram(this.state.anagramString),
        result => -result.length
      )
    })
  }

  onInputSuggestString (event) {
    this.setState({ suggestString: event.target.value })
  }

  onKeyPressSuggestString (event) {
    if (event.key === 'Enter') {
      this.onClickSuggest()
    }
  }

  onClickSuggest () {
    this.setState({ suggestResults: sowpods.suggest(this.state.suggestString) })
  }

  render () {
    const {
      verificationWord,
      anagramString,
      anagramResults,
      suggestString,
      suggestResults
    } = this.state

    return (
      <Section title='Playground'>
        <p><code>pf-sowpods</code> is available in your console as <code>window.sowpods</code>.</p>
        <div className={`${zf.gridX} ${zf.gridMarginX}`}>
          <fieldset className={`${zf.cell} ${zf.small12}`}>
            <legend>Verify</legend>
            <div className={zf.inputGroup}>
              <span className={zf.inputGroupLabel}>
                <i className={`${fa.fa} ${fa.faLg} ${fa.faFw} ` + (
                  verificationWord
                    ? sowpods.verify(verificationWord) ? styles.okIcon : styles.noIcon
                    : styles.noneIcon
                )} />
              </span>
              <input type='text'
                className={zf.inputGroupField}
                value={verificationWord}
                onChange={this.onInputVerificationWord}
              />
              <div className={zf.inputGroupButton}>
                <button className={zf.button} onClick={this.onClickRandomWord}>
                  Random Word
                </button>
              </div>
            </div>
          </fieldset>
          <fieldset className={`${zf.cell} ${zf.small12}`}>
            <legend>Anagram</legend>
            <label>Non-alphabetic characters are treated as wildcards</label>
            <div className={zf.inputGroup}>
              <input type='text'
                className={zf.inputGroupField}
                value={anagramString}
                onChange={this.onInputAnagramString}
                onKeyPress={this.onKeyPressAnagramString}
              />
              <div className={zf.inputGroupButton}>
                <button className={zf.button} onClick={this.onClickAnagram}>
                  Anagram
                </button>
              </div>
            </div>
            <div className={styles.results}>
              {anagramResults.map(result => <div key={result}>{result}</div>)}
            </div>
          </fieldset>
          <fieldset className={`${zf.cell} ${zf.small12}`}>
            <legend>Suggest</legend>
            <div className={zf.inputGroup}>
              <input type='text'
                className={zf.inputGroupField}
                value={suggestString}
                onChange={this.onInputSuggestString}
                onKeyPress={this.onKeyPressSuggestString}
              />
              <div className={zf.inputGroupButton}>
                <button className={zf.button} onClick={this.onClickSuggest}>
                  Suggest
                </button>
              </div>
            </div>
            <div className={styles.results}>
              {suggestResults.map(result => <div key={result}>{result}</div>)}
            </div>
          </fieldset>
        </div>
      </Section>
    )
  }
}

export default Playground
