import React from 'react'
import { useMeasure } from 'react-use'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Blog from '../../src/blog/Blog'
import Section from '../../src/blog/Section'
import { $, $$ } from '../../src/MathJax'
import GridExample from '../../src/projects/pf-perlin/GridExample'
import CellExample from '../../src/projects/pf-perlin/CellExample'
import InterpolationExample from '../../src/projects/pf-perlin/InterpolationExample'
import OctavesExample from '../../src/projects/pf-perlin/OctavesExample'

const PFPerlin = (): React.ReactElement => {
  const [ref, { width }] = useMeasure<HTMLDivElement>()

  return (
    <Blog title='pf-perlin'>
      <div ref={ref}>
        <Section>
          <Typography paragraph>A <Link href='https://en.wikipedia.org/wiki/Perlin_noise'>Perlin noise</Link> generator for any number of dimensions.</Typography>
        </Section>
        <Section title='The Algorithm'>
          <Typography>First, a unit gradient vector is assigned to every lattice point. (The original algorithm accomplishes this using a permutation table). To get a random vector in {$('\\mathbb{R}^n')}, each coordinate of the vector is randomly selected from a normal distribution. Thus the probability of any point {$('x')} being selected is equal to</Typography>
          {$$(`
            P(x)
            = \\prod_{i=1}^n \\frac{1}{\\sqrt{2\\pi}}\\,\\exp\\left(-\\frac{x_i^2}{2}\\right)
            = k\\cdot\\exp\\left(-\\sum_{i=1}^n x_i^2\\right).
          `.trim())}
          <Typography paragraph>This probability is only dependent on the magnitude of {$('x')}. All that’s left is to normalize the vector. Another option is to uniformly sample each component of {$('x')} from {$('[-1, 1]')} until you get a nonzero vector whose magnitude is less than or equal to {$('1')}, but the probability of success approaches {$('0')} as the number of dimensions increases.</Typography>
          <Box component='figure' mx={0} my={2} textAlign='center'>
            <GridExample width={width} />
            <figcaption>
              <Typography variant='caption'>The vectors are pictured with length {$('1/2')}.<br />You can drag the grid around.</Typography>
            </figcaption>
          </Box>
          <Typography paragraph>To find the value of a point, find the cell it lies in. For each corner of the cell, let the distance vector be the vector from the corner to the point. Compute the value of the corner by taking the dot product of the distance vector with the gradient vector at that corner. These are called <b>influence values</b>.</Typography>
          <Box component='figure' mx={0} my={2} textAlign='center'>
            <CellExample width={width} />
            <figcaption>
              <Typography variant='caption'>Distance vectors are drawn with thickness proportional to the influence value.<br />{$('\\color{blue}{\\text{Blue}}')} indicates a positive influence value, while {$('\\color{red}{\\text{Red}}')} is negative.<br />Click to randomize the gradient vectors.</Typography>
            </figcaption>
          </Box>
          <Typography paragraph>In the case of <Link href='https://en.wikipedia.org/wiki/Value_noise'>value noise</Link>, the influence value at each corner is a random value that is constant for all points inside the cell. Finally, to get the value for a point, interpolate between the {$('2^n')} influence values.</Typography>
          <Typography>An interpolation function between two values {$('a')} and {$('b')} takes in a parameter {$('0 \\leq t \\leq 1')} and returns a value in {$('[a, b]')}. This can be formulated as</Typography>
          {$$(`
            \\begin{align}
              \\operatorname{interpolate}(a, b, t)
              & = (1 - \\varphi(t)) \\cdot a + \\varphi(t) \\cdot b \\\\
              & = \\varphi(t) \\cdot (b - a) + a
            \\end{align}
          `.trim())}
          <Typography paragraph>where {$('\\varphi(t)')} is any function {$('\\varphi : [0, 1] \\to [0, 1]')}. Ken Perlin used the function {$('\\varphi(t) = 6t^5 - 15t^4 + 10t^3')} which has both first and second derivative equal to {$('0')} at {$('t = 0, 1')}. With a {$('1')}-dimensional interpolation function chosen, an {$('n')}-dimensional interpolation function can be constructed by repeatedly interpolating along each dimension.</Typography>
          <Box component='figure' mx={0} my={2} textAlign='center'>
            <InterpolationExample width={width} />
            <figcaption>
              <Typography variant='caption'>Each influence value is a constant color. Colors are linearly interpolated with {$('\\varphi(t) = t')}.<br />Interpolation occurs along the {$('x')}-axis, then the {$('y')}-axis.<br />Click to randomize the influence values.</Typography>
            </figcaption>
          </Box>
          <Typography paragraph>This completes the construction for one octave of Perlin noise. Next, the octave is scaled down by a factor of {$('2')} and added to itself repeatedly. The effect is visualized here with 1D Perlin noise:</Typography>
          <Box component='figure' mx={0} my={2} textAlign='center'>
            <OctavesExample width={width} />
            <figcaption>
              <Typography variant='caption'>You can drag the graph around.</Typography>
            </figcaption>
          </Box>
          <Typography>The range of the first octave is {$('[-\\sqrt{n}/2, \\sqrt{n}/2]')} as is shown <Link href='https://stackoverflow.com/questions/18261982/output-range-of-perlin-noise'>here</Link> (although this can depend on the interpolation function used). Thus the radius of the final Perlin noise function with {$('\\omega')} octaves is</Typography>
          {$$(`
            \\sum_{i=1}^\\omega \\frac{1}{2^{i-1}} \\cdot \\frac{\\sqrt{n}}{2}
            = \\sqrt{n} \\left( 1 - \\frac{1}{2^\\omega} \\right).
          `.trim())}
          <Typography paragraph>This allows the noise function to be mapped to the interval {$('[0, 1]')} or any desired interval.</Typography>
          <Typography paragraph>Perlin noise still contains some directional artifacts—most notably at the origin. This can be remedied by rotating each octave by some angle {$('\\theta')} such as the <Link href='https://en.wikipedia.org/wiki/Golden_ratio'>golden ratio</Link> for its high irrationality. For higher dimensions, this is addressed in <Link href='https://en.wikipedia.org/wiki/Simplex_noise'>simplex noise</Link>.</Typography>
        </Section>
      </div>
    </Blog>
  )
}

export default PFPerlin
