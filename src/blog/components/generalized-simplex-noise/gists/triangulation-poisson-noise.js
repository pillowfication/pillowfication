const { Delaunay } = require('d3-delaunay')
const Poisson = require('poisson-disk-sampling')
const seedrandom = require('seedrandom')
const random = seedrandom('pillow')

const WIDTH = 400
const HEIGHT = 400
const RESOLUTION = 15
const RADIUS = 30

let points = [[0, 0], [WIDTH, 0], [WIDTH, HEIGHT], [0, HEIGHT]]
const poisson = new Poisson([WIDTH, HEIGHT], RADIUS, RADIUS * 2, 30, random)
points = points.concat(poisson.fill())
const delaunay = Delaunay.from(points)

const gradients = []
for (let i = 0; i < points.length; ++i) {
  const theta = 2 * Math.PI * random()
  gradients[i] = { x: Math.cos(theta), y: Math.sin(theta) }
}

function dotProduct (p1, p2) {
  return p1.x * p2.x + p1.y * p2.y
}

function getBarycentricCoordinates ({ x, y }, triangle) {
  const [t1, t2, t3] = triangle
  const detT = (t2.y - t3.y) * (t1.x - t3.x) + (t3.x - t2.x) * (t1.y - t3.y)
  const lambda1 = ((t2.y - t3.y) * (x - t3.x) + (t3.x - t2.x) * (y - t3.y)) / detT
  const lambda2 = ((t3.y - t1.y) * (x - t3.x) + (t1.x - t3.x) * (y - t3.y)) / detT
  const lambda3 = 1 - lambda1 - lambda2
  return [lambda1, lambda2, lambda3]
}

function interpolation (lambda1, lambda2, lambda3) {
  const d0 = Math.hypot(lambda2, lambda3)
  const d1 = Math.hypot(lambda1, lambda3)
  const d2 = Math.hypot(lambda1, lambda2)
  return [
    8 * Math.pow(Math.max(0.6 - d0 * d0, 0), 4),
    8 * Math.pow(Math.max(0.6 - d1 * d1, 0), 4),
    8 * Math.pow(Math.max(0.6 - d2 * d2, 0), 4)
  ]
}

function getValue ({ x, y }) {
  let lambda1, lambda2, lambda3, triangleIndices, trianglePoints
  for (let index = 0; index < delaunay.triangles.length; index += 3) {
    triangleIndices = [index, index + 1, index + 2].map(index => delaunay.triangles[index])
    trianglePoints = triangleIndices.map(index => ({ x: delaunay.points[index * 2], y: delaunay.points[index * 2 + 1] }))
    ;[lambda1, lambda2, lambda3] = getBarycentricCoordinates({ x, y }, trianglePoints)
    if (lambda1 >= 0 && lambda2 >= 0 && lambda3 >= 0) {
      break
    }
  }

  // Errors on edges
  if (lambda1 < 0 || lambda2 < 0 || lambda3 < 0) {
    [lambda1, lambda2, lambda3] = [0, 0, 0]
  }

  const distance0 = { x: (x - trianglePoints[0].x) / RESOLUTION, y: (y - trianglePoints[0].y) / RESOLUTION }
  const distance1 = { x: (x - trianglePoints[1].x) / RESOLUTION, y: (y - trianglePoints[1].y) / RESOLUTION }
  const distance2 = { x: (x - trianglePoints[2].x) / RESOLUTION, y: (y - trianglePoints[2].y) / RESOLUTION }
  const [t0, t1, t2] = interpolation(lambda1, lambda2, lambda3)
  return (
    t0 * dotProduct(distance0, gradients[triangleIndices[0]]) +
    t1 * dotProduct(distance1, gradients[triangleIndices[1]]) +
    t2 * dotProduct(distance2, gradients[triangleIndices[2]])
  )
}

const { createCanvas } = require('canvas')
const canvas = createCanvas(WIDTH, HEIGHT)
const ctx = canvas.getContext('2d', { alpha: false })

const noiseData = []
for (let row = 0; row < HEIGHT; ++row) {
  const noiseRow = []
  noiseData[row] = noiseRow
  for (let col = 0; col < WIDTH; ++col) {
    const value = getValue({ x: col, y: row })
    noiseRow[col] = value
  }
}
const noiseMin = -1.2
const noiseMax = 1.2
const noiseAmplitude = noiseMax - noiseMin

const imageData = ctx.createImageData(WIDTH, HEIGHT)
let dataIndex = 0
for (let row = 0; row < HEIGHT; ++row) {
  const noiseRow = noiseData[row]
  for (let col = 0; col < WIDTH; ++col) {
    const value = (noiseRow[col] - noiseMin) / noiseAmplitude * 256
    imageData.data[dataIndex++] = 255 - value
    imageData.data[dataIndex++] = 255 - value
    imageData.data[dataIndex++] = 255
    ++dataIndex
  }
}
ctx.putImageData(imageData, 0, 0)

// ctx.beginPath()
// delaunay.render(ctx)
// ctx.stroke()
//
// function drawArrow (x0, y0, x1, y1) {
//   ctx.beginPath()
//   ctx.moveTo(x0, y0)
//   ctx.lineTo(x1, y1)
//
//   let angle = Math.atan2(y1 - y0, x1 - x0)
//   ctx.moveTo(5 * Math.cos(angle) + x1, 5 * Math.sin(angle) + y1)
//   angle += Math.PI * 2 / 3
//   ctx.lineTo(5 * Math.cos(angle) + x1, 5 * Math.sin(angle) + y1)
//   angle += Math.PI * 2 / 3
//   ctx.lineTo(5 * Math.cos(angle) + x1, 5 * Math.sin(angle) + y1)
//   ctx.closePath()
//
//   ctx.stroke()
//   ctx.fill()
// }
//
// ctx.strokeStyle = '#000000'
// ctx.lineWidth = 3
// ctx.fillStyle = '#000000'
// for (let i = 0; i < gradients.length; ++i) {
//   const gradient = gradients[i]
//   const gradientOrigin = { x: points[i][0], y: points[i][1] }
//   drawArrow(gradientOrigin.x, gradientOrigin.y, gradientOrigin.x + gradient.x * RESOLUTION, gradientOrigin.y + gradient.y * RESOLUTION)
// }

const fs = require('fs')
const path = require('path')
canvas.createPNGStream()
  .pipe(fs.createWriteStream(path.resolve(__dirname, '../images/triangulation-poisson-noise.png')))
