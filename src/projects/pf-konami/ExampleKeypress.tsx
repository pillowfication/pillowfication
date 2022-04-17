import React, { useEffect, useState } from 'react'
import { alpha } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

const KONAMI = [
  { code: 'ArrowUp', icon: <ArrowUpwardIcon /> },
  { code: 'ArrowUp', icon: <ArrowUpwardIcon /> },
  { code: 'ArrowDown', icon: <ArrowDownwardIcon /> },
  { code: 'ArrowDown', icon: <ArrowDownwardIcon /> },
  { code: 'ArrowLeft', icon: <ArrowBackIcon /> },
  { code: 'ArrowRight', icon: <ArrowForwardIcon /> },
  { code: 'ArrowLeft', icon: <ArrowBackIcon /> },
  { code: 'ArrowRight', icon: <ArrowForwardIcon /> },
  { code: 'KeyB', icon: 'B' },
  { code: 'KeyA', icon: 'A' }
]

const ExampleKeypress = (): React.ReactElement => {
  const [pointer, setPointer] = useState(0)

  useEffect(() => {
    const captureKeyDown = (event: KeyboardEvent): void => {
      setPointer(pointer => {
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
    <Stack direction='row' justifyContent='center' spacing={1} my={2}>
      {KONAMI.map(({ icon }, index) =>
        <Avatar key={index} sx={{
          color: index === pointer ? 'white' : 'black',
          backgroundColor: theme => index === pointer
            ? theme.palette.primary.main
            : alpha(theme.palette.primary.main, 0),
          transition: 'all 0.1s linear'
        }}>
          {icon}
        </Avatar>
      )}
    </Stack>
  )
}

export default ExampleKeypress
