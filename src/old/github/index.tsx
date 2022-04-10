import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
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
          <Typography component='li'>
            <Link href='github/moofuck'>
              moofuck
            </Link>
          </Typography>
          <Typography component='li'>
            <Link href='github/pf-boggle'>
              pf-boggle
            </Link>
          </Typography>
          <Typography component='li'>
            <Link href='github/pf-konami'>
              pf-konami
            </Link>
          </Typography>
          <Typography component='li'>
            <Link href='github/pf-perlin'>
              pf-perlin
            </Link>
          </Typography>
          <Typography component='li'>
            <Link href='github/pf-sowpods'>
              pf-sowpods
            </Link>
          </Typography>
        </ul>
      </Section>
    </Container>
  )
}

export default Index
