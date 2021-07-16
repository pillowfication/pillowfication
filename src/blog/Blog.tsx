import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(8)
  },
  date: {
    marginLeft: theme.spacing(4)
  }
}))

interface Props {
  title: string,
  date?: string,
  className?: string,
  children?: any
}

const Blog = ({ title, date, className, children }: Props): React.ReactElement => {
  const classes = useStyles()

  return (
    <Container maxWidth='md'>
      <Box component='article' mt={8} mb={16} className={className}>
        <Typography variant='h1' className={classes.title}>
          {title}
          {date && (
            <Typography component='span' className={classes.date}>{date}</Typography>
          )}
        </Typography>
        {children}
      </Box>
    </Container>
  )
}

export default Blog
