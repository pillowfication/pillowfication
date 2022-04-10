import React from 'react'
import { styled } from '@mui/system'
import Box from '@mui/material/Box'

const THETA = 2 * Math.PI / 7

const SpotItSymbol = styled('div')(() => ({
  display: 'flex',
  position: 'absolute',
  width: 0.25,
  height: 0.25,
  marginLeft: -0.125,
  marginTop: -0.125,
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'visible'
}))

interface Props {
  size?: number
  noMargin?: boolean
  symbols: [
    React.ReactElement | null,
    React.ReactElement | null,
    React.ReactElement | null,
    React.ReactElement | null,
    React.ReactElement | null,
    React.ReactElement | null,
    React.ReactElement | null,
    React.ReactElement | null
  ]
}

const SpotItCard = ({ size = 150, noMargin = false, symbols }: Props): React.ReactElement => {
  return (
    <Box sx={{
      display: 'inline-block',
      position: 'relative',
      width: size,
      height: size,
      margin: noMargin ? 0 : 1,
      borderRadius: '50%',
      border: '2px solid black',
      backgroundColor: 'white'
    }}>
      <Box component={SpotItSymbol} sx={{ top: '50%', left: '50%' }}>{symbols[0]}</Box>
      <Box component={SpotItSymbol} sx={{
        top: `${(50 - Math.cos(THETA * 1) * 33)}%`,
        left: `${(50 - Math.sin(THETA * 1) * 33)}%`
      }}>{symbols[1]}</Box>
      <Box component={SpotItSymbol} sx={{
        top: `${(50 - Math.cos(THETA * 2) * 33)}%`,
        left: `${(50 - Math.sin(THETA * 2) * 33)}%`
      }}>{symbols[2]}</Box>
      <Box component={SpotItSymbol} sx={{
        top: `${(50 - Math.cos(THETA * 3) * 33)}%`,
        left: `${(50 - Math.sin(THETA * 3) * 33)}%`
      }}>{symbols[3]}</Box>
      <Box component={SpotItSymbol} sx={{
        top: `${(50 - Math.cos(THETA * 4) * 33)}%`,
        left: `${(50 - Math.sin(THETA * 4) * 33)}%`
      }}>{symbols[4]}</Box>
      <Box component={SpotItSymbol} sx={{
        top: `${(50 - Math.cos(THETA * 5) * 33)}%`,
        left: `${(50 - Math.sin(THETA * 5) * 33)}%`
      }}>{symbols[5]}</Box>
      <Box component={SpotItSymbol} sx={{
        top: `${(50 - Math.cos(THETA * 6) * 33)}%`,
        left: `${(50 - Math.sin(THETA * 6) * 33)}%`
      }}>{symbols[6]}</Box>
      <Box component={SpotItSymbol} sx={{
        top: `${(50 - Math.cos(THETA * 7) * 33)}%`,
        left: `${(50 - Math.sin(THETA * 7) * 33)}%`
      }}>{symbols[7]}</Box>
    </Box>
  )
}

export default SpotItCard
