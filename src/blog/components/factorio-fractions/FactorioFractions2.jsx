import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { registerBlog } from '../Blog.jsx'
import AllFractions from './AllFractions.jsx'

import $ from '../../../shared/Math.jsx'
import Graph from './Graph.jsx'
import Simulator from './simulator/Simulator.jsx'
import p from './simulator/Path'

const BS = 40 // Grid size in pixels.

class FactorioFractions2 extends Component {
  render () {
    return (
      <>
        <Link to='factorio-fractions'>This article is a continuation of Part 1.</Link>
        <hr />

        <h2>More Efficient Systems</h2>
        <p>The method described previously to create all fractions does not always result in a system with the fewest splitters possible. The fraction <$ $='\frac{4}{9} = 0.\overline{011100}' /> would use 6 splitters, but only 4 are needed.</p>
        <Simulator blueprint={'\
          I90>>S> >>>>S> >>O> \n\
          _  _>  S>O>>  S>>O> \n\
          _  _^ _  v_^ _  v__ \n\
          _  _^ < <<_^ < <<__ '}
        />
        <p>To figure out the fewest numbers of splitters needed for common fractions, I searched for all possible fractions made with <$ $='n=2,3,4,\ldots' /> splitters. With <$ $='n=2' /> splitters, I found that the fractions <$ $='\frac01,\frac11,\frac12,\frac13,\frac23,\frac14,\frac34' /> are possible.</p>
        <hr />

        <h2>Analyzing a System 2</h2>
        <p>There is also a general way to exactly determine which fractions a system will output.</p>
        <Simulator blueprint={'\
          _   __ _S> > > > v _ __ \n\
          I100>>S>   v _S> > > O> \n\
          _   _>   > >S>  S> > O> \n\
          _   _^ _ _ _   v   v __ \n\
          _   _^ < < < < < < < __ '}
        />
        <p>Each splitter and input/output node is named, so that the system can be represented as a graph.</p>
        <Simulator
          bare blueprint={'\
          _ __ _S> > > > v _ __ \n\
          I0>>S>   v _S> > > O> \n\
          _ _>   > >S>  S> > O> \n\
          _ _^ _ _ _   v   v __ \n\
          _ _^ < < < < < < < __ '}
        >
          <text x={0.37 * BS} y={1.75 * BS} style={{ fontFamily: 'Times New Roman', fontSize: 0.8 * BS + 'px' }}>I</text>
          <text x={2.9 * BS} y={2.3 * BS} style={{ fontFamily: 'Times New Roman', fontSize: BS + 'px' }}>A</text>
          <text x={3.9 * BS} y={1.3 * BS} style={{ fontFamily: 'Times New Roman', fontSize: BS + 'px' }}>B</text>
          <text x={5.9 * BS} y={3.3 * BS} style={{ fontFamily: 'Times New Roman', fontSize: BS + 'px' }}>C</text>
          <text x={6.9 * BS} y={2.3 * BS} style={{ fontFamily: 'Times New Roman', fontSize: BS + 'px' }}>D</text>
          <text x={7.9 * BS} y={3.3 * BS} style={{ fontFamily: 'Times New Roman', fontSize: BS + 'px' }}>E</text>
          <text x={11 * BS} y={1.75 * BS} style={{ fontFamily: 'Times New Roman', fontSize: 0.8 * BS + 'px' }}>O1</text>
          <text x={11 * BS} y={2.75 * BS} style={{ fontFamily: 'Times New Roman', fontSize: 0.8 * BS + 'px' }}>O2</text>
        </Simulator>
        <Graph
          width={480}
          height={200}
          data={{
            nodes: [
              { name: 'I', x: 30, y: 100 },
              { name: 'A', x: 130, y: 100 },
              { name: 'B', x: 220, y: 30 },
              { name: 'C', x: 220, y: 170 },
              { name: 'D', x: 280, y: 80 },
              { name: 'E', x: 360, y: 140 },
              { name: 'O1', x: 450, y: 60 },
              { name: 'O2', x: 450, y: 140 }
            ],
            edges: [
              { from: 'I', to: 'A' },
              { from: 'A', to: 'B' }, { from: 'A', to: 'C', offset: true },
              { from: 'B', to: 'C' }, { from: 'B', to: 'O1' },
              { from: 'C', to: 'A', offset: true }, { from: 'C', to: 'D' },
              { from: 'D', to: 'E' }, { from: 'D', to: 'O1' },
              { from: 'E', to: 'A' }, { from: 'E', to: 'O2' }
            ]
          }}
        >
          <text x={69} y={95} style={{ fontFamily: 'Times New Roman', fontSize: '28px' }}>i</text>
          <text x={152} y={70} style={{ fontFamily: 'Times New Roman', fontSize: '28px' }}>a</text>
          <text x={151} y={147} style={{ fontFamily: 'Times New Roman', fontSize: '28px' }}>a</text>
          <text x={203} y={84} style={{ fontFamily: 'Times New Roman', fontSize: '28px' }}>b</text>
          <text x={260} y={31} style={{ fontFamily: 'Times New Roman', fontSize: '28px' }}>b</text>
          <text x={190} y={140} style={{ fontFamily: 'Times New Roman', fontSize: '28px' }}>c</text>
          <text x={244} y={150} style={{ fontFamily: 'Times New Roman', fontSize: '28px' }}>c</text>
          <text x={311} y={71} style={{ fontFamily: 'Times New Roman', fontSize: '28px' }}>d</text>
          <text x={311} y={102} style={{ fontFamily: 'Times New Roman', fontSize: '28px' }}>d</text>
          <text x={302} y={149} style={{ fontFamily: 'Times New Roman', fontSize: '28px' }}>e</text>
          <text x={390} y={135} style={{ fontFamily: 'Times New Roman', fontSize: '30px' }}>e</text>
        </Graph>
        <p>A directed edge represents one splitter feeding into another. Every splitter node has exactly two arrows coming out of it. Since the two outputs of a splitter are equal, they are both labelled the same. The input node <$ $='\text{I}' /> only feeds into one splitter, and by assumption, it inputs a <$ $='1' /> into the system.</p>
        <$ $$='i = 1' />
        <p>For every splitter, the inputs must equal the outputs.</p>
        <$ $$='\begin{align}i + c + e &= 2a\\a &= 2b\\a + b &= 2c\\c &= 2d\\d &= 2e\end{align}' />
        <p>With <$ $='6' /> unknowns and <$ $='6' /> equations, the system can be solved to determine the throughput of every edge.</p>
        <$ $$={'\
          \\begin{pmatrix} \
            1 &&&&& \\\\\
            1 & -2 && 1 && 1 \\\\\
            & 1 & -2 &&& \\\\\
            & 1 & 1 & -2 && \\\\\
            &&& 1 & -2 & \\\\\
            &&&& 1 & -2 \
          \\end{pmatrix} \
          \\begin{pmatrix} \
            i\\\\a\\\\b\\\\c\\\\d\\\\e \
          \\end{pmatrix} \
          = \
          \\begin{pmatrix} \
            1\\\\0\\\\0\\\\0\\\\0\\\\0 \
          \\end{pmatrix} \
          \\implies \\begin{align} \
            i &= 1\\\\a &= 16/17\\\\b &= 8/17\\\\c &= 12/17\\\\d &= 6/17\\\\e &= 3/17 \
          \\end{align} '}
        />
        <p>This system outputs the fractions <$ $='\text{O1} = b+d = \frac{14}{17}' /> and <$ $='\text{O2} = e = \frac{3}{17}' />.</p>
        <hr />

        <h2>Iterating Over All Systems</h2>
        <p>In the previous system, the 2nd column of the matrix indicates that the <$ $='\text{A}' /> splitter feeds into <$ $='\text{B}' /> and <$ $='\text{C}' /> splitters. The 5th column indicates that the <$ $='\text{E}' /> splitter feeds only into the <$ $='\text{A}' /> splitter, so its other output exists the system. It is also possible for a splitter to not feed into any other splitters.</p>
        <$ $$={'\
          \\begin{pmatrix}0\\\\-2\\\\1\\\\1\\\\0\\\\0\\end{pmatrix} \
          \\begin{matrix}\\phantom{0}\\\\\\leftarrow\\text{A splitter}\\\\\\rightarrow\\text{B splitter}\\\\\\rightarrow\\text{C splitter}\\\\\\phantom{0}\\\\\\phantom{0}\\end{matrix} \
          \\qquad \
          \\begin{pmatrix}0\\\\1\\\\0\\\\0\\\\0\\\\-2\\end{pmatrix} \
          \\begin{matrix}\\phantom{0}\\\\\\rightarrow\\text{A splitter}\\\\\\phantom{0}\\\\\\phantom{0}\\\\\\phantom{0}\\\\\\leftarrow\\text{E splitter}\\end{matrix} '}
        />
        <p>The 1st column and the 1st row are always the same, and there is always a <$ $='-2' /> along the diagonal for the rest of the matrix. But in each column, a <$ $='1' /> can appear up to <$ $='2' /> times anywhere else (except the 1st row). For simplicity, I added the restriction that a splitter must feed into at least <$ $='1' /> other splitter. Therefore for a system of <$ $='n' /> splitters, there are <$ $='[(n^2-n)/2]^n' /> such matrices. It is also not necessary to ensure that the resulting graph is planar because of underground belts.</p>
        <p>But not all matrices represent valid systems. Here’s one such matrix for <$ $='n=4' /> splitters.</p>
        <$ $$={'\
          \\begin{pmatrix} \
            1 &&&& \\\\\
            1 & -2 & 1 & 1 & 1 \\\\\
            & 1 & -2 & 1 & \\\\\
            & 1 & 1 & -2 & \\\\\
            &&&& -2 \\\\\
          \\end{pmatrix} \
          \\begin{pmatrix} \
            i\\\\a\\\\b\\\\c\\\\d \
          \\end{pmatrix} \
          = \
          \\begin{pmatrix} \
            1\\\\0\\\\0\\\\0\\\\0 \
          \\end{pmatrix} '}
        />
        <Graph
          width={440}
          height={200}
          data={{
            nodes: [
              { name: 'I', x: 30, y: 100 },
              { name: 'A', x: 130, y: 100 },
              { name: 'B', x: 220, y: 30 },
              { name: 'C', x: 220, y: 170 },
              { name: 'D', x: 310, y: 100 },
              { name: 'O', x: 410, y: 100 }
            ],
            edges: [
              { from: 'I', to: 'A' },
              { from: 'A', to: 'B', offset: true }, { from: 'A', to: 'C', offset: true },
              { from: 'B', to: 'A', offset: true }, { from: 'B', to: 'C', offset: true },
              { from: 'C', to: 'A', offset: true }, { from: 'C', to: 'B', offset: true },
              { from: 'D', to: 'A' }, { from: 'D', to: 'O' }
            ]
          }}
        />
        <p>The <$ $='\text{D}' /> splitter has no inputs, so this system is not valid. Fortunately, these matrices are also not invertible.</p>
        <p>In the first matrix, the edges <$ $='b' />, <$ $='d' />, <$ $='e' /> represented edges that exited the system.</p>
        <$ $$={'\
          \\begin{pmatrix} \
            1 &&&&& \\\\\
            1 & -2 && 1 && 1 \\\\\
            & 1 & -2 &&& \\\\\
            & 1 & 1 & -2 && \\\\\
            &&& 1 & -2 & \\\\\
            &&&& 1 & -2 \
          \\end{pmatrix} \
          \\begin{pmatrix} \
            i\\\\a\\\\b\\\\c\\\\d\\\\e \
          \\end{pmatrix} \
          = \
          \\begin{pmatrix} \
            1\\\\0\\\\0\\\\0\\\\0\\\\0 \
          \\end{pmatrix} \
          \\implies \\begin{align} \
            b &= 8/17\\\\d &= 6/17\\\\e &= 3/17 \
          \\end{align} '}
        />
        <p>In the graph that this matrix was derived from, <$ $='b' /> and <$ $='d' /> went into the same output, but this information is lost in the matrix. For consistency, it is assumed that when a splitter feeds into an output node, it feeds into its own distinct output node. So this matrix would represent the system</p>
        <Graph
          width={480}
          height={200}
          data={{
            nodes: [
              { name: 'I', x: 30, y: 100 },
              { name: 'A', x: 130, y: 100 },
              { name: 'B', x: 220, y: 30 },
              { name: 'C', x: 220, y: 170 },
              { name: 'D', x: 280, y: 80 },
              { name: 'E', x: 360, y: 150 },
              { name: 'O1', x: 450, y: 30 },
              { name: 'O2', x: 450, y: 100 },
              { name: 'O3', x: 450, y: 170 }
            ],
            edges: [
              { from: 'I', to: 'A' },
              { from: 'A', to: 'B' }, { from: 'A', to: 'C', offset: true },
              { from: 'B', to: 'C' }, { from: 'B', to: 'O1' },
              { from: 'C', to: 'A', offset: true }, { from: 'C', to: 'D' },
              { from: 'D', to: 'E' }, { from: 'D', to: 'O2' },
              { from: 'E', to: 'A' }, { from: 'E', to: 'O3' }
            ]
          }}
        />
        <p>The possible outputs of this system are then all combinations of the outputs <$ $='b' />, <$ $='d' />, <$ $='e' />.</p>
        <$ $$={' \
          \\begin{align} \
            b &= 8/17 \\\\\
            d &= 6/17 \\\\\
            e &= 3/17 \\\\\
            b + d &= 14/17 \\\\\
            b + e &= 11/17 \\\\\
            d + e &= 9/17 \\\\\
            b + d + e &= 1/1 \
          \\end{align} '}
        />
        <hr />

        <h2>Results</h2>
        <p>I let my computer calculate all possible fractions for systems of up to <$ $='n=6' /> splitters. It appears that a system of <$ $='n' /> splitters can always produce the fraction <$ $='\frac{p}{q}' /> where <$ $='0 \leq p \leq q \leq 2^n' />, although I was unable to prove this. If multiple systems solve a certain fraction, the system with the smallest maximum number of edges going into any one node is preferred.</p>
        <AllFractions />
      </>
    )
  }
}

export default registerBlog(FactorioFractions2, '2019/10/05', 'Factorio Fractions 2')
