import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
// import Link from '@material-ui/core/Link'
import Blog from '../../src/blog/Blog'
import Section from '../../src/blog/Section'

const useStyles = makeStyles(() => ({
  blue: {
    color: 'blue'
  }
}))

const BlogItem = (): React.ReactElement => {
  const classes = useStyles()

  return (
    <Blog title='Title' date='1234/56/78'>
      <Section title='Section'>
        <Typography paragraph className={classes.blue}>Hello, world!</Typography>
      </Section>
    </Blog>
  )
}

export default BlogItem
