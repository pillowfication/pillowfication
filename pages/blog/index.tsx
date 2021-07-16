import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Link from '../../src/Link'
import Section from '../../src/blog/Section'

const useStyles = makeStyles(() => ({
  date: {
    fontVariantNumeric: 'tabular-nums'
  }
}))

const Index = (): React.ReactElement => {
  const classes = useStyles()

  return (
    <Container maxWidth='md'>
      <Box component='section' mt={4}>
        <Typography variant='h1' gutterBottom>Blog</Typography>
        <Typography paragraph>Miscellanea derived from mathematics, programming, and games.</Typography>
      </Box>
      <Section>
        <ul>
          <Typography component='li'>
            <Link href='blog/hangman'>
              <span className={classes.date}>2020/01/20</span> - Hangman
            </Link>
          </Typography>
          <Typography component='li'>
            <Link href='blog/factorio-fractions'>
              <span className={classes.date}>2019/10/05</span> - Factorio Fractions
            </Link>
          </Typography>
          <Typography component='li'>
            <Link href='blog/godels-incompleteness-theorems'>
              <span className={classes.date}>2019/03/12</span> - Gödel’s Incompleteness Theorems
            </Link>
          </Typography>
          <Typography component='li'>
            <Link href='blog/swap-sorting'>
              <span className={classes.date}>2018/09/02</span> - Swap Sorting
            </Link>
          </Typography>
          <Typography component='li'>
            <Link href='blog/scss-in-a-nutshell'>
              <span className={classes.date}>2015/07/20</span> - SCSS in a Nutshell
            </Link>
          </Typography>
          <Typography component='li'>
            <Link href='blog/perfect-cuboid'>
              <span className={classes.date}>2015/04/23</span> - Perfect Cuboid
            </Link>
          </Typography>
          <Typography component='li'>
            <Link href='blog/css-in-a-nutshell'>
              <span className={classes.date}>2015/03/08</span> - CSS in a Nutshell
            </Link>
          </Typography>
        </ul>
      </Section>
    </Container>
  )
}

export default Index
