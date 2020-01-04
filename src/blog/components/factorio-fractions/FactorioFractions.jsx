import React, { Component } from 'react'

import { registerBlog } from '../Blog.jsx'
import classnames from 'classnames'

import zf from '../../../foundation.scss'
import Simulator from './simulator/Simulator.jsx'

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
          I20>>> >>v__ ____ \n\
          I20>>>D>_v_U>>>O> \n\
          _  ___ __>>> >>O> '}
        />
        <p>Lastly, the <b>splitter</b> allows for splitting the items on a transport belt evenly onto 2 transport belts.</p>
        <Simulator blueprint={'\
          I20>>> S>>>> >>>O> \n\
          _  ___   >>>S>>>O> \n\
          _  ___ _ ___  >>O> '}
        />
      </>
    )
  }
}

export default registerBlog(FactorioFractions, '2019/10/05', 'Factorio Fractions')
