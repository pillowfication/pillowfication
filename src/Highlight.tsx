import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Head from 'next/head'
import ReactHighlight from 'react-highlight.js'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles(theme => ({
  highlight: {
    fontSize: '1.25em',
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
      <Head>
        <link
          key='hljs-css'
          rel='stylesheet'
          href={`https://highlightjs.org/static/demo/styles/github.css`}
        />
      </Head>
      <ReactHighlight language={language}>
        {children}
      </ReactHighlight>
    </Paper>
  )
}

export default Highlight
