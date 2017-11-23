import React, { PureComponent } from 'react'
import classnames from 'classnames'

import Page from '../Page.jsx'
import Code from '../Code.jsx'
import Playground from './Playground.jsx'
import $ from '../Math.jsx'
import zf from '../../foundation.scss'
import styles from './PerfectCuboid.scss'

const lineStyle = {
  black: { stroke: '#000', strokeWidth: 2, strokeLinecap: 'round' },
  gray: { stroke: '#aaa', strokeWidth: 2, strokeLinecap: 'round' },
  blackDash: { stroke: '#000', strokeDasharray: '5,8', strokeWidth: 2, strokeLinecap: 'round' },
  grayDash: { stroke: '#aaa', strokeDasharray: '5,8', strokeWidth: 2, strokeLinecap: 'round' }
}

class PerfectCuboid extends PureComponent {
  render () {
    return (
      <Page title='Perfect Cuboid'>
        <div className={zf.row}>
          <div className={classnames(zf.columns, zf.small12)}>
            <p>Also a known as a perfect Euler brick or a perfect box, a <a href='https://en.wikipedia.org/wiki/Euler_brick#Perfect_cuboid'>perfect cuboid</a> is a cuboid where all distances between vertices are integers. Existence of a perfect cuboid is an unsolved problem in mathematics.</p>
            <div className={classnames(styles.diagramContainer, zf.tableScroll)}>
              <div>
                <svg className={styles.diagram}>
                  <line x1='320' y1='20' x2='320' y2='160' style={lineStyle.gray} />
                  <line x1='420' y1='240' x2='320' y2='160' style={lineStyle.gray} />
                  <line x1='320' y1='160' x2='20' y2='160' style={lineStyle.gray} />
                  <line x1='120' y1='240' x2='320' y2='20' style={lineStyle.grayDash} />
                  <line x1='20' y1='20' x2='120' y2='100' style={lineStyle.black} />
                  <line x1='120' y1='100' x2='420' y2='100' style={lineStyle.black} />
                  <line x1='420' y1='100' x2='320' y2='20' style={lineStyle.black} />
                  <line x1='320' y1='20' x2='20' y2='20' style={lineStyle.black} />
                  <line x1='20' y1='20' x2='20' y2='160' style={lineStyle.black} />
                  <line x1='120' y1='100' x2='120' y2='240' style={lineStyle.black} />
                  <line x1='420' y1='100' x2='420' y2='240' style={lineStyle.black} />
                  <line x1='20' y1='160' x2='120' y2='240' style={lineStyle.black} />
                  <line x1='120' y1='240' x2='420' y2='240' style={lineStyle.black} />
                  <line x1='20' y1='20' x2='120' y2='240' style={lineStyle.blackDash} />
                  <line x1='120' y1='240' x2='420' y2='100' style={lineStyle.blackDash} />
                  <line x1='420' y1='100' x2='20' y2='20' style={lineStyle.blackDash} />
                </svg>
                <div className={styles.labels}>
                  <div style={{ left: '0px', top: '80px' }}>\(a\)</div>
                  <div style={{ left: '50px', top: '198px' }}>\(b\)</div>
                  <div style={{ left: '260px', top: '242px' }}>\(c\)</div>
                  <div style={{ left: '70px', top: '100px' }}>\(d\)</div>
                  <div style={{ left: '140px', top: '44px' }}>\(e\)</div>
                  <div style={{ left: '240px', top: '184px' }}>\(f\)</div>
                  <div style={{ left: '190px', top: '124px' }}>\(g\)</div>
                </div>
                <$ $$={`
                  \\begin{align}
                    a^2 + b^2 &= d^2\\\\
                    a^2 + c^2 &= e^2\\\\
                    b^2 + c^2 &= f^2\\\\
                    a^2 + f^2 = b^2 + e^2 = c^2 + d^2 &= g^2
                  \\end{align}
                  \\quad
                  \\text{where $a, b, c, d, e, f, g \\in \\mathbb{Z}^+$}
                `} />
              </div>
            </div>
            <p>There are six <a href='https://en.wikipedia.org/wiki/Pythagorean_triple'>Pythagorean triples</a> to satisfy. I tried to test which kinds of triples are possible using modular arithmetic. Triples were categorized by their divisibility:</p>
            <$ $$={`
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
            `} />
            <p>For example, if <$ $='(a, b, d)' /> is <$ $='\times 5' /> and <$ $='(b, c, f)' /> is <$ $='\times 3' />, then <$ $='f' /> cannot be divisible by <$ $='5' /> and <$ $='(a, f, g)' /> cannot be <$ $='\times 5' />.</p>
            <p>With <$ $='6' /> triples and <$ $='12' /> kinds each, I created a program to check each of the <$ $='12^6 = 2{,}985{,}984' /> cases. During a check, a knowledge table would keep track of each length’s divisibility by <$ $='2' />, <$ $='3' />, <$ $='4' />, and <$ $='5' />. A list of possible proof steps was created for the program to use to update the knowledge table. For a triple <$ $='(x, y, z)' /> that was <$ $='\times 2, 3' />, possible proof steps looked like</p>
            <Code lang='javascript' $={`
'x2 x3': [
  { if: [ y.d4 ], then: x.not.d4 },
  { if: [ x.not.d5, y.not.d5 ], then: z.d5 },
  // ...
]
            `} />
            <p>The program would keep updating the knowledge table until no new facts were available, or if a contradiction was reached.</p>
            <p>To speed up checking, some extra considerations were made. Due to symmetries of a cuboid (<$ $='6' /> with the permutations of <$ $='a, b, c' />), certain cases could be identical to each other. The case with the smallest identifier was used as the representative for each group of identical cases. In addition, some cases could not represent a primitive cuboid, and those cases were disregarded.</p>
          </div>
        </div>
        <hr />
        <Playground />
      </Page>
    )
  }
}

export default PerfectCuboid
