import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface Props {
  title?: React.ReactNode
  children?: any
}

const Section = ({ title, children }: Props): React.ReactElement => {
  return (
    <Box component='section' mb={4}>
      {title !== undefined && (
        typeof title === 'string'
          ? <Typography variant='h2' gutterBottom>{title}</Typography>
          : title
      )}
      {children}
    </Box>
  )
}

export default Section
