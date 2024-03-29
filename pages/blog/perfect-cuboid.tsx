import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Blog from '../../src/blog/Blog'
import Section from '../../src/blog/Section'
import Highlight from '../../src/Highlight'
import { $, $$ } from '../../src/MathJax'
import Playground from '../../src/blog/perfect-cuboid/Playground'

const styles = {
  black: { stroke: '#000', strokeWidth: 2, strokeLinecap: 'round' as const },
  gray: { stroke: '#aaa', strokeWidth: 2, strokeLinecap: 'round' as const },
  blackDash: { stroke: '#000', strokeDasharray: '5,8', strokeWidth: 2, strokeLinecap: 'round' as const },
  grayDash: { stroke: '#aaa', strokeDasharray: '5,8', strokeWidth: 2, strokeLinecap: 'round' as const }
}

const CUBOID_WIDTH = 440
const CUBOID_HEIGHT = 260

const PerfectCuboid = (): React.ReactElement => {
  return (
    <Blog title='Perfect Cuboid' date='2015/04/23'>
      <Section>
        <Typography paragraph>Also a known as a perfect Euler brick or a perfect box, a <Link href='https://en.wikipedia.org/wiki/Euler_brick#Perfect_cuboid'>perfect cuboid</Link> is a cuboid where all distances between vertices are integers. Existence of a perfect cuboid is an unsolved problem in mathematics.</Typography>
        <Box sx={{
          maxWidth: '100%',
          overflowX: 'auto'
        }}>
          <Box sx={{
            position: 'relative',
            width: '100%',
            minWidth: CUBOID_WIDTH + 50
          }}>
            <Box component='svg' sx={{
              display: 'block',
              width: CUBOID_WIDTH,
              height: CUBOID_HEIGHT,
              margin: '0 auto'
            }}>
              <line x1='320' y1='20' x2='320' y2='160' style={styles.gray} />
              <line x1='420' y1='240' x2='320' y2='160' style={styles.gray} />
              <line x1='320' y1='160' x2='20' y2='160' style={styles.gray} />
              <line x1='120' y1='240' x2='320' y2='20' style={styles.grayDash} />
              <line x1='20' y1='20' x2='120' y2='100' style={styles.black} />
              <line x1='120' y1='100' x2='420' y2='100' style={styles.black} />
              <line x1='420' y1='100' x2='320' y2='20' style={styles.black} />
              <line x1='320' y1='20' x2='20' y2='20' style={styles.black} />
              <line x1='20' y1='20' x2='20' y2='160' style={styles.black} />
              <line x1='120' y1='100' x2='120' y2='240' style={styles.black} />
              <line x1='420' y1='100' x2='420' y2='240' style={styles.black} />
              <line x1='20' y1='160' x2='120' y2='240' style={styles.black} />
              <line x1='120' y1='240' x2='420' y2='240' style={styles.black} />
              <line x1='20' y1='20' x2='120' y2='240' style={styles.blackDash} />
              <line x1='120' y1='240' x2='420' y2='100' style={styles.blackDash} />
              <line x1='420' y1='100' x2='20' y2='20' style={styles.blackDash} />
            </Box>
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: '50%',
              width: CUBOID_WIDTH,
              height: CUBOID_HEIGHT,
              marginLeft: `${-CUBOID_WIDTH / 2}px`,
              overflow: 'visible'
            }}>
              <div style={{ position: 'absolute', left: 0, top: 80 }}>{$('a')}</div>
              <div style={{ position: 'absolute', left: 50, top: 194 }}>{$('b')}</div>
              <div style={{ position: 'absolute', left: 260, top: 236 }}>{$('c')}</div>
              <div style={{ position: 'absolute', left: 70, top: 100 }}>{$('d')}</div>
              <div style={{ position: 'absolute', left: 236, top: 178 }}>{$('e')}</div>
              <div style={{ position: 'absolute', left: 140, top: 44 }}>{$('f')}</div>
              <div style={{ position: 'absolute', left: 190, top: 122 }}>{$('g')}</div>
            </Box>
          </Box>
          {$$(`
            \\begin{align}
              a^2 + b^2 &= d^2\\\\
              a^2 + c^2 &= e^2\\\\
              b^2 + c^2 &= f^2\\\\
              a^2 + f^2 = b^2 + e^2 = c^2 + d^2 &= g^2
            \\end{align}
            \\quad
            \\text{where $a, b, c, d, e, f, g \\in \\mathbb{Z}^+$}
          `)}
        </Box>
        <Typography>There are six <Link href='https://en.wikipedia.org/wiki/Pythagorean_triple'>Pythagorean triples</Link> to satisfy. I tried to test which kinds of triples are possible using modular arithmetic. Triples were categorized by their divisibility:</Typography>
        {$$(`
          \\begin{align}
            \\times N &: \\text{not divisible by $2, 3, 5$}\\\\
            \\times 2 &: \\text{divisible by $2$ and not $3, 4, 5$}\\\\
            \\times 3 &: \\text{divisible by $3$ and not $2, 5$}\\\\
            \\times 4 &: \\text{divisible by $4$ and not $3, 5$}\\\\
            \\times 5 &: \\text{divisible by $5$ and not $2, 3$}\\\\
            \\times 2, 3 &: \\text{divisible by $2, 3$ and not $4, 5$}\\\\
            \\times 2, 5 &: \\text{divisible by $2, 5$ and not $3, 4$}\\\\
            \\times 3, 4 &: \\text{divisible by $3, 4$ and not $5$}\\\\
            \\times 3, 5 &: \\text{divisible by $3, 5$ and not $2$}\\\\
            \\times 4, 5 &: \\text{divisible by $4, 5$ and not $3$}\\\\
            \\times 2, 3, 5 &: \\text{divisible by $2, 3, 5$ and not $4$}\\\\
            \\times 3, 4, 5 &: \\text{divisible by $3, 4, 5$}
          \\end{align}
        `)}
        <Typography paragraph>For example, if {$('(a, b, d)')} is {$('\\times 5')} and {$('(b, c, f)')} is {$('\\times 3')}, then {$('f')} cannot be divisible by {$('5')} and {$('(a, f, g)')} cannot be {$('\\times 5')}.</Typography>
        <Typography paragraph>With {$('6')} triples and {$('12')} kinds each, I created a program to check each of the {$('12^6 = 2{,}985{,}984')} cases. During a check, a knowledge table would keep track of each length’s divisibility by {$('2')}, {$('3')}, {$('4')}, and {$('5')}. A list of possible proof steps was created for the program to use to update the knowledge table. For a triple {$('(x, y, z)')} that was {$('\\times 2, 3')}, possible proof steps looked like</Typography>
        <Highlight language='javascript'>
          {`
'x2 x3': [
  { if: [ y.d4 ], then: x.not.d4 },
  { if: [ x.not.d5, y.not.d5 ], then: z.d5 },
  // ...
]
          `.trim()}
        </Highlight>
        <Typography paragraph>The program would keep updating the knowledge table until no new facts were available, or if a contradiction was reached.</Typography>
        <Typography paragraph>To speed up checking, some extra considerations were made. Due to symmetries of a cuboid ({$('6')} with the permutations of {$('a, b, c')}), certain cases could be identical to each other. The case with the smallest identifier was used as the representative for each class of identical cases. In addition, some cases could not represent a primitive cuboid, and those cases were disregarded.</Typography>
        <Typography paragraph>In the future, this project can be extended to check all cases under an arbitrarily high modulus.</Typography>
      </Section>
      <Playground />
    </Blog>
  )
}

export default PerfectCuboid
