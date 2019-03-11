import React, { Component } from 'react'
import classnames from 'classnames'
import * as api from './api'

import Section from '../Section.jsx'
import zf from '../../../foundation.scss'
import fa from '../../../font-awesome.scss'
import styles from './PFSowpods.scss'

class Playground extends Component {
  constructor (props) {
    super(props)

    this.state = {
      verificationWord: '',
      verificationWordLoading: null,
      isValid: -1,
      anagramString: '',
      anagramResults: [],
      anagramResultsLoading: null,
      suggestString: '',
      suggestResults: [],
      suggestResultsLoading: null
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
    const word = typeof event === 'string' ? event : event.target.value
    this.setState({
      verificationWord: word,
      isValid: -1
    })
    if (word) {
      const promise = api.verify(word)
        .then(result => {
          if (this.state.verificationWordLoading === promise) {
            this.setState({ isValid: result ? 1 : 0 })
          }
        })
        .catch(() => {})
      this.setState({ verificationWordLoading: promise })
    }
  }

  onClickRandomWord () {
    this.onInputVerificationWord('')
    api.random()
      .then(word => this.onInputVerificationWord(word))
      .catch(() => this.onInputVerificationWord('Error - Could not retrieve word'))
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
    if (this.state.anagramString) {
      const promise = api.anagram(this.state.anagramString)
        .then(results => results.length ? results : 'No anagrams')
        .catch(() => 'Error - Could not retrieve anagrams')
        .then(results => {
          if (this.state.anagramResultsLoading === promise) {
            this.setState({
              anagramResults: results,
              anagramResultsLoading: null
            })
          }
        })
      this.setState({ anagramResultsLoading: promise })
    } else {
      this.setState({ anagramResults: [] })
    }
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
    if (this.state.suggestString) {
      const promise = api.suggest(this.state.suggestString)
        .then(results => results.length ? results : 'No suggestions')
        .catch(() => 'Error - Could not retrieve suggestions')
        .then(results => {
          if (this.state.suggestResultsLoading === promise) {
            this.setState({
              suggestResults: results,
              suggestResultsLoading: null
            })
          }
        })
      this.setState({ suggestResultsLoading: promise })
    } else {
      this.setState({ suggestResults: [] })
    }
  }

  render () {
    const {
      verificationWord,
      isValid,
      anagramString,
      anagramResults,
      suggestString,
      suggestResults
    } = this.state

    return (
      <Section title='Playground'>
        <div className={`${zf.gridX} ${zf.gridMarginX}`}>
          <fieldset className={`${zf.cell} ${zf.small12}`}>
            <legend>Verify</legend>
            <div className={zf.inputGroup}>
              <span className={zf.inputGroupLabel}>
                <i className={`${fa.fa} ${fa.faLg} ${fa.faFw} ` + (
                  isValid !== -1
                    ? isValid ? styles.okIcon : styles.noIcon
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
            <div className={classnames(styles.results, { [styles.loading]: this.state.anagramResultsLoading })}>
              {
                typeof anagramResults === 'string'
                  ? anagramResults
                  : anagramResults.map(result => <div key={result}>{result}</div>)
              }
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
            <div className={classnames(styles.results, { [styles.loading]: this.state.suggestResultsLoading })}>
              {
                typeof suggestResults === 'string'
                  ? suggestResults
                  : suggestResults.map(result => <div key={result}>{result}</div>)
              }
            </div>
          </fieldset>
        </div>
      </Section>
    )
  }
}

export default Playground
