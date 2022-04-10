import React, { useEffect, useState } from 'react'
import { alpha } from '@mui/material/styles'
import { grey } from '@mui/material/colors'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Radio from '@mui/material/Radio'
import Button from '@mui/material/Button'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import RemoveIcon from '@mui/icons-material/Remove'
import Link from '../../Link'
import Section from '../Section'
import { $ } from '../../MathJax'

import { toId, fromId } from 'perfect-cuboid/src/enumerate'
import { getEquivalents } from 'perfect-cuboid/src/equivalent'
import verify from 'perfect-cuboid/src/verify'
import { TRUE } from 'perfect-cuboid/src/Statement'
import { TRIPLES, TYPES, SIDES, DIVISIBILITY, TRUTH_STATES } from './maps'

const PASSED = [
  3, 7, 9, 11, 27, 33, 40, 44, 55, 328, 3463, 3467, 3483, 3489, 3500, 3511, 3890, 3896, 3916, 4039, 4059, 4754, 6915, 6919, 6939, 7203, 7344, 7346, 7920, 13831, 13851, 14258, 44935, 44939, 44966, 44972, 44983, 45038, 45410, 48391, 48422, 48675, 48708, 48818, 49392, 55303, 55334, 55730, 546339, 547056
]

function stringifyStatement (statement: any): string {
  return (statement.divisibility as string).substring(1) + ' ' +
    (statement.truth === TRUE ? '\\mid ' : '\\nmid ') +
    SIDES.get(statement.triple[statement.side])
}

function stringifyStep (permutation: any, stepRule: any): string {
  if (stepRule == null) {
    return '\\text{Initialization}'
  }

  const conditionType = '\\text{' +
    '$' + TRIPLES.get(stepRule.then.triple) + '$ is ' +
    '$' + TYPES.get(permutation[stepRule.then.triple]) + '$}'
  const _if = [conditionType]
    .concat(stepRule.if.map(stringifyStatement))
    .join('\\;\\land\\;')
  const _then = stringifyStatement(stepRule.then)

  return _if + ' \\implies ' + _then
}

const Playground = (): React.ReactElement => {
  const [id, setId] = useState(0)
  const [idInput, setIdInput] = useState('0')
  const [stepIndex, setStepIndex] = useState(-1)
  const permutation = fromId(id)
  const verification = verify(id)
  const _stepIndex = stepIndex === -1 ? verification.steps.length - 1 : stepIndex
  const step = verification.steps[_stepIndex]
  const then = _stepIndex === 0 ? null : step.rule.then
  const newKnowledge = _stepIndex === 0
    ? null
    : {
        side: then.triple[then.side],
        divisibility: then.divisibility
      }

  useEffect(() => {
    const id = 2985984 * Math.random() | 0
    setId(id)
    setIdInput(String(id))
  }, [])

  const handleInputId = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const idInput = event.target.value
    const id = Math.min(2985983, Math.max(0, Math.floor(Number(idInput) ?? 0)))
    setIdInput(idInput)
    setId(id)
    setStepIndex(-1)
  }

  const handleBlurId = (): void => {
    setIdInput(String(id))
  }

  const handleClickId = (id: number): void => {
    setId(id)
    setIdInput(String(id))
    setStepIndex(-1)
  }

  const handleSelectRadio = (triple: string, type: string): void => {
    permutation[triple] = type
    const id = toId(permutation)
    setId(id)
    setIdInput(String(id))
    setStepIndex(-1)
  }

  const handleSelectStep = (stepIndex: number): void => {
    setStepIndex(stepIndex)
  }

  const onSelectKnowledge = (steps: any, side: any, divisibility: any): void => {
    const currStepIndex = stepIndex
    const nextStepIndex = steps.findIndex((step: any) => {
      if (step.rule == null) {
        return false
      }

      const then = step.rule.then
      return side === then.triple[then.side] && divisibility === then.divisibility
    })

    if (nextStepIndex !== -1 && (currStepIndex === -1 || nextStepIndex <= currStepIndex)) {
      setStepIndex(nextStepIndex)
    }
  }

  return (
    <Section title='Playground'>
      <Typography paragraph>See the old playground <Link href='http://old.pillowfication.com/projects/cuboid/'>here</Link>. All code and data are in the <Link href='https://github.com/pillowfication/perfect-cuboid'>GitHub repository</Link>.</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <FormControl component='fieldset' sx={{ width: 1.00 }}>
            <FormLabel component='legend'>Case Identifier</FormLabel>
            <TextField
              type='number'
              variant='standard'
              fullWidth
              value={idInput}
              onChange={handleInputId}
              onBlur={handleBlurId}
              sx={{ my: 0.5 }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={9}>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Equivalents</FormLabel>
            <Box sx={{ flexFlow: 'row wrap' }}>
              {getEquivalents(id).map((equivalent: number) =>
                <Button
                  key={equivalent}
                  variant={equivalent === id ? 'contained' : 'outlined'}
                  onClick={handleClickId.bind(null, equivalent)}
                  sx={{ m: 0.5 }}
                >
                  {equivalent}
                </Button>
              )}
            </Box>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TableContainer>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell />
                  {TRIPLES.map(triple =>
                    <TableCell key={triple.name} align='center'>{$(triple.label)}</TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {TYPES.map(type =>
                  <TableRow key={type.name}>
                    <TableCell component='th' scope='row' align='center'>{$(type.label)}</TableCell>
                    {TRIPLES.map(triple =>
                      <TableCell key={triple.name} align='center' sx={{ p: 0 }}>
                        <Radio
                          size='small'
                          name={triple.name}
                          checked={permutation[triple.name] === type.name}
                          onChange={handleSelectRadio.bind(null, triple.name, type.name)}
                        />
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Steps</FormLabel>
            <TableContainer>
              <Box component='ol' start={0} my={0} pl='50px'>
                {verification.steps.map((step: any, index: number) =>
                  <Box
                    component='li'
                    key={index}
                    onClick={handleSelectStep.bind(null, index)}
                    sx={{
                      cursor: 'pointer',
                      backgroundColor: theme =>
                        _stepIndex === index ? alpha(theme.palette.primary.main, 0.15) : undefined
                    }}
                  >
                    {$(stringifyStep(permutation, step.rule))}
                  </Box>
                )}
                <Box component='li' sx={{
                  color: theme =>
                    (verification.contradiction as boolean) ? theme.palette.error.main : undefined
                }}>
                  {$((verification.contradiction as boolean)
                    ? stringifyStep(permutation, verification.contradiction)
                    : '\\text{No contradiction}'
                  )}
                </Box>
              </Box>
            </TableContainer>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Knowledge (step {_stepIndex})</FormLabel>
            <TableContainer>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell />
                    {DIVISIBILITY.map(divisibility =>
                      <TableCell key={divisibility.name} align='center'>
                        {$(divisibility.label)}
                      </TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {SIDES.map(side =>
                    <TableRow key={side.name}>
                      <TableCell component='th' scope='row' align='center'>
                        {$(side.label)}
                      </TableCell>
                      {DIVISIBILITY.map(divisibility =>
                        <TableCell
                          key={divisibility.name}
                          align='center'
                          onClick={onSelectKnowledge.bind(null, verification.steps, side.name, divisibility.name)}
                          sx={(() => {
                            const state = TRUTH_STATES.get(step.knowledge[side.name][divisibility.name])
                            return {
                              cursor: state === 'true' || state === 'false' ? 'pointer' : undefined,
                              backgroundColor: theme =>
                                _stepIndex > 0 && newKnowledge?.side === side.name && newKnowledge?.divisibility === divisibility.name
                                  ? alpha(theme.palette.primary.main, 0.15)
                                  : undefined,
                              color: theme => {
                                switch (state) {
                                  case 'true': return theme.palette.success.main
                                  case 'false': return theme.palette.error.main
                                  default: return grey[300]
                                }
                              }
                            }
                          })()}
                        >
                          {(() => {
                            const state = TRUTH_STATES.get(step.knowledge[side.name][divisibility.name])
                            switch (state) {
                              case 'true': return <CheckIcon sx={{ verticalAlign: 'middle' }} />
                              case 'false': return <CloseIcon sx={{ verticalAlign: 'middle' }} />
                              default: return <RemoveIcon sx={{ verticalAlign: 'middle' }} />
                            }
                          })()}
                        </TableCell>
                      )}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Passed Cases (50 total)</FormLabel>
            <Box sx={{ flexFlow: 'row wrap' }}>
              {PASSED.map((passed: number) =>
                <Button
                  key={passed}
                  variant={passed === id ? 'contained' : 'outlined'}
                  onClick={handleClickId.bind(null, passed)}
                  sx={{ m: 0.5 }}
                >
                  {passed}
                </Button>
              )}
            </Box>
          </FormControl>
        </Grid>
      </Grid>
    </Section>
  )
}

export default Playground
