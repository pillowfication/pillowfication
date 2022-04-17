import React, { useRef, useState } from 'react'

const MAX_CELL_RESOLUTION = 200

function randomGradients (): number[] {
  return Array(4).fill(0).map(() => Math.random() * 2 * Math.PI)
}

function clamp (num: number): number {
  return Math.max(0, Math.min(1, num))
}

const CellExample = ({ width }: { width: number }): React.ReactElement => {
  const [cellGradients, setCellGradients] = useState(randomGradients())
  const [cellMouseX, setCellMouseX] = useState(Math.random())
  const [cellMouseY, setCellMouseY] = useState(Math.random())
  const cellRef = useRef<HTMLDivElement>(null)

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

  const handleClickCell = (event: React.MouseEvent): void => {
    setCellGradients(randomGradients())
    event.preventDefault()
  }

  const handleMouseMoveCell = (event: React.MouseEvent): void => {
    if (cellRef.current !== null) {
      const cellResolution = Math.min(width, MAX_CELL_RESOLUTION * 2) / 2
      const boundingRect = cellRef.current.getBoundingClientRect()
      setCellMouseX(clamp(
        (event.clientX - boundingRect.x - width / 2) / cellResolution + 1 / 2
      ))
      setCellMouseY(clamp(
        (event.clientY - boundingRect.y - cellResolution) / cellResolution + 1 / 2
      ))
    }
    event.preventDefault()
  }

  return (
    <div
      ref={cellRef}
      onClick={handleClickCell}
      onMouseMove={handleMouseMoveCell}
      style={{ cursor: 'pointer' }}
    >
      <svg
        width={width}
        height={Math.min(width, MAX_CELL_RESOLUTION * 2)}
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
        <rect
          x={cellLeft}
          y={cellTop}
          width={cellResolution}
          height={cellResolution}
          stroke='#7caff0'
          strokeWidth='2'
          fillOpacity='0'
        />
        <line
          x1={cellLeft}
          y1={cellTop}
          x2={cellLeft + cellResolution * gradient0.x / 2}
          y2={cellTop + cellResolution * gradient0.y / 2}
          stroke='#000000'
          strokeWidth='2'
          markerEnd='url(#arrow)'
        />
        <line
          x1={cellRight}
          y1={cellTop}
          x2={cellRight + cellResolution * gradient1.x / 2}
          y2={cellTop + cellResolution * gradient1.y / 2}
          stroke='#000000'
          strokeWidth='2'
          markerEnd='url(#arrow)'
        />
        <line
          x1={cellLeft}
          y1={cellBottom}
          x2={cellLeft + cellResolution * gradient2.x / 2}
          y2={cellBottom + cellResolution * gradient2.y / 2}
          stroke='#000000'
          strokeWidth='2'
          markerEnd='url(#arrow)'
        />
        <line
          x1={cellRight}
          y1={cellBottom}
          x2={cellRight + cellResolution * gradient3.x / 2}
          y2={cellBottom + cellResolution * gradient3.y / 2}
          stroke='#000000'
          strokeWidth='2'
          markerEnd='url(#arrow)'
        />
        <line
          x1={cellLeft} y1={cellTop}
          x2={canvasMouseX} y2={canvasMouseY}
          stroke={dotProduct0 >= 0 ? '#0000ff' : '#ff0000'}
          strokeWidth={10 * Math.abs(dotProduct0)}
          strokeLinecap='round'
        />
        <line
          x1={cellRight} y1={cellTop}
          x2={canvasMouseX} y2={canvasMouseY}
          stroke={dotProduct1 >= 0 ? '#0000ff' : '#ff0000'}
          strokeWidth={10 * Math.abs(dotProduct1)}
          strokeLinecap='round'
        />
        <line
          x1={cellLeft} y1={cellBottom}
          x2={canvasMouseX} y2={canvasMouseY}
          stroke={dotProduct2 >= 0 ? '#0000ff' : '#ff0000'}
          strokeWidth={10 * Math.abs(dotProduct2)}
          strokeLinecap='round'
        />
        <line
          x1={cellRight} y1={cellBottom}
          x2={canvasMouseX} y2={canvasMouseY}
          stroke={dotProduct3 >= 0 ? '#0000ff' : '#ff0000'}
          strokeWidth={10 * Math.abs(dotProduct3)}
          strokeLinecap='round'
        />
      </svg>
    </div>
  )
}

export default CellExample
