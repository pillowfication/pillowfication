import React from 'react'
import Box from '@mui/material/Box'
import { $ } from '../../MathJax'

const LENGTHS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

function offset (percent: number, offset: number): string {
  return `calc(${percent}% - ${offset}px)`
}

interface Props {
  header: string
  data: any // ???
}

const LengthsPlot = ({ header, data }: Props): React.ReactElement => {
  return (
    <Box sx={{ position: 'relative', height: 250, pt: '2em', mb: '3em' }}>
      <Box sx={{ position: 'absolute', textAlign: 'center', top: 0, width: 1.00, height: '2em' }}>
        {header}
      </Box>
      <Box sx={{ position: 'absolute', width: 1.00, height: 1.00 }}>
        {[0, 5, 10, 15, 20].map(difficulty =>
          <Box
            key={difficulty}
            sx={{ position: 'absolute', width: 1.00, height: 0 }}
            style={{ bottom: offset(difficulty * 5, 0.5) }}
          >
            <Box sx={{
              position: 'absolute',
              top: '-0.75em',
              width: 20,
              textAlign: 'right',
              fontSize: '0.8em'
            }}>
              {$(String(difficulty))}
            </Box>
            <Box sx={{
              position: 'absolute',
              left: 32,
              right: 0,
              height: '1px',
              backgroundColor: 'gray'
            }} />
          </Box>
        )}
        <Box sx={{ marginLeft: '32px', height: 1.00 }}>
          {LENGTHS.map(length => {
            const [min, Q1, Q2, Q3, max] = data[length]
            return (
              <Box key={length} sx={{
                display: 'inline-block',
                position: 'relative',
                width: 1.00 / LENGTHS.length,
                height: 1.00
              }}>
                <Box
                  sx={{
                    position: 'absolute',
                    left: '25%',
                    right: '25%',
                    borderTop: '1px solid black',
                    borderBottom: '1px solid black',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: offset(50, 0.5),
                      bottom: 0,
                      width: '1px',
                      backgroundColor: 'black'
                    }
                  }}
                  style={{
                    top: offset((20 - max) * 5, 0.5),
                    bottom: offset(min * 5, 0.5)
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    left: '5%',
                    right: '5%',
                    border: '1px solid black',
                    backgroundColor: 'primary.light'
                  }}
                  style={{
                    top: offset((20 - Q3) * 5, 0.5),
                    bottom: offset(Q1 * 5, 0.5)
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    left: '5%',
                    right: '5%',
                    height: 2,
                    backgroundColor: 'black'
                  }}
                  style={{
                    bottom: offset(Q2 * 5, 1)
                  }}
                />
              </Box>
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}

export default LengthsPlot
