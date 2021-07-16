import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Collapse from '@material-ui/core/Collapse'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

const LENGTHS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

const useStyles = makeStyles(() => ({
  word: {
    fontFamily: 'monospace',
    fontSize: '1.25em'
  },
  difficulty: {
    fontSize: '0.8em'
  }
}))

interface Props {
  data: any // ???
}

const WordsTable = ({ data }: Props): React.ReactElement => {
  const classes = useStyles()
  const [show, setShow] = useState(false)

  const toggleShow = () => {
    setShow(!show)
  }

  return (
    <Box component={Paper} mb={2}>
      <Button fullWidth onClick={toggleShow}>{show ? 'Hide' : 'Show'} Table</Button>
      <Collapse in={show}>
        <TableContainer>
          <Table size='small'>
            <TableBody>
              {LENGTHS.map(length =>
                <TableRow key={length}>
                  {data[length].map((datum: any) =>
                    <TableCell key={datum.word} align='center'>
                      <Typography component='span' className={classes.word}>{datum.word}</Typography>
                      <br />
                      <Typography component='span' className={classes.difficulty}>{datum.diff.toFixed(2)}</Typography>
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Collapse>
    </Box>
  )
}

export default WordsTable
