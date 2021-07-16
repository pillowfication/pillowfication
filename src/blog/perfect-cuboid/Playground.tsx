import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Link from '../../Link'
import Section from '../Section'

const Playground = (): React.ReactElement => {
  const [id, setId] = useState(2985984 * Math.random() | 0)

  return (
    <Section title='Playground'>
      <Typography paragraph>See the old playground <Link href='http://old.pillowfication.com/projects/cuboid/'>here</Link>. All code and data are in the <Link href='https://github.com/pillowfication/perfect-cuboid'>GitHub repository</Link>.</Typography>
      <Typography paragraph>TBD</Typography>
    </Section>
  )
}

export default Playground
