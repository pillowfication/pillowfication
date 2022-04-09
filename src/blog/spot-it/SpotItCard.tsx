import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'

const THETA = 2 * Math.PI / 7

const useStyles = makeStyles(theme => ({
  card: {
    display: 'inline-block',
    position: 'relative',
    width: ({ size }: { size: number }) => size,
    height: ({ size }: { size: number }) => size,
    margin: theme.spacing(1),
    borderRadius: '50%',
    border: '2px solid black',
    backgroundColor: 'white'
  },
  noMargin: {
    margin: 0
  },
  symbol: {
    display: 'flex',
    position: 'absolute',
    width: ({ size }: { size: number }) => size * 0.25,
    height: ({ size }: { size: number }) => size * 0.25,
    marginLeft: ({ size }: { size: number }) => size * -0.125,
    marginTop: ({ size }: { size: number }) => size * -0.125,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible'
  },
  symbol1: { top: '50%', left: '50%' },
  symbol2: { top: `${50 - Math.cos(THETA * 0) * 33}%`, left: `${50 + Math.sin(THETA * 0) * 33}%` },
  symbol3: { top: `${50 - Math.cos(THETA * 1) * 33}%`, left: `${50 + Math.sin(THETA * 1) * 33}%` },
  symbol4: { top: `${50 - Math.cos(THETA * 2) * 33}%`, left: `${50 + Math.sin(THETA * 2) * 33}%` },
  symbol5: { top: `${50 - Math.cos(THETA * 3) * 33}%`, left: `${50 + Math.sin(THETA * 3) * 33}%` },
  symbol6: { top: `${50 - Math.cos(THETA * 4) * 33}%`, left: `${50 + Math.sin(THETA * 4) * 33}%` },
  symbol7: { top: `${50 - Math.cos(THETA * 5) * 33}%`, left: `${50 + Math.sin(THETA * 5) * 33}%` },
  symbol8: { top: `${50 - Math.cos(THETA * 6) * 33}%`, left: `${50 + Math.sin(THETA * 6) * 33}%` }
}))

interface Props {
  size?: number
  noMargin?: boolean
  symbols: [
    React.ReactElement | null,
    React.ReactElement | null,
    React.ReactElement | null,
    React.ReactElement | null,
    React.ReactElement | null,
    React.ReactElement | null,
    React.ReactElement | null,
    React.ReactElement | null
  ]
}

const SpotItCard = ({ size = 150, noMargin, symbols }: Props): React.ReactElement => {
  const classes = useStyles({ size })

  return (
    <div className={clsx(classes.card, noMargin === true && classes.noMargin)}>
      <div className={clsx(classes.symbol, classes.symbol1)}>{symbols[0]}</div>
      <div className={clsx(classes.symbol, classes.symbol2)}>{symbols[1]}</div>
      <div className={clsx(classes.symbol, classes.symbol3)}>{symbols[2]}</div>
      <div className={clsx(classes.symbol, classes.symbol4)}>{symbols[3]}</div>
      <div className={clsx(classes.symbol, classes.symbol5)}>{symbols[4]}</div>
      <div className={clsx(classes.symbol, classes.symbol6)}>{symbols[5]}</div>
      <div className={clsx(classes.symbol, classes.symbol7)}>{symbols[6]}</div>
      <div className={clsx(classes.symbol, classes.symbol8)}>{symbols[7]}</div>
    </div>
  )
}

export default SpotItCard
