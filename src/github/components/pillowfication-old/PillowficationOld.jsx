import React, { Component } from 'react'

import Page from '../Page.jsx'
import Section from '../Section.jsx'
import pillowfication from 'pillowfication-old/www/assets/img/pillowfication.png'
import wizard from './wizard.png'
import tetris from './tetris.png'
import tree from './tree.png'
import delaunay from './delaunay.png'
import bezier from './bezier.png'
import _3D from './3D.png'
import zf from '../../../foundation.scss'
import fa from '../../../font-awesome.scss'
import styles from './PillowficationOld.scss'

class PillowficationOld extends Component {
  render () {
    return (
      <Page title='pillowfication-old' github='pillowfication/pillowfication-old'>
        <section>
          <p><a href='http://old.pillowfication.com'><i className={`${fa.fa} ${fa.faReply} ${fa.faRotate180}`} /> Enter the website here</a></p>
          <p>This is the first website I ever made for myself. (Even the graphic below was made in MS Paint.)</p>
          <div className={styles.ambigram}>
            <img src={pillowfication} />
          </div>
        </section>
        <hr />
        <Section title='/games'>
          <p>A few little games that I made.</p>
          <h3><a href='http://old.pillowfication.com/games/wizard'>/games/wizard</a></h3>
          <p>This is a short visual novel-type game with elements from the Flash game <a href='http://www.realmofthemadgod.com/'>Realm of the Mad God</a>. The player MerchantCo asked for a story featuring his wizard on the forum, and I made this as a submission.</p>
          <p className={zf.textCenter}>
            <img src={wizard} />
          </p>
          <h3><a href='http://old.pillowfication.com/games/tetris'>/games/tetris</a></h3>
          <p>50&times;100 Tetris. This started as a Java applet from when I first learned Java. The code has remained mostly the same, but translated to use a <code>&lt;canvas&gt;</code>.</p>
          <p className={zf.textCenter}>
            <img src={tetris} />
          </p>
        </Section>
        <hr />
        <Section title='/projects'>
          <p>Other stuff I made that I thought was cool.</p>
          <h3><a href='http://old.pillowfication.com/projects/tree'>/projects/tree</a></h3>
          <p>A 3D tree generator inspired by <a href='http://www.taghua.com/'>Taghua</a>. My first 2D version was written as a Java applet, and I used that code to create this one with each variable explained and free to be manipulated.</p>
          <p className={zf.textCenter}>
            <img src={tree} />
          </p>
          <h3><a href='http://old.pillowfication.com/projects/delaunay'>/projects/delaunay</a></h3>
          <p>In high school, I became strangely interested in Poisson-disc sampling, Delaunay triangulations, Voronoi diagrams, and Perlin noise especially after reading Amit Patel’s <a href='http://www-cs-students.stanford.edu/~amitp/game-programming/polygon-map-generation/'>Polygonal Map Generation for Games</a>. Here I wrote my own code (from reading papers online) to Poisson-disc sample a square and draw the Delaunay triangulation of those points.</p>
          <p className={zf.textCenter}>
            <img src={delaunay} />
          </p>
          <h3><a href='http://old.pillowfication.com/projects/bezier'>/projects/bezier</a></h3>
          <p>This was a small exercise in dealing with Bézier curves (and their lengths and derivatives).</p>
          <p className={zf.textCenter}>
            <img src={bezier} />
          </p>
          <h3><a href='http://old.pillowfication.com/projects/3D'>/projects/3D</a></h3>
          <p>After studying Linear Algebra, I tried to take what I learned and wrote some code to draw a 3D cube with perspective.</p>
          <p className={zf.textCenter}>
            <img src={_3D} />
          </p>
        </Section>
      </Page>
    )
  }
}

export default PillowficationOld
