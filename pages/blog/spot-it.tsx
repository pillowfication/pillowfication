import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Blog from '../../src/blog/Blog'
import Section from '../../src/blog/Section'

const useStyles = makeStyles(() => ({
  card: {
    width: 200,
    height: 200,
    borderRadius: '50%',
    border: '2px solid black'
  }
}))

const SpotItCard = (): React.ReactElement => {
  const classes = useStyles()

  return (
    <div className={classes.card}>
    </div>
  )
}

const SpotIt = (): React.ReactElement => {
  return (
    <Blog title='Spot It!' date='2020/12/25'>
      <Section title='Rules of the Game'>
        <Typography paragraph><Link href='https://en.wikipedia.org/wiki/Dobble'><i>Spot It!</i></Link> or <i>Dobble</i> is a game where players must find the common symbol between two cards.</Typography>
        <SpotItCard />
      </Section>
    </Blog>
  )
}

export default SpotIt
