import React, { useRef, useState } from 'react'

const GRID_RESOLUTION = 50
const GRID_HEIGHT = 200

const GridExample = ({ width }: { width: number }): React.ReactElement => {
  const [gridOffsetX, setGridOffsetX] = useState(0)
  const [gridOffsetY, setGridOffsetY] = useState(0)
  const [gridDrag, setGridDrag] = useState<{ x: number, y: number } | null>(null)
  const gridTheta = useRef<Record<number, Record<number, number>>>({}).current

  const handleMouseDownGrid = (event: React.MouseEvent): void => {
    setGridDrag({ x: event.clientX, y: event.clientY })
    event.preventDefault()
  }
  const handleMouseUpGrid = (event: React.MouseEvent): void => {
    setGridDrag(null)
    event.preventDefault()
  }
  const handleDragGrid = (event: React.MouseEvent): void => {
    if (gridDrag !== null) {
      setGridOffsetX(gridOffsetX + event.clientX - gridDrag.x)
      setGridOffsetY(gridOffsetY + event.clientY - gridDrag.y)
      setGridDrag({ x: event.clientX, y: event.clientY })
    }
    event.preventDefault()
  }

  const getGridTheta = (x: number, y: number): number => {
    const axis = gridTheta[x] ?? (gridTheta[x] = {})
    return axis[y] ?? (axis[y] = Math.random() * 2 * Math.PI)
  }

  const left = gridOffsetX < 0
    ? gridOffsetX % GRID_RESOLUTION
    : gridOffsetX % GRID_RESOLUTION - GRID_RESOLUTION
  const up = gridOffsetY < 0
    ? gridOffsetY % GRID_RESOLUTION
    : gridOffsetY % GRID_RESOLUTION - GRID_RESOLUTION
  const startX = -Math.floor((gridOffsetX + width / 2) / GRID_RESOLUTION) - 1
  const startCanvasX = ((width / 2 + left) % GRID_RESOLUTION) - GRID_RESOLUTION
  const startY = -Math.floor((gridOffsetY + GRID_HEIGHT / 2) / GRID_RESOLUTION) - 1
  const startCanvasY = ((GRID_HEIGHT / 2 + up) % GRID_RESOLUTION) - GRID_RESOLUTION

  return (
    <svg
      width={width}
      height={GRID_HEIGHT}
      onMouseDown={handleMouseDownGrid}
      onMouseUp={handleMouseUpGrid}
      onMouseMove={handleDragGrid}
      style={{ cursor: 'pointer' }}
    >
      <defs>
        <marker
          id='arrow'
          viewBox='0 0 10 10'
          refX='5'
          refY='5'
          markerWidth='6'
          markerHeight='6'
          orient='auto-start-reverse'
        >
          <path d='M0,0 L10,5 L0,10 z' />
        </marker>
      </defs>
      {(() => {
        const children: React.ReactNode[] = []

        for (let x = startX, canvasX = startCanvasX; canvasX <= width + GRID_RESOLUTION; ++x, canvasX += GRID_RESOLUTION) {
          children.push(
            <line
              key={`x${x}`}
              x1={canvasX}
              y1={0}
              x2={canvasX}
              y2={GRID_HEIGHT}
              stroke='#7caff0'
            />
          )
        }
        for (let y = startY, canvasY = startCanvasY; canvasY <= GRID_HEIGHT + GRID_RESOLUTION; ++y, canvasY += GRID_RESOLUTION) {
          children.push(
            <line
              key={`y${y}`}
              x1={0}
              y1={canvasY}
              x2={width}
              y2={canvasY}
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
                x1={canvasX}
                y1={canvasY}
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
  )
}

export default GridExample
