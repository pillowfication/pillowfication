import React, { Component } from 'react'

import { registerBlog } from '../Blog.jsx'
import Footnotes from '../../../shared/Footnotes.jsx'
import $ from '../../../shared/Math.jsx'
import Figure from '../Figure.jsx'
import _2DSimplexGrid from './images/2D-simplex-grid.png'
import gradientSummation from './images/gradient-summation.png'
import interpolationSimplex05 from './images/interpolation-simplex-05.png'
import interpolationSimplex06 from './images/interpolation-simplex-06.png'
import interpolationBaryLinear from './images/interpolation-bary-linear.png'
import interpolationBaryPerlin from './images/interpolation-bary-perlin.png'
import triangulationRandom from './images/triangulation-random.png'
import triangulationRandomNoise from './images/triangulation-random-noise.png'

import zf from '../../../foundation.scss'

class GeneralizedSimplexNoise extends Component {
  render () {
    const { createReference, createFootnotes } = new Footnotes()

    return (
      <>
        <h2>Simplex Noise</h2>
        <p>
          Simplex noise is an improvement over <a href='/github/pf-perlin'>Perlin noise</a>.
        </p>
        <p>
          Instead of partitioning space into hypercubes, space is partitioned into simplices which are derived from squashed hypercubes.{createReference('smp')}
        </p>
        <Figure>
          <Figure.Image src={_2DSimplexGrid} />
          <Figure.Caption>
            A 2D simplex grid of triangles obtained by scaling along the main diagonal.{createReference('skw')}<br />Figure from <a href='http://staffwww.itn.liu.se/~stegu/simplexnoise/simplexnoise.pdf'>“Simplex noise demystified”</a>.
          </Figure.Caption>
        </Figure>
        <p>
          In <$ $='n' /> dimensions, this requires interpolating <$ $='n + 1' /> gradients, and brings the complexity down to <$ $='O(n^2)' /> from <$ $='O(n2^n)' />.
        </p>
        <p>
          Interpolation is performed by summing up all the surrounding gradients weighted by a function of their distance. This function must reach zero before it reaches the next simplex.{createReference('krn')}
        </p>
        <Figure>
          <Figure.Image src={gradientSummation} />
          <Figure.Caption>
            Each gradient has a spherical kernel that influences only neighboring simplices.<br />Figure from <a href='http://staffwww.itn.liu.se/~stegu/simplexnoise/simplexnoise.pdf'>“Simplex noise demystified”</a>.
          </Figure.Caption>
        </Figure>
        <h3>Notes</h3>
        {createFootnotes({
          smp: (
            <p>
              In 2D the simplices are regular, whereas in higher dimensions they are not.
            </p>
          ),
          skw: (
            <>
              <p>
                Each coordinate of a point <$ $='x' /> is skewed according to
              </p>
              <$ $$={'x_i\' = x_i - \\left(\\sum_{j=1}^n x_j\\right) \\cdot \\frac{1 - 1/\\sqrt{n+1}}{n}'} />
              <p>
                so that the distances from the origin to <$ $='(1, 1, \ldots, 1)' /> and <$ $='(1, 0, \ldots, 0)' /> are equal to <$ $='\sqrt{n/(n+1)}' />.
              </p>
            </>
          ),
          krn: (
            <p>
              The original implementation uses the attenuation function <$ $='t = 8 \cdot (\operatorname{max}\{r^2 - d^2, 0\})^4' /> where <$ $='r^2 = 0.6' /> and <$ $='d^2' /> is the distance. This function is <$ $='0' /> for <$ $='d \geq r' />. This function is also not continuous, but can be made continuous by letting <$ $='r^2 = 0.5' />.
            </p>
          )
        })}
        <hr />
        <h2>Generalizing Interpolation</h2>
        <p>
          The kernels used in simplex noise are not densely packed enough for simplex noise to be useful in higher dimensions. Increasing the value of <$ $='r^2' /> would make the noise noticeably discontinuous, and decreasing it makes the noise equal to <$ $='0' /> for large portions of space. For higher dimensions, it is difficult to find a good balance. In order to fix this issue, a different method of interpolation must be used.
        </p>
        <div className={`${zf.gridX} ${zf.gridPaddingX}`}>
          <div className={`${zf.cell} ${zf.medium6}`}>
            <Figure>
              <Figure.Image src={interpolationSimplex05} />
              <Figure.Caption>
                Kernels of simplex noise with <$ $='r^2 = 0.5' />.
              </Figure.Caption>
            </Figure>
          </div>
          <div className={`${zf.cell} ${zf.medium6}`}>
            <Figure>
              <Figure.Image src={interpolationSimplex06} />
              <Figure.Caption>
                Kernels of simplex noise with <$ $='r^2 = 0.6' />.
              </Figure.Caption>
            </Figure>
          </div>
        </div>
        <p>
          A point is still only influenced by the gradients of the simplex it is contained in. Each gradient contributes some amount <$ $='0 \leq \lambda_i \leq 1' /> to the value. In simplex noise, this weight is a function of the distance bewteen the point and the gradient, but this function can be anything. For example, let the weight <$ $='\lambda_i' /> be <$ $='\varphi(t_i)' /> where <$ $='t_i' /> is the corresponding <a href='https://en.wikipedia.org/wiki/Barycentric_coordinate_system'>absolute barycentric coordinate</a> of the point in its simplex, and <$ $='\varphi : [0, 1] \to [0, 1]' /> is some function.
        </p>
        <div className={`${zf.gridX} ${zf.gridPaddingX}`}>
          <div className={`${zf.cell} ${zf.medium6}`}>
            <Figure>
              <Figure.Image src={interpolationBaryLinear} />
              <Figure.Caption>
                Attenuation according to barycentric coordinates with <$ $='\varphi(t) = t' />.
              </Figure.Caption>
            </Figure>
          </div>
          <div className={`${zf.cell} ${zf.medium6}`}>
            <Figure>
              <Figure.Image src={interpolationBaryPerlin} />
              <Figure.Caption>
                Attenuation according to barycentric coordinates with <$ $='\varphi(t) = 6t^5 - 15t^4 + 10t^3' />.
              </Figure.Caption>
            </Figure>
          </div>
        </div>
        <p>
          The influence for a gradient <$ $='g' /> denoted <$ $='I_g : \mathbb{R}^n \to [0, 1]' /> in this case is not a smooth mapping, so the resulting noise would not be smooth. It can be made smooth, by creating a new function <$ $={'I_g\''} />, where <$ $={'I_g\'(x)'} /> is equal to the average of all <$ $='I_g' /> in a spherical neighborhood around <$ $='x' />. In one dimension, this is the function
        </p>
        <$ $$={'I_g\'(x) = \\frac{1}{2r} \\int_{x-r}^{x+r} I_g(t)\\,dt'} />
        <p>
          where <$ $='r' /> is the radius of the neighborhood. Larger values of <$ $='r' /> result in more smoothing.
        </p>
        <div className={`${zf.gridX} ${zf.gridPaddingX}`}>
          <div className={`${zf.cell} ${zf.medium6}`}>
            <Figure>
              <Figure.Image src={interpolationSimplex05} />
              <Figure.Caption>
                Smoothing <$ $='\varphi(t) = 6t^5 - 15t^4 + 10t^3' /> with <$ $='r = 1' />.
              </Figure.Caption>
            </Figure>
          </div>
          <div className={`${zf.cell} ${zf.medium6}`}>
            <Figure>
              <Figure.Image src={interpolationSimplex06} />
              <Figure.Caption>
                Smoothing <$ $='\varphi(t) = 6t^5 - 15t^4 + 10t^3' /> with <$ $='r = 2' />.
              </Figure.Caption>
            </Figure>
          </div>
        </div>
        <hr />
        <h2>Changing Triangulation</h2>
        <p>
          The simplices used do not have to come from squashed hypercubes. Any triangulation of the space can be used. The method of interpolation described above will still work, and will still be continuous and smooth.
        </p>
        <div className={`${zf.gridX} ${zf.gridPaddingX}`}>
          <div className={`${zf.cell} ${zf.medium6}`}>
            <Figure>
              <Figure.Image src={triangulationRandom} />
              <Figure.Caption>
                Points are randomly placed with the Delaunay triangulation used. Interpolation with <$ $='\varphi(\lambda_i) = 6\lambda_i^5 - 15\lambda_i^4 + 10\lambda_i^3' /> is shown.
              </Figure.Caption>
            </Figure>
          </div>
          <div className={`${zf.cell} ${zf.medium6}`}>
            <Figure>
              <Figure.Image src={triangulationRandomNoise} />
              <Figure.Caption>
                Gradients are assigned to each vertex and interpolated as in simplex noise.
              </Figure.Caption>
            </Figure>
          </div>
        </div>
        <p>
          The range of the noise function is dependent on the size of the triangles in relation to the size of the gradient vectors. To produce consistent noise, the points and triangles used should be somewhat regular.
        </p>
      </>
    )
  }
}

export default registerBlog(GeneralizedSimplexNoise, '??????', 'Generalized Simplex Noise')
