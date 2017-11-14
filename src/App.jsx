import React from 'react'
import styles from './App.scss'

const HelloWorld = 'Hello, World!'

export default class App extends React.Component {
  render () {
    return <div className={styles.app}>{HelloWorld}</div>
  }
}
