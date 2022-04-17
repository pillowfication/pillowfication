import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Blog from '../../src/blog/Blog'
import Section from '../../src/blog/Section'
import Highlight from '../../src/Highlight'
import ExampleKeypress from '../../src/projects/pf-konami/ExampleKeypress'
import Confetto from '../../src/projects/pf-konami/Confetto'
import 'pf-konami'

const PFKonami = (): React.ReactElement => {
  return (
    <Blog title='pf-konami'>
      <Section>
        <Typography paragraph>This package is meant to be a little easter egg that you can safely sneak into any project. I dropped it off as a goodbye gift at work. It showers the screen in confetti whenever the <Link href='https://en.wikipedia.org/wiki/Konami_Code'>Konami Code</Link> is triggered.</Typography>
        <Typography>Try pressing:</Typography>
        <ExampleKeypress />
        <Typography paragraph>All that’s required is for the packaged to be included at least once from anywhere in the project, and it will silently do nothing if it is unable to initialize.</Typography>
        <Box mb={2}>
          <Highlight language='javascript'>{'require(\'pf-konami\')'}</Highlight>
        </Box>
        <Typography paragraph>It was intended to be tiny and non-configurable and unintrusive.</Typography>
      </Section>
      <Confetto />
    </Blog>
  )
}

export default PFKonami
