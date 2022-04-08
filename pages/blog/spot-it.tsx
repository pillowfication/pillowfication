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

const SpotIt = (): React.ReactElement => {
  const classes = useStyles()

  return (
    <Blog title='Spot It!' date='2020/12/25'>
      <Section title='Section'>
        <Typography paragraph className={classes.blue}>Hello, world!</Typography>
      </Section>
    </Blog>
  )
}

export default SpotIt
