import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Blog from '../../src/blog/Blog'
import Section from '../../src/blog/Section'

const AwesomeDings = (): React.ReactElement => {
  return (
    <Blog title='AwesomeDings'>
      <Section>
        <Typography paragraph>This package was created as an April Fools’ Day joke.</Typography>
        <Box textAlign='center' mb={2}>
          <img src='/images/github/awesome-dings/pull-request.png' />
        </Box>
        <Typography paragraph>I took the entire <Link href='http://fontawesome.io/'>FontAwesome</Link> package that my workplace was using, replaced it with my homemade AwesomeDings package, and proceeded to change all our icons. Elements on this page may not render correctly if you don’t have the Webdings or Wingdings fonts installed.</Typography>
      </Section>
      <Section title='Playground'>
        <Typography paragraph>TODO</Typography>
      </Section>
    </Blog>
  )
}

export default AwesomeDings
