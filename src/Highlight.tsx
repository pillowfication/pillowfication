import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import { github } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import javascript from 'react-syntax-highlighter/dist/cjs/languages/hljs/javascript'
import latex from 'react-syntax-highlighter/dist/cjs/languages/hljs/latex'

SyntaxHighlighter.registerLanguage('javascript', javascript)
SyntaxHighlighter.registerLanguage('latex', latex)

const useStyles = makeStyles(theme => ({
  highlight: {
    fontSize: '1.125em',
    marginBottom: theme.spacing(2),
    '& pre': {
      margin: theme.spacing(1)
    },
    '& code': {
      background: 'none'
    }
  }
}))

interface Props {
  language?: string
  children: React.ReactNode
}

const Highlight = ({ language, children }: Props): React.ReactElement => {
  const classes = useStyles()

  return (
    <Paper variant='outlined' className={classes.highlight}>
      <SyntaxHighlighter language={language} style={github}>
        {children}
      </SyntaxHighlighter>
    </Paper>
  )
}

export default Highlight
