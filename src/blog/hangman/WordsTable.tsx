import React, { useState } from 'react'
import { styled } from '@mui/system'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Collapse from '@mui/material/Collapse'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

const LENGTHS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

const Word = styled('span')(() => ({
  fontFamily: 'monospace'
}))

interface Props {
  data: any // ???
}

const WordsTable = ({ data }: Props): React.ReactElement => {
  const [show, setShow] = useState(false)

  const toggleShow = (): void => {
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
                      <Word>{datum.word}</Word>
                      <br />
                      {datum.diff.toFixed(2)}
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
