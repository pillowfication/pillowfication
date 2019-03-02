import React, { Component } from 'react'
import debounce from 'lodash/debounce'

import Section from '../Section.jsx'
import GridExample from './GridExample.jsx'
import CellExample from './CellExample.jsx'
import InterpolationExample from './InterpolationExample.jsx'
import OctaveExample from './OctaveExample.jsx'
import $ from '../Math.jsx'

const DEBOUNCE_LIMIT = 100

class TheAlgorithm extends Component {
  constructor (props) {
    super(props)

    this.state = { width: 0 }

    this.container = React.createRef()
    this.onWindowResize = debounce(this.onWindowResize.bind(this), DEBOUNCE_LIMIT)
  }

  componentDidMount () {
    window.addEventListener('resize', this.onWindowResize)
    this.onWindowResize()
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.onWindowResize)
  }

  onWindowResize () {
    this.setState({ width: this.container.current.offsetWidth })
  }

  render () {
    const { width } = this.state

    return (
      <Section title='The Algorithm'>
        <div ref={this.container}>
          <p>
            First, a unit gradient vector is assigned to every lattice point. To get a random vector in <$ $='\mathbb{R}^n' />, each coordinate of the vector is randomly selected from a normal distribution. Thus the probability of any point <$ $='x' /> being selected is equal to
          </p>
          <$ $$={`
            P(x)
            = \\prod_{i=1}^n \\frac{1}{\\sqrt{2\\pi}}\\,\\exp\\left(-\\frac{x_i^2}{2}\\right)
            = k\\cdot\\exp\\left(-\\sum_{i=1}^n x_i^2\\right).
          `} />
          <p>
            This probability is only dependent on the magnitude of <$ $='x' />. All that’s left is to normalize the vector. Another option is to uniformly sample each component of <$ $='x' /> from <$ $='[-1, 1]' /> until you get a vector whose magnitude is less than or equal to <$ $='1' />. But the probability of sucess approaches <$ $='0' /> as the number of dimensions increases.
          </p>
          <GridExample width={width} />
          <br />
          <p>
            To find the value of a point, find the cell it lies in. For each corner of the cell, let the distance vector be the vector from the corner to the point. Compute the value of the corner by taking the dot product of the distance vector with the gradient vector at that corner. These are called <b>influence values</b>.
          </p>
          <CellExample width={width} />
          <br />
          <p>
            In the case of <a href='https://en.wikipedia.org/wiki/Value_noise'>value noise</a>, the influence value at each corner is a random value that is constant for all points inside the cell. Finally, to get the value for a point, interpolate between the <$ $='2^n' /> influence values.
          </p>
          <p>
            An interpolation function between two values <$ $='a' /> and <$ $='b' /> takes in a parameter <$ $='0 \leq t \leq 1' /> and returns a value in <$ $='[a, b]' />. This can be formulated as
          </p>
          <$ $$={`
            \\begin{align}
              \\operatorname{interpolate}(a, b, t)
              &= (1 - \\varphi(t)) \\cdot a + \\varphi(t) \\cdot b\\\\
              &= \\varphi(t) \\cdot (b - a) + a
            \\end{align}
          `} />
          <p>
            where <$ $='\varphi(t)' /> is any function <$ $='\varphi : [0, 1] \to [0, 1]' />. Ken Perlin used the function <$ $='\varphi(t) = 6t^5 - 15t^4 + 10t^3' /> which has both first and second derivative equal to <$ $='0' /> at <$ $='t = 0, 1' />. With a <$ $='1' />-dimensional interpolation function chosen, an <$ $='n' />-dimensional interpolation function can be constructed by repeatedly interpolating along each dimension.
          </p>
          <InterpolationExample width={width} />
          <br />
          <p>
            This completes the construction for one <b>octave</b> of Perlin noise. Next, the octave is scaled down by a factor of <$ $='2' /> and added to itself repeatedly. The effect is visualized here with 1D value noise:
          </p>
          <OctaveExample width={width} />
          <br />
          <p>
            The range of the first octave is <$ $='[-\sqrt{n}/2, \sqrt{n}/2]' /> as is shown <a href='http://digitalfreepen.com/2017/06/20/range-perlin-noise.html'>here</a> (although this can depend on the interpolation function used). Thus the radius of the final Perlin noise function with <$ $='\theta' /> octaves is
          </p>
          <$ $$={`
            \\sum_{i=1}^\\theta \\frac{1}{2^{i-1}} \\cdot \\frac{\\sqrt{n}}{2}
            = \\sqrt{n} \\left( 1 - \\frac{1}{2^\\theta} \\right).
          `} />
        </div>
      </Section>
    )
  }
}

export default TheAlgorithm
