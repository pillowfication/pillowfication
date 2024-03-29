import React from 'react'
import { styled } from '@mui/system'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Link from '../src/Link'

const PILLOWFICATION = {
  path: [
    // P
    '25,140 45,120 25,100',
    '45,120 25,100 45,80',
    '25,100 45,80 25,60',
    '45,80 25,60 45,40',
    '25,60 45,40 25,20',
    '45,40 25,20 45,0',
    '55,0 75,20 55,40',
    '75,20 55,40 75,60',
    '55,40 75,60 55,80',
    '75,20 95,40 75,60',
    '0,4 32,4 16,20',
    // I
    '90,140 110,120 90,100',
    '110,120 90,100 110,80',
    '90,90 110,70 90,70',
    // L
    '120,140 140,120 120,100',
    '140,120 120,100 140,80',
    '120,100 140,80 120,60',
    '140,80 120,60 140,40',
    // L
    '150,140 170,120 150,100',
    '170,120 150,100 170,80',
    '150,100 170,80 150,60',
    '170,80 150,60 170,40',
    // O
    '200,132 178,110 200,110',
    '200,110 178,110 200,88',
    '208,80 238,110 208,110',
    '208,110 238,110 208,140',
    // W
    '266,140 246,120 266,100',
    '246,120 266,100 246,80',
    '266,125 281,110 296,125',
    '296,140 316,120 296,100',
    '316,120 296,100 316,80',
    // F
    '326,140 346,120 326,100',
    '346,120 326,100 346,80',
    '326,100 346,80 326,60',
    '346,80 326,60 346,40',
    '354,40 378,64 354,64',
    '354,64 378,88 354,88',
    // I
    '386,140 406,120 386,100',
    '406,120 386,100 406,80',
    '386,90 406,70 386,70',
    // C
    '436,132 414,110 436,110',
    '436,110 414,110 436,88',
    '444,80 470,106 444,106',
    '444,140 470,114 444,114',
    // A
    '500,132 478,110 500,88',
    '528,140 508,120 528,100',
    '508,120 528,100 508,80',
    // T
    '538,140 558,120 538,100',
    '558,120 538,100 558,80',
    '538,100 558,80 538,60',
    '566,88 578,100 566,100',
    // I
    '586,140 606,120 586,100',
    '606,120 586,100 606,80',
    '586,90 606,70 586,70',
    // O
    '638,132 616,110 638,110',
    '638,110 616,110 638,88',
    '646,80 676,110 646,110',
    '646,110 676,110 646,140',
    // N
    '704,140 684,120 704,100',
    '684,120 704,100 684,80',
    '732,140 712,120 732,100',
    '712,120 732,100 712,80'
  ],
  bounds: {
    x: [0, 732],
    y: [0, 140]
  }
}

const Triangle = styled('polygon')({
  fill: '#000000',
  transition: 'fill 3s linear',
  '&:hover': {
    fill: '#ffffff',
    transition: 'fill 0s linear'
  }
})

const Index = (): React.ReactElement => {
  return (
    <Box sx={{
      display: 'flex',
      width: '100vw',
      height: '100vh',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div>
        <svg
          width={PILLOWFICATION.bounds.x[1] - PILLOWFICATION.bounds.x[0]} height={PILLOWFICATION.bounds.y[1] - PILLOWFICATION.bounds.y[0]}
        >
          {PILLOWFICATION.path.map((points, index) =>
            <Triangle key={index} points={points} />
          )}
        </svg>
        <Stack
          direction='row'
          spacing={2}
          justifyContent='center'
          sx={{ mt: 4 }}
        >
          <Button
            component={Link}
            variant='outlined'
            href='/projects'
            sx={{
              textTransform: 'none',
              px: 4,
              py: 0.25
            }}
          >
            projects
          </Button>
          <Button
            component={Link}
            variant='outlined'
            href='/blog'
            sx={{
              textTransform: 'none',
              px: 4,
              py: 0.25
            }}
          >
            blog
          </Button>
        </Stack>
      </div>
    </Box>
  )
}

export default Index
