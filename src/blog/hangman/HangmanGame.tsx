import React from 'react'
import { styled } from '@mui/system'
import Box from '@mui/material/Box'

const Miss = styled('span')(() => ({
  position: 'relative',
  margin: '0 2px',
  '&::before': {
    position: 'absolute',
    content: '""',
    left: '-20%',
    top: '50%',
    right: '-20%',
    borderTop: '2px solid',
    transform: 'rotate(-45deg)'
  }
}))

interface Props {
  template: string
  misses?: string
}

const HangmanGame = ({ template, misses }: Props): React.ReactElement => {
  return (
    <Box sx={{
      fontFamily: 'monospace',
      textAlign: 'center',
      fontSize: '2rem',
      letterSpacing: 4
    }}>
      <div>{template}</div>
      {misses !== undefined && (
        <div>
          {misses.split('').map((letter, index) =>
            <Miss key={index}>{letter}</Miss>)}
        </div>
      )}
    </Box>
  )
}

export default HangmanGame
