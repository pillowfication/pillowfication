import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Blog from '../../src/blog/Blog'
import Section from '../../src/blog/Section'

const stats = {
  lengthFrequency: {
    2: { count: 124, percentage: 0.046311685110419755 },
    3: { count: 1292, percentage: 0.48253788034405104 },
    4: { count: 5454, percentage: 2.036967182195398 },
    5: { count: 12478, percentage: 4.6603000549017555 },
    6: { count: 22157, percentage: 8.275225862835246 },
    7: { count: 32909, percentage: 12.290897139506482 },
    8: { count: 40161, percentage: 14.999383755802967 },
    9: { count: 40727, percentage: 15.21077418945214 },
    10: { count: 35529, percentage: 13.269418228129867 },
    11: { count: 27893, percentage: 10.417514780523696 },
    12: { count: 20297, percentage: 7.5805505861789495 },
    13: { count: 13857, percentage: 5.175330811089408 },
    14: { count: 9116, percentage: 3.4046558182789233 },
    15: { count: 5757, percentage: 2.150132025650698 },
    total: 267751
  },
  letterFrequency: {
    A: { count: 188703, percentage: 7.736066180645547 },
    B: { count: 44953, percentage: 1.8428927098061998 },
    C: { count: 98230, percentage: 4.02703603506469 },
    D: { count: 81731, percentage: 3.3506432065751004 },
    E: { count: 275582, percentage: 11.297756740458082 },
    F: { count: 28930, percentage: 1.1860139722530945 },
    G: { count: 67910, percentage: 2.7840376375979137 },
    H: { count: 60702, percentage: 2.4885385462740177 },
    I: { count: 220483, percentage: 9.03891872258137 },
    J: { count: 4010, percentage: 0.16439391734306633 },
    K: { count: 22075, percentage: 0.9049864651741121 },
    L: { count: 127865, percentage: 5.241952179818248 },
    M: { count: 70700, percentage: 2.8984164479189003 },
    N: { count: 163637, percentage: 6.708460711288615 },
    O: { count: 161752, percentage: 6.631183271340564 },
    P: { count: 73286, percentage: 3.0044320764099646 },
    Q: { count: 4104, percentage: 0.16824754034312825 },
    R: { count: 170521, percentage: 6.990677102059105 },
    S: { count: 234672, percentage: 9.620610815643905 },
    T: { count: 159471, percentage: 6.5376714196050205 },
    U: { count: 80636, percentage: 3.3057525982233162 },
    V: { count: 22521, percentage: 0.9232706764297249 },
    W: { count: 18393, percentage: 0.7540392323419 },
    X: { count: 6852, percentage: 0.28090451911089537 },
    Y: { count: 39772, percentage: 1.630492488919809 },
    Z: { count: 11772, percentage: 0.48260478677370994 },
    total: 2439263
  }
}

const useStyles = makeStyles((theme) => ({
  barGraph: {
    border: 'none',
    '& th, & td': {
      padding: theme.spacing(0, 1)
    }
  },
  datum: {
    width: '100%',
    position: 'relative'
  },
  bar: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '2rem',
    backgroundColor: theme.palette.primary.main
  },
  displayValue: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: '2rem',
    padding: '0 0.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.66)',
    overflow: 'visible',
    opacity: 0,
    transition: 'opacity 0.2s',
    ':hover > &': {
      opacity: 1
    }
  }
}))

const PFSowpods = (): React.ReactElement => {
  const lengthStats: Array<{ label: string, value: number, displayValue: string }> = []
  for (let length = 2; length <= 15; ++length) {
    const stat = stats.lengthFrequency[length]
    lengthStats.push({
      label: String(length),
      value: stat.count,
      displayValue: `${(stat.count as number).toLocaleString()} (${(stat.percentage as number).toFixed(2)}%)`
    })
  }

  const letterStats: Array<{ label: string, value: number, displayValue: string }> = []
  for (const letter of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
    const stat = stats.letterFrequency[letter]
    letterStats.push({
      label: letter,
      value: stat.count,
      displayValue: `${(stat.count as number).toLocaleString()} (${(stat.percentage as number).toFixed(2)}%)`
    })
  }

  return (
    <Blog title='pf-sowpods'>
      <Section>
        <Typography paragraph>This package exports the <Link href='https://en.wikipedia.org/wiki/Collins_Scrabble_Words'>SOWPODS</Link> dictionary and related functionality.</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <BarGraph title='Word Length Frequencies' stats={lengthStats} />
          </Grid>
          <Grid item xs={12} md={6}>
            <BarGraph title='Letter Frequencies' stats={letterStats} />
          </Grid>
        </Grid>
      </Section>
    </Blog>
  )
}

const BarGraph = ({ title, stats }: { title: string, stats: Array<{ label: string, value: number, displayValue: string }> }): React.ReactElement => {
  const classes = useStyles()
  const maxValue = Math.max(...stats.map(stat => stat.value))

  return (
    <div>
      <Box textAlign='center'>
        <Typography>{title}</Typography>
      </Box>
      <table className={classes.barGraph}>
        <tbody>
          {stats.map((stat, index) =>
            <tr key={index}>
              <th align='center'>
                <Typography>{stat.label}</Typography>
              </th>
              <td className={classes.datum}>
                <div className={classes.bar} style={{ width: `${stat.value / maxValue * 100}%` }} />
                <div className={classes.displayValue}>
                  <Typography>{stat.displayValue}</Typography>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default PFSowpods
