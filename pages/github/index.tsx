import React from 'react'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Link from '../../src/Link'
import Section from '../../src/blog/Section'

const Index = (): React.ReactElement => {
  return (
    <Container maxWidth='md'>
      <Box component='section' mt={4}>
        <Typography variant='h1' gutterBottom>Github</Typography>
        <Typography paragraph>Home of my GitHub projects.</Typography>
      </Box>
      <Section>
        <ul>
          <Typography component='li'>
            <Link href='github/awesome-dings'>
              AwesomeDings
            </Link>
          </Typography>
        </ul>
      </Section>
    </Container>
  )
}

export default Index
