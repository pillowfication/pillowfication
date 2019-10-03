const { Delaunay } = require('d3-delaunay')
const seedrandom = require('seedrandom')
const random = seedrandom('pillow')

const WIDTH = 400
const HEIGHT = 400
const NUM_POINTS = 10
const COLORS = [
  { R: 162, G: 30, B: 0 },
  { R: 0, G: 30, B: 162 },
  { R: 94, G: 98, B: 0 },
  { R: 0, G: 98, B: 94 }
]
const CONTRAST = 1.7
const BRIGHTNESS = -30

const points = [[0, 0], [WIDTH / 2, 0], [WIDTH, 0], [WIDTH, HEIGHT / 2], [WIDTH, HEIGHT], [WIDTH / 2, HEIGHT], [0, HEIGHT], [0, HEIGHT / 2]]
for (let i = 0; i < NUM_POINTS; ++i) {
  points.push([WIDTH * random(), HEIGHT * random()])
}
const delaunay = Delaunay.from(points)

// Determine a 4-coloring of the graph. This algorithm is very slow for more than 50 points.
function shuffle (array) {
  for (let i = array.length - 1; i > 0; --i) {
    const rand = (i + 1) * random() | 0
    ;[array[i], array[rand]] = [array[rand], array[i]]
  }
  return array
}

let colorings = []
const ordering = shuffle(new Array(points.length).fill().map((_, i) => i))

loop: while (true) { // eslint-disable-line no-labels
  for (const pointIndex of ordering) {
    const neighborColors = [false, false, false, false]
    for (const neighbor of delaunay.neighbors(pointIndex)) {
      if (colorings[neighbor] !== undefined) {
        neighborColors[colorings[neighbor]] = true
      }
      const color = neighborColors.findIndex(used => !used)
      if (color === -1) {
        colorings = []
        shuffle(ordering)
        continue loop // eslint-disable-line no-labels
      }
      colorings[pointIndex] = color
    }
  }
  break
}

function getBarycentricCoordinates ({ x, y }, triangle) {
  const [t1, t2, t3] = triangle
  const detT = (t2.y - t3.y) * (t1.x - t3.x) + (t3.x - t2.x) * (t1.y - t3.y)
  const lambda1 = ((t2.y - t3.y) * (x - t3.x) + (t3.x - t2.x) * (y - t3.y)) / detT
  const lambda2 = ((t3.y - t1.y) * (x - t3.x) + (t1.x - t3.x) * (y - t3.y)) / detT
  const lambda3 = 1 - lambda1 - lambda2
  return [lambda1, lambda2, lambda3]
}

function perlinInterpolation (t) {
  return t * t * t * (t * (t * 6 - 15) + 10)
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

  const colors = triangleIndices.map(index => COLORS[colorings[index]])
  const t0 = perlinInterpolation(lambda1)
  const t1 = perlinInterpolation(lambda2)
  const t2 = perlinInterpolation(lambda3)
  return {
    R: t0 * colors[0].R + t1 * colors[1].R + t2 * colors[2].R,
    G: t0 * colors[0].G + t1 * colors[1].G + t2 * colors[2].G,
    B: t0 * colors[0].B + t1 * colors[1].B + t2 * colors[2].B
  }
}

const { createCanvas } = require('canvas')
const canvas = createCanvas(WIDTH, HEIGHT)
const ctx = canvas.getContext('2d', { alpha: false })

const imageData = ctx.createImageData(WIDTH, HEIGHT)
let dataIndex = 0
for (let row = 0; row < HEIGHT; ++row) {
  for (let col = 0; col < WIDTH; ++col) {
    const value = getValue({ x: col, y: row })
    imageData.data[dataIndex++] = value.R * CONTRAST + BRIGHTNESS
    imageData.data[dataIndex++] = value.G * CONTRAST + BRIGHTNESS
    imageData.data[dataIndex++] = value.B * CONTRAST + BRIGHTNESS
    ++dataIndex
  }
}
ctx.putImageData(imageData, 0, 0)

ctx.strokeStyle = '#000000'
ctx.beginPath()
delaunay.render(ctx)
ctx.stroke()

const fs = require('fs')
const path = require('path')
canvas.createPNGStream()
  .pipe(fs.createWriteStream(path.resolve(__dirname, '../images/triangulation-random.png')))
