import React from 'react'

class Footnotes {
  constructor () {
    this.footnotes = []

    this.createFootnote = this.createFootnote.bind(this)
    this.displayFootnotes = this.displayFootnotes.bind(this)
  }

  createFootnote (...component) {
    this.footnotes.push(...component)
    return (
      <sup>
        {
          Array(component.length).fill()
            .map((_, index) => this.footnotes.length - component.length + index + 1)
            .join(', ')
        }
      </sup>
    )
  }

  displayFootnotes () {
    return (
      <small>
        <ol>
          {this.footnotes.map((footnote, index) => (
            <li key={index}>{footnote}</li>
          ))}
        </ol>
      </small>
    )
  }
}

export default Footnotes
