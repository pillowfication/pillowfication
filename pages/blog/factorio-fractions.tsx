import React from 'react'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Blog from '../../src/blog/Blog'
import Section from '../../src/blog/Section'
import { $, $$ } from '../../src/MathJax'
import p from '../../src/blog/factorio-fractions/simulator/Path'
import Simulator from '../../src/blog/factorio-fractions/simulator/Simulator'
import Graph from '../../src/blog/factorio-fractions/Graph'
import AllFractions from '../../src/blog/factorio-fractions/AllFractions'

const BS = 40 // Grid size in pixels

function redSplitter (x: number, y: number): React.ReactElement {
  return (
    <>
      <rect x={(x + 0.5) * BS - 10} y={y * BS + 1} width={17} height={BS * 2 - 2} style={{ fill: '#965454' }} />
      <rect x={(x + 0.5) * BS - 8} y={y * BS + 1} width={3} height={BS * 2 - 2} style={{ fill: '#bbbbbb' }} />
      <path d={p((x + 0.5) * BS + 2, y * BS).h(8).l(5, 0.5 * BS).l(-5, 0.5 * BS).l(5, 0.5 * BS).l(-5, 0.5 * BS).h(-8).l(5, -0.5 * BS).l(-5, -0.5 * BS).l(5, -0.5 * BS).l(-5, -0.5 * BS).end()} style={{ fill: 'red' }} />
    </>
  )
}

const FactorioFractions = (): React.ReactElement => {
  return (
    <Blog title='Factorio Fractions' date='2019/10/05'>
      <Section title='Rules of the Game'>
        <Typography paragraph>The game of <Link href='https://factorio.com/'>Factorio</Link> involves the transportation of items across <b>transport belts</b>. Here, we are only interested in transporting 1 type of item using belts with unlimited throughput.</Typography>
        <Simulator blueprint={'\
          _  _ _ _ > > v _ _ _ _ __ \n\
          I20> > > ^ _ v _ > > > O> \n\
          _  _ _ _ _ _ > > ^ _ _ __ '}
        />
        <Typography paragraph>Belts are also allowed to cross over each other using <b>underground transport belts</b>.</Typography>
        <Simulator blueprint={'\
          I20> > > > > v _ _ _ _ __ \n\
          I20> > >D> _ v _U> > > O> \n\
          _  _ _ _ _ _ > > > > > O> '}
        />
        <Typography paragraph>Lastly, the <b>splitter</b> allows for splitting the items on a transport belt evenly onto 2 transport belts.</Typography>
        <Simulator blueprint={'\
          I20> > >S> > > > > > > O> \n\
          _  _ _ _   > > >S> > > O> \n\
          _  _ _ _ _ _ _ _   > > O> '}
        />
        <Typography paragraph>The splitter can receive input from two belts at once for convenience. Each side will still be split evenly onto the two output belts.</Typography>
        <Simulator blueprint={'\
          I10> > v v < < < < < < I10< \n\
          _  _ _Sv   _ _ _ _ ^ _   __ \n\
          _  _ _ v > > >S> > ^ _   __ \n\
            O< < < _ _ _   > > >   O> '}
        />
      </Section>

      <Section title='Playing Around'>
        <Typography paragraph>Using splitters, it is simple enough to create a system that splits off {$('\\frac{1}{4}')} or {$('\\frac{1}{8}')} or {$('\\frac{1}{2^n}')} of a belt’s items by passing through enough splitters. But complexity arises when there are splitters that feed into each other. In the system below, the top output ends up receiving {$('\\frac{2}{3}')} of the input, and the bottom output receives {$('\\frac{1}{3}')} of the input.</Typography>
        <Simulator blueprint={'\
          I30> > > >S> > > > > > O> \n\
          _  _ _ _ >   >S> > > > O> \n\
          _  _ _ _ ^ _ _   v _ _ __ \n\
          _  _ _ _ ^ < < < < _ _ __ '}
        />
        <Typography paragraph>This fancy spiral outputs fractions of {$('\\frac{8}{13}')} and {$('\\frac{5}{13}')}.</Typography>
        <Simulator blueprint={'\
          I130>>S> > > > > > > > > O> \n\
          _   _>  S> > > > > > > > O> \n\
          _   _^ >  S> > > > > > v __ \n\
          _   _^ ^ >  S> > > > v v __ \n\
          _   _^ ^ ^ >  S> > v v v __ \n\
          _   _^ ^ ^ ^ _   v v v v __ \n\
          _   _^ ^ ^ ^ < < < v v v __ \n\
          _   _^ ^ ^ < < < < < v v __ \n\
          _   _^ ^ < < < < < < < v __ \n\
          _   _^ < < < < < < < < < __ '}
        />
        <Typography paragraph>As it turns out in all spirals of this style, the first fraction will be the ratio of two consecutive <Link href='https://en.wikipedia.org/wiki/Fibonacci_number'>Fibonacci numbers</Link>. This will be proved in the next section.</Typography>
        <Typography paragraph>Systems of splitters can also be chained together with the effect of multiplying fractions. Since we know how to make a fraction of {$('\\frac{2}{3}')}, chaining the system twice will result in a fraction of {$('\\frac{4}{9}')}.</Typography>
        <Simulator blueprint={'\
          I90> >S> > > > >S> > > O> \n\
          _  _ >  S>O>   >  S> > O> \n\
          _  _ ^ _   v _ ^ _   v __ \n\
          _  _ ^ < < < _ ^ < < < __ '}
        />
      </Section>

      <Section title='Analyzing a System'>
        <Typography paragraph>To see which fraction an output corresponds to, I look at every path an item can take that leads to that output.</Typography>
        <Simulator
          bare blueprint={'\
          I0> > > >S> > > > > > O> \n\
          _ _ _ _ >   >S> > > > O> \n\
          _ _ _ _ ^ _ _   v _ _ __ \n\
          _ _ _ _ ^ < < < < _ _ __ '}
        >
          <path
            d={p(2 * BS, 0.2 * BS).h(9 * BS).end()}
            style={{ strokeWidth: '5px', stroke: 'red', fill: 'transparent' }}
          />
          <path
            d={p(2 * BS, 0.5 * BS).h(3 * BS).l(BS, 0.7 * BS).h(BS).l(BS, BS).a(0.8 * BS, 0.8 * BS, 1).a(-0.8 * BS, 0.8 * BS, 1).h(-3 * BS).a(-0.8 * BS, -0.8 * BS, 1).v(-BS).a(0.8 * BS, -0.8 * BS, 1).l(BS, -0.7 * BS).h(5 * BS).end()}
            style={{ strokeWidth: '5px', stroke: 'green', fill: 'transparent' }}
          />
          <path
            d={p(2 * BS, 0.8 * BS).h(3 * BS).l(BS, 0.7 * BS).h(BS).l(BS, BS).a(0.5 * BS, 0.5 * BS, 1).a(-0.5 * BS, 0.5 * BS, 1).h(-3 * BS).a(-0.5 * BS, -0.5 * BS, 1).v(-BS).a(0.5 * BS, -0.5 * BS, 1).l(BS, 0.3 * BS).h(BS).l(BS, BS).a(0.2 * BS, 0.2 * BS, 1).a(-0.2 * BS, 0.2 * BS, 1).h(-3 * BS).a(-0.2 * BS, -0.2 * BS, 1).v(-BS).a(0.2 * BS, -0.2 * BS, 1).l(BS, -BS).h(5 * BS).end()}
            style={{ strokeWidth: '5px', stroke: 'purple', fill: 'transparent' }}
          />
        </Simulator>
        <Typography paragraph>In the system above, the top output can be reached by the {$('\\color{red}{\\text{Red}}')}, {$('\\color{green}{\\text{Green}}')}, or {$('\\color{purple}{\\text{Purple}}')} path.</Typography>
        <ul>
          <Typography component='li'>The {$('\\color{red}{\\text{Red}}')} path goes through {$('1')} splitter, so {$('\\frac{1}{2}')} of the input follows this path.</Typography>
          <Typography component='li'>The {$('\\color{green}{\\text{Green}}')} path goes through {$('3')} splitters, so {$('\\frac{1}{8}')} of the input follows this path.</Typography>
          <Typography component='li'>The {$('\\color{purple}{\\text{Purple}}')} path goes through {$('5')} splitters, so {$('\\frac{1}{32}')} of the input follows this path.</Typography>
        </ul>
        <Typography paragraph>There are infinitely many possible paths that continue on this pattern, and summing them all gives the total output.</Typography>
        {$$('\\text{Output} = \\color{red}{\\frac{1}{2}} + \\color{green}{\\frac{1}{8}} + \\color{purple}{\\frac{1}{32}} + \\frac{1}{128} + \\cdots = \\frac{1}{2} \\sum_{k=0}^{\\infty} \\frac{1}{4^k} = \\frac{2}{3}.')}
        <Typography paragraph>Having {$('n')} splitters arranged in this fashion results in similar calculations.</Typography>
        <Simulator
          bare blueprint={'\
          I0> > >S> > > > > > > O> \n\
          _ _ _ >  S> > > > > > O> \n\
          _ _ _ ^ _  S> ^ ^ ^ _ __ \n\
          _ _ _ ^ _ _  S> ^ ^ _ __ \n\
          _ _ _ ^ _ _ _  S> ^ _ __ \n\
          _ _ _ ^ _ _ _ _   v _ __ \n\
          _ _ _ ^ < < < < < < _ __ '}
        />
        {$$('\\text{Output} = \\frac{1}{2^1} + \\frac{1}{2^{n+1}} + \\frac{1}{2^{2n+1}} + \\cdots = \\frac{1}{2} \\sum_{k=0}^{\\infty} \\frac{1}{2^{nk}} = \\frac{2^{n-1}}{2^n-1}.')}
        <Typography paragraph>The system that outputted the fraction {$('\\frac{2}{3}')} is also a tiny “Fibonacci spiral”-type system described in the previous Section. And indeed the output is {$('\\frac{F_3}{F_4}')}, the ratio of 2 consecutive Fibonacci numbers. To prove (by induction) that a general spiral with {$('n+1')} splitters always follows this pattern, the system is simplified in the following way:</Typography>
        <Simulator
          bare blueprint={'\
          I0> > >S> > > > > > > O> \n\
          _ _ _ >  S> > > > > > O> \n\
          _ _ _ ^ _   > > v _ _ __ \n\
          _ _ _ ^ < < < < < _ _ __ '}
        >
          {redSplitter(5, 1)}
          <text x={6 * BS} y={1.65 * BS} style={{ fontFamily: 'Times New Roman', fill: 'red' }}>F<tspan dy='5'>n+1</tspan><tspan dy='-5'> / F</tspan><tspan dy='5'>n+2</tspan></text>
          <text x={6 * BS} y={2.65 * BS} style={{ fontFamily: 'Times New Roman', fill: 'red' }}>F<tspan dy='5'>n</tspan><tspan dy='-5'> / F</tspan><tspan dy='5'>n+2</tspan></text>
        </Simulator>
        <Typography paragraph>The bottom {$('n')} splitters form a spiral of size {$('n')} and is represented by a hypothetical {$('\\color{red}{\\text{Red}}')} splitter. This splitter has a top split of {$('\\frac{F_{n+1}}{F_{n+2}}')} and a bottom split of {$('\\frac{F_{n}}{F_{n+2}}')}. By examining paths again, the top output of this system has output</Typography>
        {$$(`
          \\begin{align}
            &\\text{Output} = \\frac{1}{2} \\sum_{k=0}^{\\infty} \\underbrace{\\left(\\color{blue}{\\frac{1}{2}} \\cdot \\color{red}{\\frac{F_n}{F_{n+2}}}\\right)^k} = \\frac{1}{2} \\cdot \\frac{2F_{n+2}}{2F_{n+2}-F_n} = \\frac{F_{n+2}}{F_{n+3}}.\\\\
            &\\phantom{.}^{\\substack{\\text{This corresponds to going through the bottom of the $\\color{blue}{\\text{Blue}}$ splitter,}\\\\\\text{then the bottom of the $\\color{red}{\\text{Red}}$ splitter $k$ times}}}
          \\end{align}`
        )}
      </Section>

      <Section title='All Fractions'>
        <Typography paragraph>It turns out that all fractions can be made with a finite number of splitters. First the fraction is written in binary.</Typography>
        {$$('\\frac{191}{248} = 0.\\color{blue}{110}\\color{red}{\\overline{00101}}.')}
        <Typography paragraph>The {$('\\color{blue}{\\text{non-repeating}}')} part of the decimal contains 3 digits, and the {$('\\color{red}{\\text{repetend}}')} contains 5 digits, so 8 splitters are used and arranged in the following way:</Typography>
        <Simulator
          bare blueprint={'\
          I0>S> > > > > > > > > > O> \n\
          _ _  S> ^ _ _ _ _ ^ _ ^ __ \n\
          _ _ _  S>O>   _ _ ^ _ ^ __ \n\
          _ _ _ _  S>O>   _ ^ _ ^ __ \n\
          _ _ _ _ >  S>O>   ^ _ ^ __ \n\
          _ _ _ _ ^ _  S> > ^ _ ^ __ \n\
          _ _ _ _ ^ _ _  S>O>   ^ __ \n\
          _ _ _ _ ^ _ _ _  S> > ^ __ \n\
          _ _ _ _ ^ _ _ _ _   v _ __ \n\
          _ _ _ _ ^ < < < < < < _ __ '}
        >
          {redSplitter(5, 3)}
          {redSplitter(6, 4)}
          {redSplitter(7, 5)}
          {redSplitter(8, 6)}
          {redSplitter(9, 7)}
          <text x={1.85 * BS} y={1.25 * BS} style={{ fontFamily: 'Times New Roman', fontSize: `${BS}px` }}>1</text>
          <text x={2.85 * BS} y={2.25 * BS} style={{ fontFamily: 'Times New Roman', fontSize: `${BS}px` }}>1</text>
          <text x={3.85 * BS} y={3.25 * BS} style={{ fontFamily: 'Times New Roman', fontSize: `${BS}px` }}>0</text>
          <text x={4.85 * BS} y={4.25 * BS} style={{ fontFamily: 'Times New Roman', fontSize: `${BS}px` }}>0</text>
          <text x={5.85 * BS} y={5.25 * BS} style={{ fontFamily: 'Times New Roman', fontSize: `${BS}px` }}>0</text>
          <text x={6.85 * BS} y={6.25 * BS} style={{ fontFamily: 'Times New Roman', fontSize: `${BS}px` }}>1</text>
          <text x={7.85 * BS} y={7.25 * BS} style={{ fontFamily: 'Times New Roman', fontSize: `${BS}px` }}>0</text>
          <text x={8.85 * BS} y={8.25 * BS} style={{ fontFamily: 'Times New Roman', fontSize: `${BS}px` }}>1</text>
        </Simulator>
        <Typography paragraph>Every splitter corresponding to a {$('1')} feeds into the top output, while the splitters corresponding to a {$('0')} have their outputs dumped elsewhere. The last splitter also feeds back into one of the previous splitters, to represent the {$('\\color{red}{\\text{repetend}}')}. Since every rational number can be written as a terminating or repeating decimal in binary, every rational number can be represented by some system of splitters.</Typography>
        <Simulator blueprint={'\
          I2480>S> > > > > > > > > >O> \n\
          _    _  S> ^ _ _ _ _ ^ _ ^__ \n\
          _    _ _  S>O>   _ _ ^ _ ^__ \n\
          _    _ _ _  S>O>   _ ^ _ ^__ \n\
          _    _ _ _ >  S>O>   ^ _ ^__ \n\
          _    _ _ _ ^ _  S> > ^ _ ^__ \n\
          _    _ _ _ ^ _ _  S>O>   ^__ \n\
          _    _ _ _ ^ _ _ _  S> > ^__ \n\
          _    _ _ _ ^ _ _ _ _   v ___ \n\
          _    _ _ _ ^ < < < < < < ___ '}
        />
        <Typography paragraph>For an alternative construction of an arbitrary fraction {$('\\frac{p}{q}')}, first the input is evenly split into {$('2^n')} belts with {$('2^n \\geq q')}. Then {$('2^n-q')} of those belts are fed back into the beginning. By symmetry, the remaining {$('q')} belts all have an output of {$('\\frac{1}{q}')}. Combining {$('p')} of these belts gives {$('\\frac{p}{q}')}. This construction gives</Typography>
        {$$('\\frac{p}{2^n} \\sum_{k=0}^\\infty \\left(\\frac{2^n-q}{2^n}\\right)^k = \\frac{p}{q}.')}
      </Section>

      <Section title='More Efficient Systems'>
        <Typography paragraph>The method described previously to create all fractions does not always result in a system with the fewest splitters possible. The fraction {$('\\frac{4}{9} = 0.\\overline{011100}')} would use 6 splitters, but only 4 are needed.</Typography>
        <Simulator blueprint={'\
          I90> >S> > > > >S> > > O> \n\
          _  _ >  S>O>   >  S> > O> \n\
          _  _ ^ _   v _ ^ _   v __ \n\
          _  _ ^ < < < _ ^ < < < __ '}
        />
        <Typography paragraph>To figure out the fewest numbers of splitters needed for common fractions, I searched for all possible fractions made with {$('n = 2, 3, 4, \\ldots')} splitters. With {$('n = 2')} splitters, I found that the fractions {$('\\frac01, \\frac11, \\frac12, \\frac13, \\frac23, \\frac14, \\frac34')} are possible.</Typography>
      </Section>

      <Section title='Analyzing a System 2'>
        <Typography paragraph>There is also a general way to exactly determine which fractions a system will output.</Typography>
        <Simulator blueprint={'\
          _   _ _ _S> > > > v _ __ \n\
          I100> >S>   v _S> > > O> \n\
          _   _ >   > >S>  S> > O> \n\
          _   _ ^ _ _ _   v   v __ \n\
          _   _ ^ < < < < < < < __ '}
        />
        <Typography paragraph>Each splitter and input/output node is named, so that the system can be represented as a graph.</Typography>
        <Simulator
          bare blueprint={'\
          _ _ _ _S> > > > v _ __ \n\
          I0> >S>   v _S> > > O> \n\
          _ _ >   > >S>  S> > O> \n\
          _ _ ^ _ _ _   v   v __ \n\
          _ _ ^ < < < < < < < __ '}
        >
          <text x={0.37 * BS} y={1.75 * BS} style={{ fontFamily: 'Times New Roman', fontSize: `${0.8 * BS}px` }}>I</text>
          <text x={2.9 * BS} y={2.3 * BS} style={{ fontFamily: 'Times New Roman', fontSize: `${BS}px` }}>A</text>
          <text x={3.9 * BS} y={1.3 * BS} style={{ fontFamily: 'Times New Roman', fontSize: `${BS}px` }}>B</text>
          <text x={5.9 * BS} y={3.3 * BS} style={{ fontFamily: 'Times New Roman', fontSize: `${BS}px` }}>C</text>
          <text x={6.9 * BS} y={2.3 * BS} style={{ fontFamily: 'Times New Roman', fontSize: `${BS}px` }}>D</text>
          <text x={7.9 * BS} y={3.3 * BS} style={{ fontFamily: 'Times New Roman', fontSize: `${BS}px` }}>E</text>
          <text x={11 * BS} y={1.75 * BS} style={{ fontFamily: 'Times New Roman', fontSize: `${0.8 * BS}px` }}>O1</text>
          <text x={11 * BS} y={2.75 * BS} style={{ fontFamily: 'Times New Roman', fontSize: `${0.8 * BS}px` }}>O2</text>
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
        <Typography paragraph>A directed edge represents one splitter feeding into another. Every splitter node has exactly two arrows coming out of it. Since the two outputs of a splitter are equal, they are both labelled the same. The input node {$('\\text{I}')} only feeds into one splitter, and by assumption, it inputs a {$('1')} into the system.</Typography>
        {$$('i = 1')}
        <Typography paragraph>For every splitter, the inputs must equal the outputs.</Typography>
        {$$(`
          \\begin{align}
            i + c + e &= 2a \\\\
                    a &= 2b \\\\
                a + b &= 2c \\\\
                    c &= 2d \\\\
                    d &= 2e
          \\end{align}
        `)}
        <Typography paragraph>With {$('6')} unknowns and {$('6')} equations, the system can be solved to determine the throughput of every edge.</Typography>
        {$$(`
          \\begin{pmatrix}
            1 &    &    &    &    &    \\\\
            1 & -2 &    &  1 &    & 1  \\\\
              &  1 & -2 &    &    &    \\\\
              &  1 &  1 & -2 &    &    \\\\
              &    &    &  1 & -2 &    \\\\
              &    &    &    & 1  & -2
          \\end{pmatrix}
          \\begin{pmatrix}
            i \\\\ a \\\\ b \\\\ c \\\\ d \\\\ e
          \\end{pmatrix}
          =
          \\begin{pmatrix}
            1 \\\\ 0 \\\\ 0 \\\\ 0 \\\\ 0 \\\\ 0
          \\end{pmatrix}
          \\implies
          \\begin{align}
            i &= 1     \\\\
            a &= 16/17 \\\\
            b &= 8/17  \\\\
            c &= 12/17 \\\\
            d &= 6/17  \\\\
            e &= 3/17
          \\end{align}
        `)}
        <Typography paragraph>This system outputs the fractions {$('\\text{O1} = b+d = \\frac{14}{17}')} and {$('\\text{O2} = e = \\frac{3}{17}')}.</Typography>
      </Section>

      <Section title='Iterating Over All Systems'>
        <Typography paragraph>In the previous system, the 2nd column of the matrix indicates that the {$('\\text{A}')} splitter feeds into {$('\\text{B}')} and {$('\\text{C}')} splitters. The 5th column indicates that the {$('\\text{E}')} splitter feeds only into the {$('\\text{A}')} splitter, so its other output exists the system. It is also possible for a splitter to not feed into any other splitters.</Typography>
        {$$(`
          \\begin{pmatrix}
            0 \\\\ -2 \\\\ 1 \\\\ 1 \\\\ 0 \\\\ 0
          \\end{pmatrix}
          \\begin{matrix}
            \\phantom{0}                   \\\\
            \\leftarrow\\text{A splitter}  \\\\
            \\rightarrow\\text{B splitter} \\\\
            \\rightarrow\\text{C splitter} \\\\
            \\phantom{0}                   \\\\
            \\phantom{0}
          \\end{matrix}
          \\qquad
          \\begin{pmatrix}
            0 \\\\ 1 \\\\ 0 \\\\ 0 \\\\ 0 \\\\ -2
          \\end{pmatrix}
          \\begin{matrix}
            \\phantom{0}                   \\\\
            \\rightarrow\\text{A splitter} \\\\
            \\phantom{0}                   \\\\
            \\phantom{0}                   \\\\
            \\phantom{0}                   \\\\
            \\leftarrow\\text{E splitter}
          \\end{matrix}
        `)}
        <Typography paragraph>The 1st column and the 1st row are always the same, and there is always a {$('-2')} along the diagonal for the rest of the matrix. But in each column, a {$('1')} can appear up to {$('2')} times anywhere else (except the 1st row). For simplicity, I added the restriction that a splitter must feed into at least {$('1')} other splitter. Therefore for a system of {$('n')} splitters, there are {$('[(n^2-n)/2]^n')} such matrices. It is also not necessary to ensure that the resulting graph is planar because of underground belts.</Typography>
        <Typography paragraph>But not all matrices represent valid systems. Here’s one such matrix for {$('n = 4')} splitters.</Typography>
        {$$(`
          \\begin{pmatrix}
            1 &    &    &    &    \\\\
            1 & -2 &  1 &  1 &  1 \\\\
              &  1 & -2 &  1 &    \\\\
              &  1 &  1 & -2 &    \\\\
              &    &    &    & -2
          \\end{pmatrix}
          \\begin{pmatrix}
            i \\\\ a \\\\ b \\\\ c \\\\ d
          \\end{pmatrix}
          =
          \\begin{pmatrix}
            1 \\\\ 0 \\\\ 0 \\\\ 0 \\\\ 0
          \\end{pmatrix}
        `)}
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
        <Typography paragraph>The {$('\\text{D}')} splitter has no inputs, so this system is not valid. Fortunately, these matrices are also not invertible.</Typography>
        <Typography paragraph>In the first matrix, the edges {$('b')}, {$('d')}, {$('e')} represented edges that exited the system.</Typography>
        {$$(`
          \\begin{pmatrix}
            1 &    &    &    &    &    \\\\
            1 & -2 &    &  1 &    &  1 \\\\
              &  1 & -2 &    &    &    \\\\
              &  1 &  1 & -2 &    &    \\\\
              &    &    &  1 & -2 &    \\\\
              &    &    &    &  1 & -2
          \\end{pmatrix}
          \\begin{pmatrix}
            i \\\\ a \\\\ b \\\\ c \\\\ d \\\\ e
          \\end{pmatrix}
          =
          \\begin{pmatrix}
            1 \\\\ 0 \\\\ 0 \\\\ 0 \\\\ 0 \\\\ 0
          \\end{pmatrix}
          \\implies
          \\begin{align}
            b &= 8/17 \\\\
            d &= 6/17 \\\\
            e &= 3/17
          \\end{align}
        `)}
        <Typography paragraph>In the graph that this matrix was derived from, {$('b')} and {$('d')} went into the same output, but this information is lost in the matrix. For consistency, it is assumed that when a splitter feeds into an output node, it feeds into its own distinct output node. So this matrix would represent the system</Typography>
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
        <Typography paragraph>The possible outputs of this system are then all combinations of the outputs {$('b')}, {$('d')}, {$('e')}.</Typography>
        {$$(`
          \\begin{align}
                    b &= 8/17  \\\\
                    d &= 6/17  \\\\
                    e &= 3/17  \\\\
                b + d &= 14/17 \\\\
                b + e &= 11/17 \\\\
                d + e &= 9/17  \\\\
            b + d + e &= 1/1
          \\end{align}
        `)}
      </Section>

      <Section title='Results'>
        <Typography paragraph>I let my computer calculate all possible fractions for systems of up to {$('n=6')} splitters. It appears that a system of {$('n')} splitters can always produce the fraction {$('\\frac{p}{q}')} where {$('0 \\leq p \\leq q \\leq 2^n')}, although I was unable to prove this. If multiple systems solve a certain fraction, the system with the smallest maximum number of edges going into any one node is preferred. Due to issues with side-loading, these systems are not always possible to represent in Factorio.</Typography>
        <AllFractions />
      </Section>
    </Blog>
  )
}

export default FactorioFractions
