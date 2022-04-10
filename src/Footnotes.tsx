import React from 'react'
import { styled } from '@mui/system'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

interface ReferenceProps {
  identifier?: string
  references: string[]
  refIds: string[]
}

const ReferenceComponent = styled('sup')(() => ({
  lineHeight: 0
}))

const Reference = ({ identifier, references, refIds }: ReferenceProps): React.ReactElement => {
  return (
    <ReferenceComponent>
      {Array(refIds.length).fill(undefined)
        .map((_, index) => {
          const count = references.length - refIds.length + index
          const reference = (
            <Link key={index} href={`#[${identifier ?? 0 + (count + 1)}]`}>
              {count + 1}
            </Link>
          )
          return index > 0
            ? [<React.Fragment key={`f${index}`}>, </React.Fragment>, reference]
            : reference
        })
        .flat()}
    </ReferenceComponent>
  )
}

interface FootnoteProps {
  identifier?: string
  references: string[]
  footnotes: Record<string, any>
}

const Footnote = ({ identifier, references, footnotes }: FootnoteProps): React.ReactElement => {
  return (
    <small>
      <ol>
        {references.map((id, index) => (
          <Typography
            key={id}
            component='li'
            id={`[${identifier ?? 0 + (index + 1)}]`}
          >
            {footnotes[id]}
          </Typography>
        ))}
      </ol>
    </small>
  )
}

class Footnotes {
  identifier?: string
  references: string[]

  constructor (identifier?: string) {
    this.identifier = identifier
    this.references = []

    this.createReference = this.createReference.bind(this)
    this.createFootnote = this.createFootnote.bind(this)
  }

  createReference (...refIds: string[]): React.ReactElement {
    this.references.push(...refIds)
    return (
      <Reference
        identifier={this.identifier}
        references={this.references.slice()}
        refIds={refIds}
      />
    )
  }

  createFootnote (footnotes: Record<string, any>): React.ReactElement {
    return (
      <Footnote
        identifier={this.identifier}
        references={this.references}
        footnotes={footnotes}
      />
    )
  }
}

export default Footnotes
