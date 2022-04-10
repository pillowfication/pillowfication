import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

interface Props {
  title: string
  date?: string
  children?: any
}

const Blog = ({ title, date, children }: Props): React.ReactElement => {
  return (
    <Container maxWidth='lg'>
      <Box component='article' mt={8} mb={20}>
        <Typography variant='h1' sx={{ mb: 8 }}>
          {title}
          {date !== undefined && (
            <Typography component='span' ml={4}>{date}</Typography>
          )}
        </Typography>
        {children}
      </Box>
    </Container>
  )
}

export default Blog
