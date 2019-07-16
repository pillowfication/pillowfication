const SKEW_FACTOR_2D = (Math.sqrt(3) - 1) / 2

function skew ({ x, y }) {
  return {
    x: x + (x + y) * SKEW_FACTOR_2D,
    y: y + (x + y) * SKEW_FACTOR_2D
  }
}

function getBarycentricCoordinates (x0, y0) {
  return x0 > y0
    ? [ 1 - x0, x0 - y0, y0 ]
    : [ 1 - y0, y0 - x0, x0 ]
}

function getRGBPermutation (xInt, yInt) {
  return [ 'RGB', 'GBR', 'BRG' ][(3 + ((xInt + yInt) % 3)) % 3]
}

function getValue ({ x, y }) {
  const { x: xSkew, y: ySkew } = skew({ x, y })
  const xInt = Math.floor(xSkew)
  const yInt = Math.floor(ySkew)
  const x0 = xSkew - xInt
  const y0 = ySkew - yInt
  const baryCoords = getBarycentricCoordinates(x0, y0)
  const RGBPerm = getRGBPermutation(xInt, yInt)
  return {
    [RGBPerm[0]]: baryCoords[0],
    [RGBPerm[1]]: baryCoords[1],
    [RGBPerm[2]]: baryCoords[2]
  }
}

const { createCanvas } = require('canvas')
const [ width, height ] = [ 400, 400 ]
const canvas = createCanvas(width, height)
const ctx = canvas.getContext('2d', { alpha: false })

const resolution = 100
const imageData = ctx.createImageData(width, height)
let dataIndex = 0
for (let row = 0; row < height; ++row) {
  for (let col = 0; col < width; ++col) {
    const value = getValue({ x: (col - width / 2) / resolution, y: (row - height / 2) / resolution })
    imageData.data[dataIndex++] = value.R * 256 | 0
    imageData.data[dataIndex++] = value.G * 256 | 0
    imageData.data[dataIndex++] = value.B * 256 | 0
    ++dataIndex
  }
}

const fs = require('fs')
const path = require('path')
ctx.putImageData(imageData, 0, 0)
canvas.createPNGStream()
  .pipe(fs.createWriteStream(path.resolve(__dirname, '../images/interpolation-bary-linear.png')))
