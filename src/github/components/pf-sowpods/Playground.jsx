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

    this.handleInputVerificationWord = this.handleInputVerificationWord.bind(this)
    this.handleClickRandomWord = this.handleClickRandomWord.bind(this)
    this.handleInputAnagramString = this.handleInputAnagramString.bind(this)
    this.handleKeyPressAnagramString = this.handleKeyPressAnagramString.bind(this)
    this.handleClickAnagram = this.handleClickAnagram.bind(this)
    this.handleInputSuggestString = this.handleInputSuggestString.bind(this)
    this.handleKeyPressSuggestString = this.handleKeyPressSuggestString.bind(this)
    this.handleClickSuggest = this.handleClickSuggest.bind(this)
  }

  handleInputVerificationWord (event) {
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

  handleClickRandomWord () {
    this.handleInputVerificationWord('')
    api.random()
      .then(word => this.handleInputVerificationWord(word))
      .catch(() => this.handleInputVerificationWord('Error - Could not retrieve word'))
  }

  handleInputAnagramString (event) {
    this.setState({ anagramString: event.target.value })
  }

  handleKeyPressAnagramString (event) {
    if (event.key === 'Enter') {
      this.handleClickAnagram()
    }
  }

  handleClickAnagram () {
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

  handleInputSuggestString (event) {
    this.setState({ suggestString: event.target.value })
  }

  handleKeyPressSuggestString (event) {
    if (event.key === 'Enter') {
      this.handleClickSuggest()
    }
  }

  handleClickSuggest () {
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
                <i className={`${fa.fa} ${fa.faLg} ${fa.faFw} ` +
                  (isValid !== -1 ? isValid ? styles.okIcon : styles.noIcon : styles.noneIcon)}
                />
              </span>
              <input
                type='text'
                className={zf.inputGroupField}
                value={verificationWord}
                onChange={this.handleInputVerificationWord}
              />
              <div className={zf.inputGroupButton}>
                <button className={zf.button} onClick={this.handleClickRandomWord}>
                  Random Word
                </button>
              </div>
            </div>
          </fieldset>
          <fieldset className={`${zf.cell} ${zf.small12}`}>
            <legend>Anagram</legend>
            <label>Non-alphabetic characters are treated as wildcards</label>
            <div className={zf.inputGroup}>
              <input
                type='text'
                className={zf.inputGroupField}
                value={anagramString}
                onChange={this.handleInputAnagramString}
                onKeyPress={this.handleKeyPressAnagramString}
              />
              <div className={zf.inputGroupButton}>
                <button className={zf.button} onClick={this.handleClickAnagram}>
                  Anagram
                </button>
              </div>
            </div>
            <div className={classnames(styles.results, this.state.anagramResultsLoading && styles.loading)}>
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
              <input
                type='text'
                className={zf.inputGroupField}
                value={suggestString}
                onChange={this.handleInputSuggestString}
                onKeyPress={this.handleKeyPressSuggestString}
              />
              <div className={zf.inputGroupButton}>
                <button className={zf.button} onClick={this.handleClickSuggest}>
                  Suggest
                </button>
              </div>
            </div>
            <div className={classnames(styles.results, this.state.suggestResultsLoading && styles.loading)}>
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
