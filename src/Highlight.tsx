import React from 'react'
import Paper from '@mui/material/Paper'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import { github } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import css from 'react-syntax-highlighter/dist/cjs/languages/hljs/css'
import javascript from 'react-syntax-highlighter/dist/cjs/languages/hljs/javascript'
import latex from 'react-syntax-highlighter/dist/cjs/languages/hljs/latex'
import xml from 'react-syntax-highlighter/dist/cjs/languages/hljs/xml'

SyntaxHighlighter.registerLanguage('css', css)
SyntaxHighlighter.registerLanguage('javascript', javascript)
SyntaxHighlighter.registerLanguage('latex', latex)
SyntaxHighlighter.registerLanguage('xml', xml)

interface Props {
  language?: string
  children: React.ReactNode
}

const Highlight = ({ language, children }: Props): React.ReactElement => {
  return (
    <Paper
      component={SyntaxHighlighter}
      variant='outlined'
      language={language}
      style={github}
      sx={{ margin: 0 }}
    >
      {children}
    </Paper>
  )
}

export default Highlight
