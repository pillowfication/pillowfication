import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Icon from '@material-ui/core/Icon'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import Blog from '../../src/blog/Blog'
import Section from '../../src/blog/Section'
import Highlight from '../../src/Highlight'
import 'pf-konami'

const KONAMI: Array<{ code: string, icon: React.ReactNode }> = [
  { code: 'ArrowUp', icon: <ArrowUpwardIcon /> },
  { code: 'ArrowUp', icon: <ArrowUpwardIcon /> },
  { code: 'ArrowDown', icon: <ArrowDownwardIcon /> },
  { code: 'ArrowDown', icon: <ArrowDownwardIcon /> },
  { code: 'ArrowLeft', icon: <ArrowBackIcon /> },
  { code: 'ArrowRight', icon: <ArrowForwardIcon /> },
  { code: 'ArrowLeft', icon: <ArrowBackIcon /> },
  { code: 'ArrowRight', icon: <ArrowForwardIcon /> },
  { code: 'KeyB', icon: <Icon>B</Icon> },
  { code: 'KeyA', icon: <Icon>A</Icon> }
]

const useStyles = makeStyles((theme) => ({
  example: {
    display: 'inline-block',
    paddingLeft: theme.spacing(2),
    verticalAlign: 'middle'
  },
  icon: {
    display: 'inline-block',
    width: '1.5em',
    height: '1.5em',
    overflow: 'hidden',
    textAlign: 'center',
    color: theme.palette.primary.main,
    '& span': {
      lineHeight: 1,
      fontWeight: 'bold'
    }
  },
  selected: {
    borderBottom: `2px solid ${theme.palette.primary.main}`
  }
}))

const PFKonami = (): React.ReactElement => {
  return (
    <Blog title='pf-konami'>
      <Section>
      <Typography paragraph>This package is meant to be a little easter egg that you can safely sneak into any project. I dropped it off as a goodbye gift at work. It showers the screen in confetti whenever the <Link href='https://en.wikipedia.org/wiki/Konami_Code'>Konami Code</Link> is triggered.</Typography>
      <ExampleKeypress />
      <Typography paragraph>All that’s required is for the packaged to be included at least once from anywhere in the project, and it will silently do nothing if it is unable to initialize.</Typography>
      <Highlight language='javascript'>{'require(\'pf-konami\')'}</Highlight>
      <Typography paragraph>It was intended to be tiny and non-configurable and targeted IE8, but I’m currently working on an upgraded version!</Typography>
      </Section>
    </Blog>
  )
}

const ExampleKeypress = (): React.ReactElement => {
  const classes = useStyles()
  const [pointer, setPointer] = useState(0)

  useEffect(() => {
    const captureKeyDown = (event: KeyboardEvent) => {
      setPointer((pointer) => {
        const key = event.code
        let newPointer = pointer

        if (key === KONAMI[newPointer].code) {
          ++newPointer
        } else {
          let count = 1
          while (--newPointer >= 0 && KONAMI[newPointer].code === key) {
            ++count
          }
          newPointer = 0
          while (--count >= 0 && KONAMI[newPointer].code === key) {
            ++newPointer
          }
        }

        if (newPointer === KONAMI.length) {
          newPointer = 0
        }

        return newPointer
      })
    }

    window.addEventListener('keydown', captureKeyDown, true)

    return () => {
      window.removeEventListener('keydown', captureKeyDown, true)
    }
  }, [])

  return (
    <Typography paragraph>Try pressing:
      <span className={classes.example}>
        {KONAMI.map(({ icon }, index) =>
          <span key={index} className={clsx(classes.icon, pointer === index && classes.selected)}>
            {icon}
          </span>
        )}
      </span>
    </Typography>
  )
}

export default PFKonami
