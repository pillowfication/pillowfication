import React, { Fragment } from 'react'

import styles from './Footnotes.scss'

class Footnotes {
  constructor () {
    this.footnotes = []

    this.createFootnote = this.createFootnote.bind(this)
    this.displayFootnotes = this.displayFootnotes.bind(this)
  }

  createFootnote (...ids) {
    this.footnotes.push(...ids)
    return (
      <sup>
        {
          Array(ids.length).fill()
            .map((_, index) => {
              const count = this.footnotes.length - ids.length + index + 1
              const footnote = <a key={index} href={`#[${count}]`} className={styles.ref}>{count}</a>
              return index > 0 ? [ <Fragment key={index + 'f'}>, </Fragment>, footnote ] : footnote
            })
            .flat()
        }
      </sup>
    )
  }

  displayFootnotes (footnotes) {
    return (
      <small className={styles.footnotes}>
        <ol>
          {this.footnotes.map((id, index) => (
            <li key={id} id={`[${index}]`}>{footnotes[id]}</li>
          ))}
        </ol>
      </small>
    )
  }
}

export default Footnotes
