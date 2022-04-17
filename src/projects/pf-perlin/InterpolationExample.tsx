import React, { useRef, useState } from 'react'

const MAX_INTERPOLATION_RESOLUTION = 200
const INTERPOLATION_PADDING = 20
const GRADIENT_WIDTH = 8
const CIRCLE_RADIUS = 10
interface Color { r: number, g: number, b: number }

function randomColors (): Color[] {
  return Array(4).fill(0).map(() => ({
    r: Math.random() * 256,
    g: Math.random() * 256,
    b: Math.random() * 256
  }))
}

function interpolateColor (a: Color, b: Color, t: number): Color {
  return {
    r: t * (b.r - a.r) + a.r,
    g: t * (b.g - a.g) + a.g,
    b: t * (b.b - a.b) + a.b
  }
}

function toRGBString (color: Color): string {
  return `rgb(${color.r}, ${color.g}, ${color.b})`
}

const InterpolationExample = ({ width }: { width: number }): React.ReactElement => {
  const [influenceValues, setInfluenceValues] = useState(randomColors())
  const [cellMouseX, setCellMouseX] = useState(Math.random())
  const [cellMouseY, setCellMouseY] = useState(Math.random())
  const cellRef = useRef<HTMLDivElement>(null)

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

  const handleClickInterpolation = (event: React.MouseEvent): void => {
    setInfluenceValues(randomColors)
    event.preventDefault()
  }

  const handleMouseMoveInterpolation = (event: React.MouseEvent): void => {
    if (cellRef.current !== null) {
      const cellResolution = Math.max(0, Math.min(width - INTERPOLATION_PADDING * 2, MAX_INTERPOLATION_RESOLUTION))
      const boundingRect = cellRef.current.getBoundingClientRect()
      setCellMouseX(Math.max(0, Math.min(1, (event.clientX - boundingRect.x - width / 2) / cellResolution + 1 / 2)))
      setCellMouseY(Math.max(0, Math.min(1, (event.clientY - boundingRect.y - cellResolution / 2 - INTERPOLATION_PADDING) / cellResolution + 1 / 2)))
    }
    event.preventDefault()
  }

  return (
    <div
      ref={cellRef}
      onClick={handleClickInterpolation}
      onMouseMove={handleMouseMoveInterpolation}
      style={{ cursor: 'pointer' }}
    >
      <svg
        width={width}
        height={Math.min(width, MAX_INTERPOLATION_RESOLUTION + 2 * INTERPOLATION_PADDING)}
      >
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
          x={cellLeft}
          y={cellTop}
          width={cellResolution}
          height={cellResolution}
          stroke='#7caff0'
          strokeWidth='2'
          fillOpacity='0'
        />
        <rect
          x={cellLeft}
          y={cellTop - GRADIENT_WIDTH / 2}
          width={cellResolution}
          height={GRADIENT_WIDTH}
          fill='url(#gradientX0)'
        />
        <rect
          x={cellLeft}
          y={cellBottom - GRADIENT_WIDTH / 2}
          width={cellResolution}
          height={GRADIENT_WIDTH}
          fill='url(#gradientX1)'
        />
        <rect
          x={canvasMouseX - GRADIENT_WIDTH / 2}
          y={cellTop}
          width={GRADIENT_WIDTH}
          height={cellResolution}
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

export default InterpolationExample
