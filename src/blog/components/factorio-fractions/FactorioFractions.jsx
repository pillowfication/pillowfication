import React, { Component } from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'

import { registerBlog } from '../Blog.jsx'
import $ from '../../../shared/Math.jsx'
import Simulator from './simulator/Simulator.jsx'
import p from './simulator/Path'
import zf from '../../../foundation.scss'

const BS = 40 // Grid size in pixels.

function redSplitter (x, y) {
  return (
    <>
      <rect x={(x + 0.5) * BS - 10} y={y * BS + 1} width={17} height={BS * 2 - 2} style={{ fill: '#965454' }} />
      <rect x={(x + 0.5) * BS - 8} y={y * BS + 1} width={3} height={BS * 2 - 2} style={{ fill: '#bbbbbb' }} />
      <path d={p((x + 0.5) * BS + 2, y * BS).h(8).l(5, 0.5 * BS).l(-5, 0.5 * BS).l(5, 0.5 * BS).l(-5, 0.5 * BS).h(-8).l(5, -0.5 * BS).l(-5, -0.5 * BS).l(5, -0.5 * BS).l(-5, -0.5 * BS)} style={{ fill: 'red' }} />
    </>
  )
}

class FactorioFractions extends Component {
  render () {
    return (
      <>
        <div className={classnames(zf.callout, zf.primary, zf.showForSmallOnly)}>
          <p>If you are on mobile, the screen may be too small to fit the simulators.</p>
        </div>
        <h2>Rules of the Game</h2>
        <p>The game of <a href='https://factorio.com/'>Factorio</a> involves the transportation of items across <b>transport belts</b>. Here, we are only interested in transporting 1 type of item using belts with unlimited throughput.</p>
        <Simulator blueprint={'\
          _  ___>>v______ \n\
          I20>>>^_v_>>>O> \n\
          _  _____>>^____ '}
        />
        <p>Belts are also allowed to cross over each other using <b>underground transport belts</b>.</p>
        <Simulator blueprint={'\
          I20>>> >>v_ _____ \n\
          I20>>>D>_v_U>>>O> \n\
          _  ___ __>> >>>O> '}
        />
        <p>Lastly, the <b>splitter</b> allows for splitting the items on a transport belt evenly onto 2 transport belts.</p>
        <Simulator blueprint={'\
          I20>>>S>>>> >>>O> \n\
          _  ___  >>>S>>>O> \n\
          _  ___ ____  >>O> '}
        />
        <p>The splitter can receive input from two belts at once for convenience. Each side will still be split evenly onto the two output belts.</p>
        <Simulator blueprint={'\
          I10>>vv <<< <<<I10< \n\
          _  __Sv ___ _^__  _ \n\
          _  __v> >>S>>^__  _ \n\
          O<  <<_ __  >>>  O> '}
        />
        <hr />

        <h2>Playing Around</h2>
        <p>Using splitters, it is simple enough to create a system that splits off <$ $='\frac{1}{4}' /> or <$ $='\frac{1}{8}' /> or <$ $='\frac{1}{2^n}' /> of a belt’s items by passing through enough splitters. But complexity arises when there are splitters that feed into each other. In the system below, the top output ends up receiving <$ $='\frac{2}{3}' /> of the input, and the bottom output receives <$ $='\frac{1}{3}' /> of the input.</p>
        <Simulator blueprint={'\
          I30>>>>S>> >>>>O> \n\
          _  ___>  >S>>>>O> \n\
          _  ___^ __ v_____ \n\
          _  ___^ <<<<_____ '}
        />
        <p>This fancy spiral outputs fractions of <$ $='\frac{8}{13}' /> and <$ $='\frac{5}{13}' />.</p>
        <Simulator blueprint={'\
          I130>>S> > > > >>>>>O> \n\
          _   _>  S> > > >>>>>O> \n\
          _   _^ >  S> > >>>>v__ \n\
          _   _^ ^ >  S> >>>vv__ \n\
          _   _^ ^ ^ >  S>>vvv__ \n\
          _   _^ ^ ^ ^ _  vvvv__ \n\
          _   _^ ^ ^ ^ < <<vvv__ \n\
          _   _^ ^ ^ < < <<<vv__ \n\
          _   _^ ^ < < < <<<<v__ \n\
          _   _^ < < < < <<<<<__ '}
        />
        <p>As it turns out in all spirals of this style, the first fraction will be the ratio of two consecutive <a href='https://en.wikipedia.org/wiki/Fibonacci_number'>Fibonacci numbers</a>. This will be proved in the next section.</p>
        <p>Systems of splitters can also be chained together with the effect of multiplying fractions. Since we know how to make a fraction of <$ $='\frac{2}{3}' />, chaining the system twice will result in a fraction of <$ $='\frac{4}{9}' />.</p>
        <Simulator blueprint={'\
          I90>>S> >>>>S> >>O> \n\
          _  _>  S>O>>  S>>O> \n\
          _  _^ _  v_^ _  v__ \n\
          _  _^ < <<_^ < <<__ '}
        />
        <hr />

        <h2>Analyzing a System</h2>
        <p>To see which fraction an output corresponds to, I look at every path an item can take that leads to that output.</p>
        <Simulator
          bare blueprint={'\
          I0>>>>S>> >>>>O> \n\
          _ ___>  >S>>>>O> \n\
          _ ___^ __ v_____ \n\
          _ ___^ <<<<_____ '}
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
        <p>In the system above, the top output can be reached by the <$ $='\color{red}{\text{Red}}' />, <$ $='\color{green}{\text{Green}}' />, or <$ $='\color{purple}{\text{Purple}}' /> path.</p>
        <ul>
          <li>The <$ $='\color{red}{\text{Red}}' /> path goes through <$ $='1' /> splitter, so <$ $='\frac{1}{2}' /> of the input follows this path.</li>
          <li>The <$ $='\color{green}{\text{Green}}' /> path goes through <$ $='3' /> splitters, so <$ $='\frac{1}{8}' /> of the input follows this path.</li>
          <li>The <$ $='\color{purple}{\text{Purple}}' /> path goes through <$ $='5' /> splitters, so <$ $='\frac{1}{32}' /> of the input follows this path.</li>
        </ul>
        <p>There are infinitely many possible paths that continue on this pattern, and summing them all gives the total output.</p>
        <$ $$='\text{Output} = \color{red}{\frac{1}{2}} + \color{green}{\frac{1}{8}} + \color{purple}{\frac{1}{32}} + \frac{1}{128} + \cdots = \frac{1}{2} \sum_{k=0}^{\infty} \frac{1}{4^k} = \frac{2}{3}.' />
        <p>Having <$ $='n' /> splitters arranged in this fashion results in similar calculations.</p>
        <Simulator
          bare blueprint={'\
          I0>>>S> > > > >>>O> \n\
          _ __>  S> > > >>>O> \n\
          _ __^ _  S> ^ ^^___ \n\
          _ __^ _ _  S> ^^___ \n\
          _ __^ _ _ _  S>^___ \n\
          _ __^ _ _ _ _  v___ \n\
          _ __^ < < < < <<___ '}
        />
        <$ $$='\text{Output} = \frac{1}{2^1} + \frac{1}{2^{n+1}} + \frac{1}{2^{2n+1}} + \cdots = \frac{1}{2} \sum_{k=0}^{\infty} \frac{1}{2^{nk}} = \frac{2^{n-1}}{2^n-1}.' />
        <p>The system that outputted the fraction <$ $='\frac{2}{3}' /> is also a tiny “Fibonacci spiral”-type system described in the previous section. And indeed the output is <$ $='\frac{F_3}{F_4}' />, the ratio of 2 consecutive Fibonacci numbers. To prove (by induction) that a general spiral with <$ $='n+1' /> splitters always follows this pattern, the system is simplified in the following way:</p>
        <Simulator
          bare blueprint={'\
          I0>>>S> >>>>>>O> \n\
          _ __>  S>>>>>>O> \n\
          _ __^ _ >>v_____ \n\
          _ __^ <<<<<_____ '}
        >
          {redSplitter(5, 1)}
          <text x={6 * BS} y={1.65 * BS} style={{ fontFamily: 'Times New Roman', fill: 'red' }}>F<tspan dy='5'>n+1</tspan><tspan dy='-5'> / F</tspan><tspan dy='5'>n+2</tspan></text>
          <text x={6 * BS} y={2.65 * BS} style={{ fontFamily: 'Times New Roman', fill: 'red' }}>F<tspan dy='5'>n</tspan><tspan dy='-5'> / F</tspan><tspan dy='5'>n+2</tspan></text>
        </Simulator>
        <p>The bottom <$ $='n' /> splitters form a spiral of size <$ $='n' /> and is represented by a hypothetical <$ $='\color{red}{\text{Red}}' /> splitter. This splitter has a top split of <$ $='\frac{F_{n+1}}{F_{n+2}}' /> and a bottom split of <$ $='\frac{F_{n}}{F_{n+2}}' />. By examining paths again, the top output of this system has output</p>
        <$ $$={`
          \\begin{align}
            &\\text{Output} = \\frac{1}{2} \\sum_{k=0}^{\\infty} \\underbrace{\\left(\\color{blue}{\\frac{1}{2}} \\cdot \\color{red}{\\frac{F_n}{F_{n+2}}}\\right)^k} = \\frac{1}{2} \\cdot \\frac{2F_{n+2}}{2F_{n+2}-F_n} = \\frac{F_{n+2}}{F_{n+3}}.\\\\
            &\\phantom{.}^{\\substack{\\text{This corresponds to going through the bottom of the $\\color{blue}{\\text{Blue}}$ splitter,}\\\\\\text{then the bottom of the $\\color{red}{\\text{Red}}$ splitter $k$ times}}}
          \\end{align}`}
        />
        <hr />

        <h2>All Fractions</h2>
        <p>It turns out that all fractions can be made with a finite number of splitters. First the fraction is written in binary.</p>
        <$ $$='\frac{191}{248} = 0.\color{blue}{110}\color{red}{\overline{00101}}.' />
        <p>The <$ $='\color{blue}{\text{non-repeating}}' /> part of the decimal contains 3 digits, and the <$ $='\color{red}{\text{repetend}}' /> contains 5 digits, so 8 splitters are used and arranged in the following way:</p>
        <Simulator
          bare blueprint={'\
          I0>S> > > > > > > > > >O> \n\
          _ _  S> ^ _ _ _ _ ^ _ ^__ \n\
          _ _ _  S>O>   _ _ ^ _ ^__ \n\
          _ _ _ _  S>O>   _ ^ _ ^__ \n\
          _ _ _ _ >  S>O>   ^ _ ^__ \n\
          _ _ _ _ ^ _  S> > ^ _ ^__ \n\
          _ _ _ _ ^ _ _  S>O>   ^__ \n\
          _ _ _ _ ^ _ _ _  S> > ^__ \n\
          _ _ _ _ ^ _ _ _ _   v ___ \n\
          _ _ _ _ ^ < < < < < < ___ '}
        >
          {redSplitter(5, 3)}
          {redSplitter(6, 4)}
          {redSplitter(7, 5)}
          {redSplitter(8, 6)}
          {redSplitter(9, 7)}
          <text x={1.9 * BS} y={1.3 * BS} style={{ fontFamily: 'Times New Roman', fontSize: BS + 'px' }}>1</text>
          <text x={2.9 * BS} y={2.3 * BS} style={{ fontFamily: 'Times New Roman', fontSize: BS + 'px' }}>1</text>
          <text x={3.9 * BS} y={3.3 * BS} style={{ fontFamily: 'Times New Roman', fontSize: BS + 'px' }}>0</text>
          <text x={4.9 * BS} y={4.3 * BS} style={{ fontFamily: 'Times New Roman', fontSize: BS + 'px' }}>0</text>
          <text x={5.9 * BS} y={5.3 * BS} style={{ fontFamily: 'Times New Roman', fontSize: BS + 'px' }}>0</text>
          <text x={6.9 * BS} y={6.3 * BS} style={{ fontFamily: 'Times New Roman', fontSize: BS + 'px' }}>1</text>
          <text x={7.9 * BS} y={7.3 * BS} style={{ fontFamily: 'Times New Roman', fontSize: BS + 'px' }}>0</text>
          <text x={8.9 * BS} y={8.3 * BS} style={{ fontFamily: 'Times New Roman', fontSize: BS + 'px' }}>1</text>
        </Simulator>
        <p>Every splitter corresponding to a <$ $='1' /> feeds into the top output, while the splitters corresponding to a <$ $='0' /> have their outputs dumped elsewhere. The last splitter also feeds back into one of the previous splitters, to represent the <$ $='\color{red}{\text{repetend}}' />. Since every rational number can be written as a terminating or repeating decimal in binary, every rational number can be represented by some system of splitters.</p>
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
        <hr />

        <Link to='factorio-fractions-2'>This article is continued in Part 2.</Link>
      </>
    )
  }
}

export default registerBlog(FactorioFractions, '2019/10/05', 'Factorio Fractions')
