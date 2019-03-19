import React, { Fragment } from 'react'

import styles from './Footnotes.scss'

class Footnotes {
  constructor () {
    this.references = []

    this.createReference = this.createReference.bind(this)
    this.createFootnotes = this.createFootnotes.bind(this)
  }

  createReference (...ids) {
    this.references.push(...ids)
    return (
      <sup>
        {
          Array(ids.length).fill()
            .map((_, index) => {
              const count = this.references.length - ids.length + index + 1
              const footnote = <a key={index} href={`#[${count}]`} className={styles.ref}>{count}</a>
              return index > 0 ? [ <Fragment key={index + 'f'}>, </Fragment>, footnote ] : footnote
            })
            .flat()
        }
      </sup>
    )
  }

  createFootnotes (footnotes) {
    return (
      <small className={styles.footnotes}>
        <ol>
          {this.references.map((id, index) => (
            <li key={id} id={`[${index}]`}>{footnotes[id]}</li>
          ))}
        </ol>
      </small>
    )
  }
}

export default Footnotes
