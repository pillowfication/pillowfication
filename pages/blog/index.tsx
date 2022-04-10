import React from 'react'
import { styled } from '@mui/system'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Link from '../../src/Link'
import Section from '../../src/blog/Section'

const DateSpan = styled('span')({
  fontVariantNumeric: 'tabular-nums'
})

const Index = (): React.ReactElement => {
  return (
    <Container maxWidth='md'>
      <Box component='section' mt={4}>
        <Typography variant='h1' gutterBottom>Blog</Typography>
        <Typography paragraph>Miscellanea derived from mathematics, programming, and games.</Typography>
      </Box>
      <Section>
        <ul>
          {[{
            title: 'Spot It!',
            date: '2020/12/25',
            url: '/blog/spot-it'
          }, {
            title: 'Hangman',
            date: '2020/01/20',
            url: '/blog/hangman'
          }, {
            title: 'Factorio Fractions',
            date: '2019/10/05',
            url: '/blog/factorio-fractions'
          }, {
            title: 'Gödel’s Incompleteness Theorems',
            date: '2019/03/12',
            url: '/blog/godels-incompleteness-theorems'
          }, {
            title: 'Swap Sorting',
            date: '2018/09/02',
            url: '/blog/swap-sorting'
          }, {
            title: 'SCSS in a Nutshell',
            date: '2015/07/20',
            url: '/blog/scss-in-a-nutshell'
          }, {
            title: 'Perfect Cuboid',
            date: '2015/04/23',
            url: '/blog/perfect-cuboid'
          }, {
            title: 'CSS in a Nutshell',
            date: '2015/03/08',
            url: '/blog/css-in-a-nutshell'
          }].map(blog => (
            <Typography key={blog.url} component='li'>
              <Link href={blog.url}>
                <DateSpan>{blog.date}</DateSpan> - {blog.title}
              </Link>
            </Typography>
          ))}
        </ul>
      </Section>
    </Container>
  )
}

export default Index
