import _ from 'lodash';
import $ from 'jquery';
import React from 'react';
import pfCanvas from 'pf-canvas';
import 'pf-konami';

import pillowfication from './pillowfication';

$(() => {
  pfCanvas(document.body, (() => {
    const rand = Math.random;
    const cos = Math.cos, sin = Math.sin;
    const PI2 = Math.PI/2, PI4 = Math.PI/4;

    const x = [];
    const y = [];
    for (const triangle of pillowfication) {
      x.push(triangle[0], triangle[2], triangle[4]);
      y.push(triangle[1], triangle[3], triangle[5]);
    }
    const offsetX = _.min(x) - _.max(x) >> 1;
    const offsetY = _.min(y) - _.max(y) >> 1;

    const fade = 40;
    const fadeOffset = -60;
    const pop = 15;
    const drop = -1;
    const die = 100;
    const odd = ((256*rand()|1) << 16) + ((256*rand()|1) << 8) + (256*rand()|1);

    const data = _.map(pillowfication, () => ({
      state: 0,
      frame: fadeOffset*rand()|0,
      dX: 0,
      dY: 0,
      vX: 0,
      vY: 0,
      inc: 0
    }));

    let mouseX = 0;
    let mouseY = 0;

    $(document.body)
      .mousemove((e) => {
        mouseX = e.pageX;
        mouseY = e.pageY;
      })
      .click(() => {
        for (const datum of data) {
          datum.frame = 0;
          if (datum.state == 0 || datum.state == 1) {
            datum.state = 2;
            const theta = rand()*PI2 + PI4;
            datum.vX = pop * cos(theta);
            datum.vY = pop * sin(theta);
          }
        }
      });

    return function(ctx) {
      const width = ctx.canvas.width, height = ctx.canvas.height;
      ctx.clearRect(0, 0, width, height);
      const cX = (width >> 1) + offsetX;
      const cY = (height >> 1) - offsetY - 50;
      const mX = mouseX - cX;
      const mY = cY - mouseY;

      for (let i = 0, l = pillowfication.length; i < l; ++i) {
        const triangle = pillowfication[i];
        const datum = data[i];
        const color = odd * datum.inc;
        const [r, g, b] = [16, 8, 0].map(bit => color >> bit & 255);
        const colorString = `rgb(${r},${g},${b})`;

        switch (datum.state) {
          case 0:
            if (++datum.frame > 0) {
              ctx.beginPath();
              ctx.moveTo(cX+triangle[0], cY-triangle[1]);
              ctx.lineTo(cX+triangle[2], cY-triangle[3]);
              ctx.lineTo(cX+triangle[4], cY-triangle[5]);
              ctx.closePath();
              ctx.fillStyle = `rgba(${r},${g},${b},${datum.frame/fade})`;
              ctx.fill();
              if (datum.frame > fade) {
                datum.state = 1;
                datum.frame = 0;
              }
            }
            break;
          case 1:
            ctx.beginPath();
            ctx.moveTo(cX+triangle[0], cY-triangle[1]);
            ctx.lineTo(cX+triangle[2], cY-triangle[3]);
            ctx.lineTo(cX+triangle[4], cY-triangle[5]);
            ctx.closePath();
            ctx.fillStyle = colorString;
            ctx.fill();
            if (inside(triangle, mX, mY)) {
              datum.state = 2;
              const theta = rand()*PI2 + PI4;
              datum.vX = pop * cos(theta);
              datum.vY = pop * sin(theta);
            }
            break;
          case 2:
            if (++datum.frame < die) {
              ctx.beginPath();
              ctx.moveTo(cX+datum.dX+triangle[0], cY-datum.dY-triangle[1]);
              ctx.lineTo(cX+datum.dX+triangle[2], cY-datum.dY-triangle[3]);
              ctx.lineTo(cX+datum.dX+triangle[4], cY-datum.dY-triangle[5]);
              ctx.closePath();
              ctx.fillStyle = colorString;
              ctx.fill();
              datum.dX += datum.vX;
              datum.dY += datum.vY;
              datum.vY += drop;
            } else {
              datum.state = 0;
              datum.frame = 0;
              datum.dX = 0;
              datum.dY = 0;
              ++datum.inc;
            }
            break;
        }
      }

      function inside(t, x, y) {
        var det = (t[3]-t[5])*(t[0]-t[4]) + (t[4]-t[2])*(t[1]-t[5]);
        var lam1 = ((t[3]-t[5])*(x-t[4]) + (t[4]-t[2])*(y-t[5]))/det,
            lam2 = ((t[5]-t[1])*(x-t[4]) + (t[0]-t[4])*(y-t[5]))/det;
        return lam1 > 0 && lam2 > 0 && lam1+lam2 < 1;
      }
    };
  })(), {
    redraw: 'always',
    resize: true
  });
});

const App = React.createClass({
  render() {
    return null;
  }
});

export default App;
