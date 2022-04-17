import React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import MuiLink from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import Link from '../../src/Link'
import Section from '../../src/blog/Section'

const Index = (): React.ReactElement => {
  return (
    <Container maxWidth='md'>
      <Box component='section' mt={4}>
        <Typography variant='h1' gutterBottom>Projects</Typography>
      </Box>
      <Section>
        <Stack spacing={4}>
          <Paper sx={{ p: 4 }}>
            <Link href='/projects/awesome-dings'>
              <Typography variant='h2' gutterBottom>AwesomeDings</Typography>
            </Link>
            <Typography paragraph>AwesomeDings is a recreation of the Font Awesome package, but modified to focus on the Wingdings and Webdings icons you all know and love.</Typography>
            <Box textAlign='center' pt={2}>
              <img src='/images/projects/awesome-dings/cat_heart_bed.png' style={{ maxWidth: '100%' }} />
            </Box>
          </Paper>
          <Paper sx={{ p: 4 }}>
            <MuiLink href='https://ffxiv.pf-n.co/'>
              <Typography variant='h2' gutterBottom>Lulu’s Tools</Typography>
            </MuiLink>
            <Typography paragraph>A website full of projects pertaining Final Fantasy XIV. Most notable is an ocean fishing tracker using crowdsourced data.</Typography>
            <Box textAlign='center'>
              <img src='/images/projects/lulu-tools/lulu.png' style={{ maxWidth: '100%' }} />
            </Box>
          </Paper>
          <Paper sx={{ p: 4 }}>
            <Link href='/projects/moofuck'>
              <Typography variant='h2' gutterBottom>Moofuck</Typography>
            </Link>
            <Typography paragraph>A Brainfuck derivative full of moo.</Typography>
            <Paper variant='outlined' sx={{ p: 2, fontFamily: 'monospace' }}>
              {'>++++++++[<+++++++++>-]<.>++++[<+++++++>-]<+.+++++++..+++.>>++++++[<+++++++>-]<++.------------.>++++++[<+++++++++>-]<+.<.+++.------.--------.>>>++++[<++++++++>-]<+.'.split('').join('​')}
            </Paper>
          </Paper>
          <Paper sx={{ p: 4 }}>
            <Link href='/projects/pf-konami'>
              <Typography variant='h2' gutterBottom>pf-konami</Typography>
            </Link>
            <Typography paragraph>Use the Konami code to shower the screen in confetti.</Typography>
            <Stack
              direction='row'
              justifyContent='center'
              spacing={1}
            >
              <Avatar sx={{ color: 'black' }}><ArrowUpwardIcon /></Avatar>
              <Avatar sx={{ color: 'black' }}><ArrowUpwardIcon /></Avatar>
              <Avatar sx={{ color: 'black' }}><ArrowDownwardIcon /></Avatar>
              <Avatar sx={{ color: 'black' }}><ArrowDownwardIcon /></Avatar>
              <Avatar sx={{ color: 'black' }}><ArrowBackIcon /></Avatar>
              <Avatar sx={{ color: 'black' }}><ArrowForwardIcon /></Avatar>
              <Avatar sx={{ color: 'black' }}><ArrowBackIcon /></Avatar>
              <Avatar sx={{ color: 'black' }}><ArrowForwardIcon /></Avatar>
              <Avatar sx={{ color: 'black' }}>B</Avatar>
              <Avatar sx={{ color: 'black' }}>A</Avatar>
            </Stack>
          </Paper>
          <Paper sx={{ p: 4 }}>
            <Link href='/projects/pf-perlin'>
              <Typography variant='h2' gutterBottom>pf-perlin</Typography>
            </Link>
            <Typography paragraph>Exploring the math behind Perlin noise.</Typography>
            <svg width='100%' height={200}>
              <polyline
                points={[130.3, 136, 139.3, 145.1, 151.1, 157.4, 160.6, 155, 151.3, 154.2, 155.8, 158.7, 163.1, 164.4, 164.4, 160.6, 160.3, 165, 165.6, 163.1, 157.6, 155.9, 154.6, 149.5, 140.5, 137.7, 132, 126, 119.3, 115.1, 113.6, 112, 105, 98.7, 96.2, 94.3, 92.2, 88.3, 80.6, 72.8, 71.6, 73.6, 73.9, 73.5, 68.8, 60.4, 58.9, 63.3, 67.4, 75.4, 78.8, 81.4, 82.2, 89.1, 90.8, 91.7, 99, 105, 109.1, 110.9, 112.7, 116.6, 121.3, 128.5, 134.7, 141.2, 143.8, 144.4, 147.8, 145.3, 144.9, 141.2, 139.1, 139.4, 133.3, 123.5, 117.7, 109.1, 103.9, 103.8, 103.9, 102.2, 105, 108, 102.9, 97.3, 90.6, 88.9, 84.4, 82.9, 79.4, 75.5, 71.8, 72.2, 73.4, 74.7, 77.3, 84.1, 86.1, 88.2, 84.6, 79.4, 71.6, 66.5, 62.9, 59.2, 57.3, 55, 54.9, 48.4, 47.7, 48.9, 50.7, 52, 57, 59.2, 64.5, 67.4, 72.1, 73.4, 75, 82.1, 88.5, 91.5, 92.3, 95.1, 99.9, 102.9, 101.2, 102.1, 99, 103.6, 105, 103.8, 102, 97.7, 98.6, 95.5, 95.9, 97.2, 101.2, 110.3, 115.7, 117, 118.3, 121.5, 124.3, 122.7, 119.6, 119, 120.9, 122.9, 121.6, 119.9, 111, 104.3, 102.2, 105, 106.9, 105, 97.6, 88.5, 85.9, 82.8, 75.2, 68.7, 67.2, 64.6, 65.2, 64.7, 66.3, 72, 79.6, 77.7, 76.1, 77.2, 80.2, 79.8, 83.3, 89.6, 97, 98.7, 105, 110.7, 111.9, 116.9, 122.7, 130.4, 133.4, 140, 136, 132.9, 129.5, 126.5, 120.9, 118.2, 113.7, 114.1, 110.3, 105.5, 95.7, 96.1, 94.4, 90.4, 91, 94.8, 100.6, 105, 107.3, 112.2, 119.1, 119.1, 117.9, 116.2, 113, 107.5, 105.2, 103.5, 98.2, 92.9, 87.3, 86.3, 84.8, 81, 84.8, 85.4, 87.1, 87.4, 90.5, 97.4, 105.9, 105, 105, 104, 108.6, 111.3, 110.5, 114.9, 120, 124, 131.2, 135.2, 138.1, 145.6, 154.4, 165.8, 170, 172.2, 176.7, 175.6, 169.8, 162, 156.1, 154.7, 157.8, 160.7, 158.5, 155, 152.4, 152, 151.3, 145.7, 144.9, 138.2, 125.5, 119.9, 114.2, 107.7, 104.9, 106.3, 112.4, 116.9, 118.4, 119.9, 118.7, 116.8, 115.5, 113.7, 107.9, 105.6, 100.5, 102.8, 105, 107.4, 107.4, 101.9, 99.2, 101.6, 108.2, 112.6, 118.2, 123.5, 122.9, 121, 116.9, 114.1, 110.9, 103.4, 98.9, 94.7, 93.9, 98.3, 102.2, 101, 98.2, 98.1, 98.2, 105, 109.8, 115.7, 114.8, 111.7, 108.3, 107.4, 108, 109.3, 109.3, 111.9, 115.8, 120.5, 118.5, 118.1, 120.7, 122.2, 125.3, 125.1, 123.1, 121.7, 116.5, 111.6, 108.4, 106, 105, 103.8, 101.9, 96.8, 88.7, 85.6, 81.5, 75.3, 71.1, 68.1, 61.8, 61.8, 63.8, 66.8, 70.3, 78.4, 86, 89.8, 88.3, 94, 97.9, 94, 93.8, 93.8, 98.3, 105, 112.5, 115.4, 115.7, 113.8, 114.7, 116.4, 119.3, 125.7, 126.5, 128.4, 133.4, 142.2, 146.9, 150.9, 152.2, 155.9, 152.6, 146.7, 142.5, 135.7, 129.1, 125.1, 122.2, 115.7, 105, 96.2, 90.8, 84.1, 79.2, 82.8, 83.5, 84.2, 88, 88.6, 87.4, 82.5, 78.2, 69.5, 65.3, 65.3, 64.3, 63.9, 59.8, 54.7, 52, 48, 48.5, 50.1, 52.8, 55, 56, 57.7, 55.6, 52, 51, 53.2, 54.6, 52.9, 56, 62.6, 66.6, 71.8, 76.9, 86.1, 91.3, 92.1, 91.7, 94.8, 99.5, 105, 102.1, 99.6, 99.6, 103.4, 105, 105.5, 109, 113.4, 118.6, 121.6, 122.7, 124.6, 132.7, 134.3, 136.2, 132.2, 131.9, 137.8, 134.9, 133.7, 134.1, 138.5, 140.6, 144.7, 153.1, 156.6, 157.2, 157.6, 157.2, 155, 151.8, 152.2, 149.4, 150.9, 152.3, 153.3, 154.2, 149.5, 146.4, 143.4, 140.9, 135, 133.5, 130.8, 132.6, 129.3, 123.6, 117.8, 112.3, 111.6, 105.7, 102.8, 103.1, 104.8, 105, 103.8, 97.9, 95.8, 92.6, 88.5, 79.8, 74.3, 69.3, 67, 64.5, 64.3, 62.6, 67.1, 68.3, 73.4, 79.3, 86.4, 88.2, 93.4, 95.8, 96.6, 101.2, 103.1, 103.9, 105, 105.2, 107.4, 110.1, 110.5, 110.1, 115.1, 124.2, 132.9, 138.7, 140.2, 140.9, 141.8, 145.6, 145.6, 140.6, 138, 132.9, 131.7, 130.8, 127.6, 124.4, 119.9, 115.8, 107, 105, 104.1, 101.3, 97.3, 96.6, 92.3, 88.6, 82.1, 79.5, 76.4, 77, 78.1, 85.7, 93.6, 98, 101.1, 100.3, 103.1, 104.6, 101.2, 100.1, 100.5, 101, 104.4, 102.9, 105, 108.3, 113, 115.2, 112.5, 112.1, 109.1, 105.3, 105.5, 108.7, 111.1, 113, 117.5, 121.4, 123.3].map((value, index) => `${5 + index * 2},${value}`).join(' ')}
                stroke='#000'
                strokeWidth={2}
                fill='none'
              />
            </svg>
          </Paper>
          <Paper sx={{ p: 4 }}>
            <Link href='/projects/pf-sowpods'>
              <Typography variant='h2' gutterBottom>pf-sowpods</Typography>
            </Link>
            <Typography paragraph>A library for verifying and anagramming words with the SOWPODS dictionary.</Typography>
            <Stack direction='row' spacing={1} justifyContent='center'>
              {[
                { letter: 'P', value: 3 },
                { letter: 'I', value: 1 },
                { letter: 'L', value: 1 },
                { letter: 'L', value: 1 },
                { letter: 'O', value: 1 },
                { letter: 'W', value: 4 }
              ].map(({ letter, value }) =>
                <Box sx={{
                  display: 'flex',
                  position: 'relative',
                  width: 62,
                  height: 62,
                  border: '1px solid black',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Helvetica, sans-serif',
                  fontSize: 38
                }}>
                  <div>{letter}</div>
                  <Box sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 4,
                    fontSize: 16
                  }}>
                    {value}
                  </Box>
                </Box>
              )}
            </Stack>
          </Paper>
          <Paper sx={{ p: 4 }}>
            <Link href='/'>
              <Typography variant='h2' gutterBottom>pillowfication</Typography>
            </Link>
            <Typography paragraph>This very website.</Typography>
          </Paper>
          <Paper sx={{ p: 4 }}>
            <MuiLink href='http://old.pillowfication.com/'>
              <Typography variant='h2' gutterBottom>pillowfication-old</Typography>
            </MuiLink>
            <Typography paragraph>My very first website! Includes some games and projects of its own.</Typography>
            <Box textAlign='center' mt={4}>
              <img src='/images/projects/pillowfication-old/pillowfication.png' style={{ maxWidth: '100%' }} />
            </Box>
          </Paper>
        </Stack>
      </Section>
    </Container>
  )
}

export default Index
