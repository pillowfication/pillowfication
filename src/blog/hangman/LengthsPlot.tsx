import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { $ } from '../../MathJax'

const LENGTHS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

const useStyles = makeStyles((theme) => ({
  lengthsPlot: {
    position: 'relative',
    height: 250,
    margin: theme.spacing(2, 0, 6)
  },
  header: {
    textAlign: 'center',
    position: 'relative',
    top: '-1em',
    width: '100%'
  },
  body: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  grid: {
    position: 'absolute',
    width: '100%',
    height: 0
  },
  gridLabel: {
    position: 'absolute',
    top: '-0.75em',
    width: theme.spacing(3),
    textAlign: 'right',
    fontSize: '0.8em'
  },
  gridLine: {
    position: 'absolute',
    right: 0,
    left: theme.spacing(4),
    height: 1,
    backgroundColor: 'gray'
  },
  boxPlotContainer: {
    marginLeft: theme.spacing(4),
    height: '100%'
  },
  boxPlot: {
    display: 'inline-block',
    position: 'relative',
    width: `calc(100% / ${LENGTHS.length})`,
    height: '100%'
  },
  box: {
    position: 'absolute',
    left: '5%',
    right: '5%',
    border: '1px solid black',
    backgroundColor: theme.palette.primary.light
  },
  median: {
    position: 'absolute',
    left: '5%',
    right: '5%',
    height: 2,
    backgroundColor: 'black'
  },
  whiskers: {
    position: 'absolute',
    left: '25%',
    right: '25%',
    borderTop: '1px solid black',
    borderBottom: '1px solid black',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 'calc(50% - 0.5px)',
      bottom: 0,
      width: 1,
      backgroundColor: 'black'
    }
  }
}))

function offset (percent: number, offset: number): string {
  return `calc(${percent}% - ${offset}px)`
}

interface Props {
  header: string
  data: any // ???
}

const LengthsPlot = ({ header, data }: Props): React.ReactElement => {
  const classes = useStyles()

  return (
    <div className={classes.lengthsPlot}>
      <div className={classes.header}>{header}</div>
      <div className={classes.body}>
        {[0, 5, 10, 15, 20].map(difficulty =>
          <div
            key={difficulty}
            className={classes.grid}
            style={{ bottom: offset(difficulty * 5, 0.5) }}
          >
            <div className={classes.gridLabel}>{$(String(difficulty))}</div>
            <div className={classes.gridLine} />
          </div>
        )}
        <div className={classes.boxPlotContainer}>
          {LENGTHS.map(length => {
            const [min, Q1, Q2, Q3, max] = data[length]
            return (
              <div key={length} className={classes.boxPlot}>
                <div className={classes.whiskers} style={{ top: offset((20 - max) * 5, 0.5), bottom: offset(min * 5, 0.5) }} />
                <div className={classes.box} style={{ top: offset((20 - Q3) * 5, 0.5), bottom: offset(Q1 * 5, 0.5) }} />
                <div className={classes.median} style={{ bottom: offset(Q2 * 5, 1) }} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default LengthsPlot
