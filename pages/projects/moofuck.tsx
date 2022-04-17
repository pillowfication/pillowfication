import React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Blog from '../../src/blog/Blog'
import Section from '../../src/blog/Section'
import Playground from '../../src/projects/moofuck/Playground'

const Moofuck = (): React.ReactElement => {
  return (
    <Blog title='Moofuck'>
      <Section>
        <Typography paragraph>Moofuck is a language designed to consist entirely of “moo”s. A “moo” ends with either a LF or CRLF. Anything else is ignored. 3 “moo”s in a row form a codon, and the 8 possible codons are mapped to the 8 <Link href='https://en.wikipedia.org/wiki/Brainfuck'>Brainfuck</Link> commands as follows:</Typography>
        <Box mb={2}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>Moofuck</TableCell>
                  <TableCell align='center'>Brainfuck</TableCell>
                  <TableCell align='center'>Instruction</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align='center'><kbd>LF LF LF</kbd></TableCell>
                  <TableCell align='center'><kbd>{'>'}</kbd></TableCell>
                  <TableCell>Increment the data pointer</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='center'><kbd>LF LF CRLF</kbd></TableCell>
                  <TableCell align='center'><kbd>{'<'}</kbd></TableCell>
                  <TableCell>Decrement the data pointer</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='center'><kbd>LF CRLF LF</kbd></TableCell>
                  <TableCell align='center'><kbd>+</kbd></TableCell>
                  <TableCell>Increment the byte at the data pointer</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='center'><kbd>LF CRLF CRLF</kbd></TableCell>
                  <TableCell align='center'><kbd>-</kbd></TableCell>
                  <TableCell>Decrement the byte at the data pointer</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='center'><kbd>CRLF LF LF</kbd></TableCell>
                  <TableCell align='center'><kbd>.</kbd></TableCell>
                  <TableCell>Output the byte at the data pointer</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='center'><kbd>CRLF LF CRLF</kbd></TableCell>
                  <TableCell align='center'><kbd>,</kbd></TableCell>
                  <TableCell>Accept one byte of input and store its value in the byte at the data pointer</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='center'><kbd>CRLF CRLF LF</kbd></TableCell>
                  <TableCell align='center'><kbd>[</kbd></TableCell>
                  <TableCell>If the byte at the data pointer is <samp>0</samp>, jump the instruction pointer forward to the matching <kbd>]</kbd></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='center'><kbd>CRLF CRLF CRLF</kbd></TableCell>
                  <TableCell align='center'><kbd>]</kbd></TableCell>
                  <TableCell>Jump the instruction pointer back to the matching <kbd>[</kbd></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Typography paragraph>All errors are thrown as <code>new Error('moo')</code>.</Typography>
      </Section>
      <Playground />
    </Blog>
  )
}

export default Moofuck
