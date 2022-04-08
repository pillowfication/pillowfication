import React, { useRef, useState } from 'react'
import { useMeasure } from 'react-use'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import Blog from '../../src/blog/Blog'
import Section from '../../src/blog/Section'
import { $, $$ } from '../../src/MathJax'

const useStyles = makeStyles((theme) => ({
  figure: {
    margin: theme.spacing(4, 0),
    '& > figcaption': {
      textAlign: 'center'
    }
  },
  interactable: {
    cursor: 'pointer',
    userSelect: 'none'
  }
}))

const PFPerlin = (): React.ReactElement => {
  const classes = useStyles()
  const [ref, { width }] = useMeasure<HTMLDivElement>()

  return (
    <Blog title='pf-perlin'>
      <div ref={ref}>
        <Section>
          <Typography paragraph>A <Link href='https://en.wikipedia.org/wiki/Perlin_noise'>Perlin noise</Link> generator for any number of dimensions.</Typography>
        </Section>
        <Section title='The Algorithm'>
          <Typography>First, a unit gradient vector is assigned to every lattice point. (The original algorithm accomplishes this using a permutation table). To get a random vector in {$('\\mathbb{R}^n')}, each coordinate of the vector is randomly selected from a normal distribution. Thus the probability of any point {$('x')} being selected is equal to</Typography>
          {$$(`
            P(x)
            = \\prod_{i=1}^n \\frac{1}{\\sqrt{2\\pi}}\\,\\exp\\left(-\\frac{x_i^2}{2}\\right)
            = k\\cdot\\exp\\left(-\\sum_{i=1}^n x_i^2\\right).
          `.trim())}
          <Typography paragraph>This probability is only dependent on the magnitude of {$('x')}. All that’s left is to normalize the vector. Another option is to uniformly sample each component of {$('x')} from {$('[-1, 1]')} until you get a nonzero vector whose magnitude is less than or equal to {$('1')}, but the probability of success approaches {$('0')} as the number of dimensions increases.</Typography>
          <figure className={classes.figure}>
            <GridExample width={width} />
            <figcaption>
              <Typography variant='caption'>The vectors are pictured with length {$('1/2')}.<br />You can drag the grid around.</Typography>
            </figcaption>
          </figure>
          <Typography paragraph>To find the value of a point, find the cell it lies in. For each corner of the cell, let the distance vector be the vector from the corner to the point. Compute the value of the corner by taking the dot product of the distance vector with the gradient vector at that corner. These are called <b>influence values</b>.</Typography>
          <figure className={classes.figure}>
            <CellExample width={width} />
            <figcaption>
              <Typography variant='caption'>Distance vectors are drawn with thickness proportional to the influence value.<br />{$('\\color{blue}{\\text{Blue}}')} indicates a positive influence value, while {$('\\color{red}{\\text{Red}}')} is negative.<br />Click to randomize the gradient vectors.</Typography>
            </figcaption>
          </figure>
          <Typography paragraph>In the case of <Link href='https://en.wikipedia.org/wiki/Value_noise'>value noise</Link>, the influence value at each corner is a random value that is constant for all points inside the cell. Finally, to get the value for a point, interpolate between the {$('2^n')} influence values.</Typography>
          <Typography>An interpolation function between two values {$('a')} and {$('b')} takes in a parameter {$('0 \\leq t \\leq 1')} and returns a value in {$('[a, b]')}. This can be formulated as</Typography>
          {$$(`
            \\begin{align}
              \\operatorname{interpolate}(a, b, t)
              & = (1 - \\varphi(t)) \\cdot a + \\varphi(t) \\cdot b \\\\
              & = \\varphi(t) \\cdot (b - a) + a
            \\end{align}
          `.trim())}
          <Typography paragraph>where {$('\\varphi(t)')} is any function {$('\\varphi : [0, 1] \\to [0, 1]')}. Ken Perlin used the function {$('\\varphi(t) = 6t^5 - 15t^4 + 10t^3')} which has both first and second derivative equal to {$('0')} at {$('t = 0, 1')}. With a {$('1')}-dimensional interpolation function chosen, an {$('n')}-dimensional interpolation function can be constructed by repeatedly interpolating along each dimension.</Typography>
          <figure className={classes.figure}>
            <InterpolationExample width={width} />
            <figcaption>
              <Typography variant='caption'>Each influence value is a constant color. Colors are linearly interpolated with {$('\\varphi(t) = t')}.<br />Interpolation occurs along the {$('x')}-axis, then the {$('y')}-axis.<br />Click to randomize the influence values.</Typography>
            </figcaption>
          </figure>
          <Typography paragraph>This completes the construction for one octave of Perlin noise. Next, the octave is scaled down by a factor of {$('2')} and added to itself repeatedly. The effect is visualized here with 1D Perlin noise:</Typography>
          <figure className={classes.figure}>
            <OctaveExample width={width} />
            <figcaption>
              <Typography variant='caption'>You can drag the graph around.</Typography>
            </figcaption>
          </figure>
          <Typography>The range of the first octave is {$('[-\\sqrt{n}/2, \\sqrt{n}/2]')} as is shown here (although this can depend on the interpolation function used). Thus the radius of the final Perlin noise function with {$('\\omega')} octaves is</Typography>
          {$$(`
            \\sum_{i=1}^\\omega \\frac{1}{2^{i-1}} \\cdot \\frac{\\sqrt{n}}{2}
            = \\sqrt{n} \\left( 1 - \\frac{1}{2^\\omega} \\right).
          `.trim())}
          <Typography paragraph>This allows the noise function to be mapped to the interval {$('[0, 1]')} or any desired interval.</Typography>
          <Typography paragraph>Perlin noise still contains some directional artifacts—most notably at the origin. This can be remedied by rotating each octave by some angle {$('\\theta')} such as the <Link href='https://en.wikipedia.org/wiki/Golden_ratio'>golden ratio</Link> for its high irrationality. For higher dimensions, this is address in <Link href='https://en.wikipedia.org/wiki/Simplex_noise'>simplex noise</Link>.</Typography>
        </Section>
      </div>
    </Blog>
  )
}

const GRID_RESOLUTION = 50
const GRID_HEIGHT = 200

const GridExample = ({ width }: { width: number }): React.ReactElement => {
  const classes = useStyles()
  const [gridOffsetX, setGridOffsetX] = useState(0)
  const [gridOffsetY, setGridOffsetY] = useState(0)
  const [gridDrag, setGridDrag] = useState<{ x: number, y: number } | null>(null)
  const gridTheta = useRef<Record<number, Record<number, number>>>({}).current

  const handleMouseDownGrid = (event: React.MouseEvent): void => {
    setGridDrag({ x: event.clientX, y: event.clientY })
  }
  const handleMouseUpGrid = (): void => {
    setGridDrag(null)
  }
  const handleDragGrid = (event: React.MouseEvent): void => {
    if (gridDrag !== null) {
      setGridOffsetX(gridOffsetX + event.clientX - gridDrag.x)
      setGridOffsetY(gridOffsetY + event.clientY - gridDrag.y)
      setGridDrag({ x: event.clientX, y: event.clientY })
    }
  }

  const getGridTheta = (x: number, y: number): number => {
    const axis = gridTheta[x] ?? (gridTheta[x] = {})
    return axis[y] ?? (axis[y] = Math.random() * 2 * Math.PI)
  }

  const left = gridOffsetX < 0 ? gridOffsetX % GRID_RESOLUTION : gridOffsetX % GRID_RESOLUTION - GRID_RESOLUTION
  const up = gridOffsetY < 0 ? gridOffsetY % GRID_RESOLUTION : gridOffsetY % GRID_RESOLUTION - GRID_RESOLUTION
  const startX = -Math.floor((gridOffsetX + width / 2) / GRID_RESOLUTION) - 1
  const startCanvasX = ((width / 2 + left) % GRID_RESOLUTION) - GRID_RESOLUTION
  const startY = -Math.floor((gridOffsetY + GRID_HEIGHT / 2) / GRID_RESOLUTION) - 1
  const startCanvasY = ((GRID_HEIGHT / 2 + up) % GRID_RESOLUTION) - GRID_RESOLUTION

  return (
    <div
      className={classes.interactable}
      onMouseDown={handleMouseDownGrid}
      onMouseUp={handleMouseUpGrid}
      onMouseMove={handleDragGrid}
    >
      <svg width={width} height={GRID_HEIGHT}>
        <defs>
          <marker
            id='arrow'
            viewBox='0 0 10 10'
            refX='5' refY='5'
            markerWidth='6' markerHeight='6'
            orient='auto-start-reverse'
          >
            <path d='M 0 0 L 10 5 L 0 10 z' />
          </marker>
        </defs>
        {(() => {
          const children: React.ReactNode[] = []

          for (let x = startX, canvasX = startCanvasX; canvasX <= width + GRID_RESOLUTION; ++x, canvasX += GRID_RESOLUTION) {
            children.push(
              <line
                key={`x${x}`}
                x1={canvasX} y1={0}
                x2={canvasX} y2={GRID_HEIGHT}
                stroke='#7caff0'
              />
            )
          }
          for (let y = startY, canvasY = startCanvasY; canvasY <= GRID_HEIGHT + GRID_RESOLUTION; ++y, canvasY += GRID_RESOLUTION) {
            children.push(
              <line
                key={`y${y}`}
                x1={0} y1={canvasY}
                x2={width} y2={canvasY}
                stroke='#7caff0'
              />
            )
          }

          for (let x = startX, canvasX = startCanvasX; canvasX <= width + GRID_RESOLUTION; ++x, canvasX += GRID_RESOLUTION) {
            for (let y = startY, canvasY = startCanvasY; canvasY <= GRID_HEIGHT + GRID_RESOLUTION; ++y, canvasY += GRID_RESOLUTION) {
              const theta = getGridTheta(x, y)
              children.push(
                <line
                  key={`x${x}y${y}`}
                  x1={canvasX} y1={canvasY}
                  x2={canvasX + GRID_RESOLUTION * Math.cos(theta) / 2}
                  y2={canvasY + GRID_RESOLUTION * Math.sin(theta) / 2}
                  stroke='#000000'
                  markerEnd='url(#arrow)'
                />
              )
            }
          }

          return children
        })()}
      </svg>
    </div>
  )
}

const MAX_CELL_RESOLUTION = 200

const CellExample = ({ width }: { width: number }): React.ReactElement => {
  const classes = useStyles()
  const [cellGradients, setCellGradients] = useState(Array(4).fill(0).map(() => Math.random() * 2 * Math.PI))
  const [cellMouseX, setCellMouseX] = useState(Math.random())
  const [cellMouseY, setCellMouseY] = useState(Math.random())
  const cellRef = useRef<HTMLDivElement>(null)

  const handleClickCell = (): void => {
    setCellGradients(Array(4).fill(0).map(() => Math.random() * 2 * Math.PI))
  }
  const handleMouseMoveCell = (event: React.MouseEvent): void => {
    if (cellRef.current !== null) {
      const cellResolution = Math.min(width, MAX_CELL_RESOLUTION * 2) / 2
      const boundingRect = cellRef.current.getBoundingClientRect()
      setCellMouseX(Math.max(0, Math.min(1, (event.clientX - boundingRect.x - width / 2) / cellResolution + 1 / 2)))
      setCellMouseY(Math.max(0, Math.min(1, (event.clientY - boundingRect.y - cellResolution) / cellResolution + 1 / 2)))
    }
  }

  const cellResolution = Math.min(width, MAX_CELL_RESOLUTION * 2) / 2
  const cellLeft = (width - cellResolution) / 2
  const cellTop = cellResolution / 2
  const cellRight = cellLeft + cellResolution
  const cellBottom = cellTop + cellResolution
  const canvasMouseX = cellLeft + cellMouseX * cellResolution
  const canvasMouseY = cellTop + cellMouseY * cellResolution

  const gradient0 = { x: Math.cos(cellGradients[0]), y: Math.sin(cellGradients[0]) }
  const gradient1 = { x: Math.cos(cellGradients[1]), y: Math.sin(cellGradients[1]) }
  const gradient2 = { x: Math.cos(cellGradients[2]), y: Math.sin(cellGradients[2]) }
  const gradient3 = { x: Math.cos(cellGradients[3]), y: Math.sin(cellGradients[3]) }
  const dotProduct0 = cellMouseX * gradient0.x + cellMouseY * gradient0.y
  const dotProduct1 = (cellMouseX - 1) * gradient1.x + cellMouseY * gradient1.y
  const dotProduct2 = cellMouseX * gradient2.x + (cellMouseY - 1) * gradient2.y
  const dotProduct3 = (cellMouseX - 1) * gradient3.x + (cellMouseY - 1) * gradient3.y

  return (
    <div
      className={classes.interactable}
      ref={cellRef}
      onClick={handleClickCell}
      onMouseMove={handleMouseMoveCell}
    >
      <svg width={width} height={Math.min(width, MAX_CELL_RESOLUTION * 2)}>
        <defs>
          <marker
            id='arrow'
            viewBox='0 0 10 10'
            refX='5' refY='5'
            markerWidth='6' markerHeight='6'
            orient='auto-start-reverse'
          >
            <path d='M 0 0 L 10 5 L 0 10 z' />
          </marker>
        </defs>
        <rect
          x={cellLeft} y={cellTop}
          width={cellResolution} height={cellResolution}
          stroke='#7caff0' strokeWidth='2' fillOpacity='0'
        />
        <line
          x1={cellLeft} y1={cellTop}
          x2={cellLeft + cellResolution * gradient0.x / 2}
          y2={cellTop + cellResolution * gradient0.y / 2}
          stroke='#000000' strokeWidth='2'
          markerEnd='url(#arrow)'
        />
        <line
          x1={cellRight} y1={cellTop}
          x2={cellRight + cellResolution * gradient1.x / 2}
          y2={cellTop + cellResolution * gradient1.y / 2}
          stroke='#000000' strokeWidth='2'
          markerEnd='url(#arrow)'
        />
        <line
          x1={cellLeft} y1={cellBottom}
          x2={cellLeft + cellResolution * gradient2.x / 2}
          y2={cellBottom + cellResolution * gradient2.y / 2}
          stroke='#000000' strokeWidth='2'
          markerEnd='url(#arrow)'
        />
        <line
          x1={cellRight} y1={cellBottom}
          x2={cellRight + cellResolution * gradient3.x / 2}
          y2={cellBottom + cellResolution * gradient3.y / 2}
          stroke='#000000' strokeWidth='2'
          markerEnd='url(#arrow)'
        />
        <line
          x1={cellLeft} y1={cellTop}
          x2={canvasMouseX} y2={canvasMouseY}
          stroke={dotProduct0 >= 0 ? '#0000ff' : '#ff0000'} strokeWidth={5 * Math.abs(dotProduct0)}
        />
        <line
          x1={cellRight} y1={cellTop}
          x2={canvasMouseX} y2={canvasMouseY}
          stroke={dotProduct1 >= 0 ? '#0000ff' : '#ff0000'} strokeWidth={5 * Math.abs(dotProduct1)}
        />
        <line
          x1={cellLeft} y1={cellBottom}
          x2={canvasMouseX} y2={canvasMouseY}
          stroke={dotProduct2 >= 0 ? '#0000ff' : '#ff0000'} strokeWidth={5 * Math.abs(dotProduct2)}
        />
        <line
          x1={cellRight} y1={cellBottom}
          x2={canvasMouseX} y2={canvasMouseY}
          stroke={dotProduct3 >= 0 ? '#0000ff' : '#ff0000'} strokeWidth={5 * Math.abs(dotProduct3)}
        />
      </svg>
    </div>
  )
}

const MAX_INTERPOLATION_RESOLUTION = 200
const INTERPOLATION_PADDING = 20
const GRADIENT_WIDTH = 8
const CIRCLE_RADIUS = 10
interface Color { r: number, g: number, b: number }

const InterpolationExample = ({ width }: { width: number }): React.ReactElement => {
  const classes = useStyles()
  const [influenceValues, setInfluenceValues] = useState(Array(4).fill(0).map(() => ({
    r: Math.random() * 256,
    g: Math.random() * 256,
    b: Math.random() * 256
  })))
  const [cellMouseX, setCellMouseX] = useState(Math.random())
  const [cellMouseY, setCellMouseY] = useState(Math.random())
  const cellRef = useRef<HTMLDivElement>(null)

  const handleClickInterpolation = (): void => {
    setInfluenceValues(Array(4).fill(0).map(() => ({
      r: Math.random() * 256,
      g: Math.random() * 256,
      b: Math.random() * 256
    })))
  }
  const handleMouseMoveInterpolation = (event: React.MouseEvent): void => {
    if (cellRef.current !== null) {
      const cellResolution = Math.max(0, Math.min(width - INTERPOLATION_PADDING * 2, MAX_INTERPOLATION_RESOLUTION))
      const boundingRect = cellRef.current.getBoundingClientRect()
      setCellMouseX(Math.max(0, Math.min(1, (event.clientX - boundingRect.x - width / 2) / cellResolution + 1 / 2)))
      setCellMouseY(Math.max(0, Math.min(1, (event.clientY - boundingRect.y - cellResolution / 2 - INTERPOLATION_PADDING) / cellResolution + 1 / 2)))
    }
  }

  const interpolateColor = (a: Color, b: Color, t: number): Color => ({
    r: t * (b.r - a.r) + a.r,
    g: t * (b.g - a.g) + a.g,
    b: t * (b.b - a.b) + a.b
  })
  const toRGBString = (color: Color): string =>
    `rgb(${color.r}, ${color.g}, ${color.b})`

  const cellResolution = Math.max(0, Math.min(width - INTERPOLATION_PADDING * 2, MAX_INTERPOLATION_RESOLUTION))
  const cellLeft = (width - cellResolution) / 2
  const cellTop = INTERPOLATION_PADDING
  const cellRight = cellLeft + cellResolution
  const cellBottom = cellTop + cellResolution
  const canvasMouseX = cellLeft + cellMouseX * cellResolution
  const canvasMouseY = cellTop + cellMouseY * cellResolution

  const color0 = influenceValues[0]
  const color1 = influenceValues[1]
  const color2 = influenceValues[2]
  const color3 = influenceValues[3]
  const colorX0 = interpolateColor(color0, color1, cellMouseX)
  const colorX1 = interpolateColor(color2, color3, cellMouseX)
  const colorY0 = interpolateColor(colorX0, colorX1, cellMouseY)

  return (
    <div
      className={classes.interactable}
      ref={cellRef}
      onClick={handleClickInterpolation}
      onMouseMove={handleMouseMoveInterpolation}
    >
      <svg width={width} height={Math.min(width, MAX_INTERPOLATION_RESOLUTION + 2 * INTERPOLATION_PADDING)}>
        <defs>
          <linearGradient id='gradientX0'>
            <stop offset='0%' stopColor={toRGBString(color0)} />
            <stop offset='100%' stopColor={toRGBString(color1)} />
          </linearGradient>
          <linearGradient id='gradientX1'>
            <stop offset='0%' stopColor={toRGBString(color2)} />
            <stop offset='100%' stopColor={toRGBString(color3)} />
          </linearGradient>
          <linearGradient id='gradientY0' gradientTransform='rotate(90)'>
            <stop offset='0%' stopColor={toRGBString(colorX0)} />
            <stop offset='100%' stopColor={toRGBString(colorX1)} />
          </linearGradient>
        </defs>
        <rect
          x={cellLeft} y={cellTop}
          width={cellResolution} height={cellResolution}
          stroke='#7caff0' strokeWidth='2' fillOpacity='0'
        />
        <rect
          x={cellLeft} y={cellTop - GRADIENT_WIDTH / 2}
          width={cellResolution} height={GRADIENT_WIDTH}
          fill='url(#gradientX0)'
        />
        <rect
          x={cellLeft} y={cellBottom - GRADIENT_WIDTH / 2}
          width={cellResolution} height={GRADIENT_WIDTH}
          fill='url(#gradientX1)'
        />
        <rect
          x={canvasMouseX - GRADIENT_WIDTH / 2} y={cellTop}
          width={GRADIENT_WIDTH} height={cellResolution}
          fill='url(#gradientY0)'
        />
        <circle
          cx={cellLeft}
          cy={cellTop}
          r={CIRCLE_RADIUS}
          fill={toRGBString(color0)}
        />
        <circle
          cx={cellRight}
          cy={cellTop}
          r={CIRCLE_RADIUS}
          fill={toRGBString(color1)}
        />
        <circle
          cx={cellLeft}
          cy={cellBottom}
          r={CIRCLE_RADIUS}
          fill={toRGBString(color2)}
        />
        <circle
          cx={cellRight}
          cy={cellBottom}
          r={CIRCLE_RADIUS}
          fill={toRGBString(color3)}
        />
        <circle
          cx={canvasMouseX}
          cy={cellTop}
          r={CIRCLE_RADIUS}
          fill={toRGBString(colorX0)}
        />
        <circle
          cx={canvasMouseX}
          cy={cellBottom}
          r={CIRCLE_RADIUS}
          fill={toRGBString(colorX1)}
        />
        <circle
          cx={canvasMouseX}
          cy={canvasMouseY}
          r={CIRCLE_RADIUS}
          fill={toRGBString(colorY0)}
        />
      </svg>
    </div>
  )
}

const GRAPH_RESOLUTION = 100
const GRAPH_INTERVAL = 1
const GRAPH_PADDING = 5
const INTERPOLATION = (t: number): number => t * t * t * (t * (t * 6 - 15) + 10)

const OctaveExample = ({ width }: { width: number }): React.ReactElement => {
  const classes = useStyles()
  const [graphOffsetX, setGraphOffsetX] = useState(0)
  const [graphDrag, setGraphDrag] = useState<{x: number} | null>(null)
  const [octaves, setOctaves] = useState(1)
  const graphValues = useRef<Record<number, number>>({}).current

  const handleMouseDownGraph = (event: React.MouseEvent): void => {
    setGraphDrag({ x: event.clientX })
  }
  const handleMouseUpGraph = (): void => {
    setGraphDrag(null)
  }
  const handleDragGraph = (event: React.MouseEvent): void => {
    if (graphDrag !== null) {
      setGraphOffsetX(graphOffsetX + event.clientX - graphDrag.x)
      setGraphDrag({ x: event.clientX })
    }
  }
  const handleClickSubtractOctave = (): void => {
    setOctaves(Math.max(1, octaves - 1))
  }
  const handleClickAddOctave = (): void => {
    setOctaves(octaves + 1)
  }

  const getGraphValue = (x: number): number => {
    return graphValues[x] ?? (graphValues[x] = Math.random() > 0.5 ? 1 : -1)
  }

  const getNoiseValue = (x: number): number => {
    let value = 0
    let scale = 1
    let persistence = 1

    for (let octave = 0; octave < octaves; ++octave) {
      const xPrime = x * scale
      const intX = Math.floor(xPrime)
      const x0 = getGraphValue(intX) * (xPrime - intX)
      const x1 = getGraphValue(intX + 1) * (xPrime - (intX + 1))

      value += (INTERPOLATION(xPrime - intX) * (x1 - x0) + x0) * persistence
      scale *= 2
      persistence /= 2
    }

    return value
  }

  const left = graphOffsetX >= 0 ? graphOffsetX % GRAPH_RESOLUTION : graphOffsetX % GRAPH_RESOLUTION + GRAPH_RESOLUTION
  const leftX = -graphOffsetX / GRAPH_RESOLUTION

  return (
    <div
      className={classes.interactable}
      onMouseDown={handleMouseDownGraph}
      onMouseUp={handleMouseUpGraph}
      onMouseMove={handleDragGraph}
    >
      <svg width={width} height={(GRAPH_RESOLUTION + GRAPH_PADDING) * 2}>
        <line
          x1={GRAPH_PADDING} y1={GRAPH_RESOLUTION * 2 + GRAPH_PADDING}
          x2={GRAPH_PADDING} y2={GRAPH_PADDING}
          stroke='#7caff0' strokeWidth='3'
        />
        <line
          x1={GRAPH_PADDING} y1={GRAPH_RESOLUTION * 2 + GRAPH_PADDING}
          x2={width - GRAPH_PADDING} y2={GRAPH_RESOLUTION * 2 + GRAPH_PADDING}
          stroke='#7caff0' strokeWidth='3'
        />
        {(() => {
          const children: React.ReactNode[] = []

          for (let index = 0, canvasX = GRAPH_PADDING + left; canvasX <= width - GRAPH_PADDING; ++index, canvasX += GRAPH_RESOLUTION) {
            children.push(
              <line
                key={index}
                x1={canvasX} y1={GRAPH_RESOLUTION * 2 + GRAPH_PADDING}
                x2={canvasX} y2={GRAPH_PADDING}
                stroke='#7caff0' strokeWidth='1'
              />
            )
          }

          const points: string[] = []
          for (let x = 0; x <= width - GRAPH_PADDING * 2; x += GRAPH_INTERVAL) {
            const noise = getNoiseValue(leftX + x / GRAPH_RESOLUTION)
            points.push(`${GRAPH_PADDING + x},${GRAPH_RESOLUTION + GRAPH_PADDING - noise * GRAPH_RESOLUTION}`)
          }
          children.push(
            <polyline
              key='graph'
              points={points.join(' ')}
              stroke='#000000'
              strokeWidth='2'
              fill='none'
            />
          )

          return children
        })()}
        <text
          x={width / 2}
          y={GRAPH_PADDING + 5}
          dominantBaseline='hanging'
          textAnchor='middle'
        >
          Octaves: {octaves}
        </text>
      </svg>
      <Box textAlign='center'>
        <ButtonGroup color='primary' disableElevation>
          <IconButton onClick={handleClickSubtractOctave}>
            <RemoveIcon />
          </IconButton>
          <IconButton onClick={handleClickAddOctave}>
            <AddIcon />
          </IconButton>
        </ButtonGroup>
      </Box>
    </div>
  )
}

export default PFPerlin
