import React from 'react'
import { styled } from '@mui/system'
import Paper from '@mui/material/Paper'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import { github } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import css from 'react-syntax-highlighter/dist/cjs/languages/hljs/css'
import javascript from 'react-syntax-highlighter/dist/cjs/languages/hljs/javascript'
import latex from 'react-syntax-highlighter/dist/cjs/languages/hljs/latex'

SyntaxHighlighter.registerLanguage('javascript', css)
SyntaxHighlighter.registerLanguage('javascript', javascript)
SyntaxHighlighter.registerLanguage('latex', latex)

const HighlighterContainer = styled(Paper)(({ theme }) => ({
}))

interface Props {
  language?: string
  children: React.ReactNode
}

const Highlight = ({ language, children }: Props): React.ReactElement => {
  return (
    <HighlighterContainer
      component={SyntaxHighlighter}
      variant='outlined'
      language={language}
      style={github}
    >
      {children}
    </HighlighterContainer>
  )
}

export default Highlight
