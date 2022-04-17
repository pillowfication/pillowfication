import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Blog from '../../src/blog/Blog'
import Section from '../../src/blog/Section'
import Playground from '../../src/projects/awesome-dings/Playground'
import Cheatsheet from '../../src/projects/awesome-dings/Cheatsheet'

const AwesomeDings = (): React.ReactElement => {
  return (
    <Blog title='AwesomeDings'>
      <Section>
        <Typography paragraph>This package was created as an April Fools’ Day joke.</Typography>
        <Box textAlign='center' mb={2}>
          <img src='/images/projects/awesome-dings/pull-request.png' />
        </Box>
        <Typography paragraph>I took the entire <Link href='http://fontawesome.io/'>FontAwesome</Link> package that my workplace was using, replaced it with my homemade AwesomeDings package, and proceeded to change all our icons. Elements on this page may not render correctly if you don’t have the Webdings or Wingdings fonts installed.</Typography>
      </Section>
      <Section title='Why?'>
        <ol>
          <li>
            <Typography paragraph><b>Font Awesome relies on serving external font files.</b></Typography>
            <Typography paragraph>This a <strong>major</strong> security concern that web browsers take very seriously. In fact, IE has been known to <Link href='https://github.com/FortAwesome/Font-Awesome/wiki/Troubleshooting#im-hosting-fonts-on-my-server-and-icons-dont-show-up'>consistently trouble developers</Link> whenever external fonts are mentioned, just to make sure they really know what they are doing. Additionally, the external files lengthens loading time and just offers another point of failure in your project. Don’t make life harder on yourself.</Typography>
          </li>
          <li>
            <Typography paragraph><b>Wingdings is natively supported on Windows and in IE.</b></Typography>
            <Typography paragraph>No one has Font Awesome installed natively on their computer. However, <Link href='https://en.wikipedia.org/wiki/Usage_share_of_operating_systems#Desktop_and_laptop_computers'>Windows is the most widely used operating system</Link>, and thus practically everyone has Wingdings/Webdings already installed! (Imagine developing something that magically works on IE). In fact, developers can browse the Wingdings/Webdings icons with the handy dandy <Link href='https://en.wikipedia.org/wiki/Character_Map'>Character Map</Link> application offline, without needing to constantly Google where the Font Awesome cheatsheet is.</Typography>
          </li>
          <li>
            <Typography paragraph><b>Wingdings has been around for over 25 years.</b></Typography>
            <Typography paragraph>This is proof of its stability and popularity, and the icons are all ones users and developers are very familiar with. Wingdings has been around since <Link href='https://en.wikipedia.org/wiki/Wingdings'>1990</Link>, and Webdings since <Link href='https://en.wikipedia.org/wiki/Webdings'>1997</Link>. Font Awesome on the other hand, was only conceived in 2012 and its still <strong>constantly</strong> changing. It’s terrible to rely on packages which are shaky and become outdated in weeks (I mean Font Awesome has over 4000 issues open).</Typography>
          </li>
          <li>
            <Typography paragraph><b>Wingdings lives in the ASCII block of Unicode.</b></Typography>
            <Typography paragraph>Font Awesome likes to give their icons “elite” Unicode points that no one else uses. This requires developers to use hard-to-read values like <code>\f152</code> or their human-readable but tiring-to-type and just-as-cryptic counterparts like <code>$fa-var-caret-square-o-right</code>. With Wingdings you can achieve the same effect by typing a single symbol <code>{'}'}</code>. (With minimal practice, you’ll learn that <code>{'}'}</code> is a little filled triangle pointing rightward in the Wingdings 3 font family). Wingdings will also fallback to these informative symbols, instead of the ☐☐☐☐☐☐☐☐☐☐ with Font Awesome. By not having to include these extra variable names, the AwesomeDings package ends up being almost 90% smaller than Font Awesome (and that’s not considering the font files!).</Typography>
          </li>
        </ol>
      </Section>
      <Playground />
      <Cheatsheet />
    </Blog>
  )
}

export default AwesomeDings
