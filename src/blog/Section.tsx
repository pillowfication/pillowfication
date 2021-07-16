import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

interface Props {
  title?: React.ReactNode,
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
