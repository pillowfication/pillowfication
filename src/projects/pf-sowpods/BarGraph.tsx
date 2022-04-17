import React from 'react'
import { alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface Props {
  title: string
  stats: Array<{ label: string, value: number, displayValue: string }>
}

const BarGraph = ({ title, stats }: Props): React.ReactElement => {
  const maxValue = Math.max(...stats.map(stat => stat.value))

  return (
    <div>
      <Box textAlign='center'>
        <Typography>{title}</Typography>
      </Box>
      <Box component='table' sx={{ width: 1.00 }}>
        <tbody>
          {stats.map((stat, index) =>
            <tr key={index}>
              <Box component='th' scope='row' align='center' pr={2}>
                <Typography>{stat.label}</Typography>
              </Box>
              <Box component='td' sx={{
                position: 'relative',
                width: 1.00,
                '&:hover .BarGraph-label': {
                  opacity: 1
                }
              }}>
                <Box sx={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: `${stat.value / maxValue * 100}%`,
                  height: 1.00,
                  bgcolor: 'primary.main'
                }} />
                <Box className='BarGraph-label' sx={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  height: 1.00,
                  bgcolor: alpha('#fff', 0.8),
                  px: 1,
                  opacity: 0
                }}>
                  {stat.displayValue}
                </Box>
              </Box>
            </tr>
          )}
        </tbody>
      </Box>
    </div>
  )
}

export default BarGraph
