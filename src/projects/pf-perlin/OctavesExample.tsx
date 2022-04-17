import React, { useRef, useState } from 'react'
import Box from '@mui/material/Box'
import ButtonGroup from '@mui/material/ButtonGroup'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

const GRAPH_RESOLUTION = 100
const GRAPH_INTERVAL = 1
const GRAPH_PADDING = 5
const INTERPOLATION = (t: number): number => t * t * t * (t * (t * 6 - 15) + 10)

const OctavesExample = ({ width }: { width: number }): React.ReactElement => {
  const [graphOffsetX, setGraphOffsetX] = useState(0)
  const [graphDrag, setGraphDrag] = useState<{x: number} | null>(null)
  const [octaves, setOctaves] = useState(3)
  const graphValues = useRef<Record<number, number>>({}).current

  const left = graphOffsetX >= 0 ? graphOffsetX % GRAPH_RESOLUTION : graphOffsetX % GRAPH_RESOLUTION + GRAPH_RESOLUTION
  const leftX = -graphOffsetX / GRAPH_RESOLUTION

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

  const handleMouseDownGraph = (event: React.MouseEvent): void => {
    setGraphDrag({ x: event.clientX })
    event.preventDefault()
  }

  const handleMouseUpGraph = (event: React.MouseEvent): void => {
    setGraphDrag(null)
    event.preventDefault()
  }

  const handleDragGraph = (event: React.MouseEvent): void => {
    if (graphDrag !== null) {
      setGraphOffsetX(graphOffsetX + event.clientX - graphDrag.x)
      setGraphDrag({ x: event.clientX })
    }
    event.preventDefault()
  }

  const handleClickSubtractOctave = (): void => {
    setOctaves(Math.max(1, octaves - 1))
  }

  const handleClickAddOctave = (): void => {
    setOctaves(octaves + 1)
  }

  return (
    <div
      onMouseDown={handleMouseDownGraph}
      onMouseUp={handleMouseUpGraph}
      onMouseMove={handleDragGraph}
      style={{ cursor: 'pointer' }}
    >
      <svg
        width={width}
        height={(GRAPH_RESOLUTION + GRAPH_PADDING) * 2}
      >
        <line
          x1={GRAPH_PADDING}
          y1={GRAPH_RESOLUTION * 2 + GRAPH_PADDING}
          x2={GRAPH_PADDING}
          y2={GRAPH_PADDING}
          stroke='#7caff0'
          strokeWidth='3'
        />
        <line
          x1={GRAPH_PADDING}
          y1={GRAPH_RESOLUTION * 2 + GRAPH_PADDING}
          x2={width - GRAPH_PADDING}
          y2={GRAPH_RESOLUTION * 2 + GRAPH_PADDING}
          stroke='#7caff0'
          strokeWidth='3'
        />
        {(() => {
          const children: React.ReactNode[] = []

          for (let index = 0, canvasX = GRAPH_PADDING + left; canvasX <= width - GRAPH_PADDING; ++index, canvasX += GRAPH_RESOLUTION) {
            children.push(
              <line
                key={index}
                x1={canvasX}
                y1={GRAPH_RESOLUTION * 2 + GRAPH_PADDING}
                x2={canvasX}
                y2={GRAPH_PADDING}
                stroke='#7caff0'
                strokeWidth='1'
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
        <ButtonGroup>
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

export default OctavesExample
