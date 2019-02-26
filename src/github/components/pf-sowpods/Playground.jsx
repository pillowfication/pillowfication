import React, { Component } from 'react'
import request from 'request-promise-native'

import Section from '../Section.jsx'
import zf from '../../foundation.scss'
import fa from '../../font-awesome.scss'
import styles from './PFSowpods.scss'

const BASE_URL = window.location.origin + '/api/sowpods'
const api = {
  random () {
    return request.get({
      uri: BASE_URL + '/random',
      json: true
    }).then(response => response.result)
  },
  verify (word) {
    return request.get({
      uri: BASE_URL + '/verify',
      qs: { w: word },
      json: true
    }).then(response => response.result)
  },
  anagram (word) {
    return request.get({
      uri: BASE_URL + '/anagram',
      qs: { w: word },
      json: true
    }).then(response => response.result)
  },
  suggest (word) {
    return request.get({
      uri: BASE_URL + '/suggest',
      qs: { w: word },
      json: true
    }).then(response => response.result)
  }
}

class Playground extends Component {
  constructor (props) {
    super(props)

    this.state = {
      verificationWord: '',
      isValid: -1,
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
    const word = typeof event === 'string' ? event : event.target.value
    this.setState({
      verificationWord: word,
      isValid: -1
    })
    if (word) {
      api.verify(word)
        .then(result => this.setState({ isValid: result ? 1 : 0 }))
        .catch(() => {})
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
    this.setState({ anagramResults: [] })
    if (this.state.anagramString) {
      api.anagram(this.state.anagramString)
        .then(results => results.length
          ? this.setState({ anagramResults: results })
          : this.setState({ anagramResults: 'No anagrams' })
        )
        .catch(() => this.setState({ anagramResults: 'Error - Could not retrieve anagrams' }))
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
    this.setState({ suggestResults: [] })
    if (this.state.suggestString) {
      api.suggest(this.state.suggestString)
        .then(results => results.length
          ? this.setState({ suggestResults: results })
          : this.setState({ suggestResults: 'No suggestions' })
        )
        .catch(() => this.setState({ suggestResults: 'Error - Could not retrieve suggestions' }))
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
            <div className={styles.results}>
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
            <div className={styles.results}>
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
