import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

const useStyles = makeStyles((theme) => ({
  reference: {
    lineHeight: 0,
    '@media print': {
      textDecoration: 'none'
    }
  },
  footnote: {
    '& > ol': {
      fontSize: '0.2rem',
      marginLeft: theme.spacing(2)
    }
  }
}))

interface ReferenceProps {
  identifier?: string,
  references: string[],
  refIds: string[]
}

const Reference = ({ identifier, references, refIds }: ReferenceProps): React.ReactElement => {
  const classes = useStyles()

  return (
    <sup className={classes.reference}>
      {Array(refIds.length).fill(undefined)
        .map((_, index) => {
          const count = references.length - refIds.length + index
          const reference = (
            <Link
              href={`#[${identifier ? identifier + (count + 1) : (count + 1)}]`}
              className={classes.reference}
            >
              {count + 1}
            </Link>
          )
          return index > 0
            ? [<Fragment key={'f' + index}>, </Fragment>, reference]
            : reference
        })
        .flat()}
    </sup>
  )
}

interface FootnoteProps {
  identifier?: string,
  references: string[],
  footnotes: Record<string, any>
}

const Footnote = ({ identifier, references, footnotes }: FootnoteProps): React.ReactElement => {
  const classes = useStyles()

  return (
    <small className={classes.footnote}>
      <ol>
        {references.map((id, index) => (
          <Typography
            key={id}
            component='li'
            id={`[${identifier ? identifier + (index + 1) : (index + 1)}]`}
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

  createReference (...refIds: string[]) {
    this.references.push(...refIds)
    return (
      <Reference
        identifier={this.identifier}
        references={this.references.slice()}
        refIds={refIds}
      />
    )
  }

  createFootnote (footnotes: Record<string, any>) {
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
