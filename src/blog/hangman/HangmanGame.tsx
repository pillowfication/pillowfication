import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  hangmanGame: {
    fontFamily: 'monospace',
    textAlign: 'center',
    fontSize: '2rem',
    letterSpacing: theme.spacing(0.5),
    marginBottom: theme.spacing(2)
  },
  miss: {
    position: 'relative',
    margin: theme.spacing(0, 0.5),
    '&::before': {
      position: 'absolute',
      content: '""',
      left: '-20%',
      top: '50%',
      right: '-20%',
      borderTop: '2px solid',
      transform: 'rotate(-45deg)'
    }
  }
}))

interface Props {
  template: string
  misses?: string
}

const HangmanGame = ({ template, misses }: Props): React.ReactElement => {
  const classes = useStyles()

  return (
    <div className={classes.hangmanGame}>
      <div>{template}</div>
      {misses !== undefined && (
        <div>
          {misses.split('').map((letter, index) =>
            <span key={index} className={classes.miss}>{letter}</span>)}
        </div>
      )}
    </div>
  )
}

export default HangmanGame
