import React from 'react'
import Paper from '@mui/material/Paper'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Section from '../../blog/Section'

import 'awesome-dings/css/awesome-dings.css'

function isControlCharacter (charCode: number): boolean {
  return charCode <= 31 || charCode === 127
}

function toHex2 (num: number): string {
  const hex = num.toString(16).toUpperCase()
  return '0x' + (hex.length < 2 ? '0' + hex : hex)
}

const AdIcon = ({ font, char }: { font: string, char: string }): React.ReactElement => {
  return (
    <i
      className={font}
      style={{
        fontSize: 32
      }}
    >
      {char}
    </i>
  )
}

const Cheatsheet = (): React.ReactElement => {
  return (
    <Section title='Cheatsheet'>
      <TableContainer component={Paper}>
        <Table size='small' sx={{ '& td': { padding: 0 } }}>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Code</TableCell>
              <TableCell align='center'>Hex</TableCell>
              <TableCell align='center'>Character</TableCell>
              <TableCell align='center'>Webdings</TableCell>
              <TableCell align='center'>Wingdings 1</TableCell>
              <TableCell align='center'>Wingdings 2</TableCell>
              <TableCell align='center'>Wingdings 3</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(() => {
              const rows = []

              for (let code = 0x00; code <= 0xFF; ++code) {
                if (isControlCharacter(code)) continue
                const char = String.fromCharCode(0xF000 + code)
                rows.push(
                  <TableRow key={code}>
                    <TableCell align='center'><samp>{code}</samp></TableCell>
                    <TableCell align='center'><samp>{toHex2(code)}</samp></TableCell>
                    <TableCell align='center'><code>{String.fromCharCode(code)}</code></TableCell>
                    <TableCell align='center'><AdIcon font='wd-webdings' char={char} /></TableCell>
                    <TableCell align='center'><AdIcon font='wd-wingdings1' char={char} /></TableCell>
                    <TableCell align='center'><AdIcon font='wd-wingdings2' char={char} /></TableCell>
                    <TableCell align='center'><AdIcon font='wd-wingdings3' char={char} /></TableCell>
                  </TableRow>
                )
              }

              return rows
            })()}
          </TableBody>
        </Table>
      </TableContainer>
    </Section>
  )
}

export default Cheatsheet
