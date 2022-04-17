import React, { useState } from 'react'
import { execute, transpile } from 'moofuck'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Section from '../../blog/Section'

const helloWorld = `
++++++++                Set Cell #0 to 8
[
    >++++               Add 4 to Cell #1; this will always set Cell #1 to 4
    [                   as the cell will be cleared by the loop
        >++             Add 2 to Cell #2
        >+++            Add 3 to Cell #3
        >+++            Add 3 to Cell #4
        >+              Add 1 to Cell #5
        <<<<-           Decrement the loop counter in Cell #1
    ]                   Loop till Cell #1 is zero; number of iterations is 4
    >+                  Add 1 to Cell #2
    >+                  Add 1 to Cell #3
    >-                  Subtract 1 from Cell #4
    >>+                 Add 1 to Cell #6
    [<]                 Move back to the first zero cell you find; this will
                        be Cell #1 which was cleared by the previous loop
    <-                  Decrement the loop Counter in Cell #0
]                       Loop till Cell #0 is zero; number of iterations is 8

The result of this is:
Cell No :   0   1   2   3   4   5   6
Contents:   0   0  72 104  88  32   8
Pointer :   ^

>>.                     Cell #2 has value 72 which is 'H'
>---.                   Subtract 3 from Cell #3 to get 101 which is 'e'
+++++++..+++.           Likewise for 'llo' from Cell #3
>>.                     Cell #5 is 32 for the space
<-.                     Subtract 1 from Cell #4 for 87 to give a 'W'
<.                      Cell #3 was set to 'o' from the end of 'Hello'
+++.------.--------.    Cell #3 for 'rl' and 'd'
>>+.                    Add 1 to Cell #5 gives us an exclamation point
>++.                    And finally a newline from Cell #6
`.trim()

const stdout = {
  buffer: '',
  clear () {
    stdout.buffer = ''
  },
  write (str: string) {
    stdout.buffer += str
  }
}

const Playground = (): React.ReactElement => {
  const [brainfuck, setBrainfuck] = useState(helloWorld)
  const [inputString, setInputString] = useState('')
  const [output, setOutput] = useState('')
  const moofuck = transpile.brainfuckToMoofuck(brainfuck)
  const invisibles: string[] = moofuck.match(/\r?\n/g) ?? []

  const handleInputBrainfuck = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setBrainfuck(event.target.value ?? '')
  }

  const handleInputInputString = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputString(event.target.value)
  }

  const handleExecuteMoofuck = (): void => {
    stdout.clear()
    try {
      execute(transpile.brainfuckToMoofuck(brainfuck), inputString, stdout)
    } catch (err) {
      stdout.write('Error: moo')
    }

    setOutput(stdout.buffer)
  }

  return (
    <Section title='Playground'>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl component='fieldset' sx={{ width: 1.00 }}>
            <FormLabel component='legend'>Brainfuck</FormLabel>
            <TextField
              multiline
              onInput={handleInputBrainfuck}
              value={brainfuck}
              InputProps={{ sx: { fontFamily: 'monospace' } }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl component='fieldset' sx={{ width: 1.00 }}>
            <FormLabel component='legend'>Moofuck</FormLabel>
            <Box component={Paper} variant='outlined' sx={{ padding: 2, maxHeight: 400, overflowY: 'auto' }}>
              <Box component='pre' sx={{ m: 0 }}>
                <code>
                  {invisibles.map(invisible => [
                    'moo',
                    <span key='moo' style={{ opacity: 0.5 }}>
                      {invisible === '\n' ? '\\n' : '\\r\\n'}
                    </span>,
                    '\n'
                  ])}
                </code>
              </Box>
            </Box>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl component='fieldset' sx={{ width: 1.00 }}>
            <FormLabel component='legend'>Input</FormLabel>
            <TextField value={inputString} onChange={handleInputInputString} />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl component='fieldset' sx={{ width: 1.00 }}>
            <FormLabel component='legend'>Output</FormLabel>
            <Button variant='outlined' onClick={handleExecuteMoofuck}>Execute Moofuck</Button>
            <Box component={Paper} variant='outlined' sx={{ maxHeight: 400, padding: 2, mt: 2 }}>
              <Box component='pre' sx={{ m: 0 }}>
                <code>
                  {output}
                </code>
              </Box>
            </Box>
          </FormControl>
        </Grid>
      </Grid>
    </Section>
  )
}

export default Playground
