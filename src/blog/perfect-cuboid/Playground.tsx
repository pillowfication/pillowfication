import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { alpha } from '@material-ui/core/styles/colorManipulator'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import Button from '@material-ui/core/Button'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import RemoveIcon from '@material-ui/icons/Remove'
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

const useStyles = makeStyles(theme => ({
  buttonControl: {
    display: 'initial',
    '& button': {
      margin: theme.spacing(1)
    }
  },
  radioTable: {
    marginBottom: theme.spacing(2),
    '& td, & td:last-child': {
      padding: 0
    }
  },
  knowledgeTable: {
    '& td, & td:last-child': {
      paddingLeft: 0,
      paddingRight: 0
    }
  },
  step: {
    cursor: 'pointer'
  },
  contradiction: {
    color: 'red'
  },
  trueIcon: {
    color: theme.palette.success.main
  },
  falseIcon: {
    color: theme.palette.error.main
  },
  unknownIcon: {
    color: theme.palette.grey[300]
  },
  selected: {
    backgroundColor: alpha(theme.palette.primary.main, 0.25)
  }
}))

const Playground = (): React.ReactElement => {
  const classes = useStyles()
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
        <Grid item sm={3}>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Case Identifier</FormLabel>
            <TextField
              type='number'
              value={idInput}
              onChange={handleInputId}
              onBlur={handleBlurId}
            />
          </FormControl>
        </Grid>
        <Grid item sm={9}>
          <FormControl component='fieldset' className={classes.buttonControl}>
            <FormLabel component='legend'>Equivalents</FormLabel>
            {getEquivalents(id).map((equivalent: number) =>
              <Button
                key={equivalent}
                variant='contained'
                color={id === equivalent ? 'primary' : 'default'}
                onClick={handleClickId.bind(null, equivalent)}
              >
                {equivalent}
              </Button>
            )}
          </FormControl>
        </Grid>
        <Grid item sm={12}>
          <TableContainer>
            <Table size='small' className={classes.radioTable}>
              <TableHead>
                <TableRow>
                  <TableCell />
                  {TRIPLES.map(triple =>
                    <TableCell key={triple.name} align='center'>
                      {$(triple.label)}
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {TYPES.map(type =>
                  <TableRow key={type.name}>
                    <TableCell component='th' scope='row' align='center'>
                      {$(type.label)}
                    </TableCell>
                    {TRIPLES.map(triple =>
                      <TableCell key={triple.name} align='center'>
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
        <Grid item sm={6}>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Steps</FormLabel>
            <TableContainer>
              <ol start={0}>
                {verification.steps.map((step: any, index: number) =>
                  <li
                    key={index}
                    onClick={handleSelectStep.bind(null, index)}
                    className={clsx(classes.step, _stepIndex === index && classes.selected)}
                  >
                    {$(stringifyStep(permutation, step.rule))}
                  </li>
                )}
                <li className={clsx((verification.contradiction as boolean) && classes.contradiction)}>
                  {$((verification.contradiction as boolean)
                    ? stringifyStep(permutation, verification.contradiction)
                    : '\\text{No contradiction}'
                  )}
                </li>
              </ol>
            </TableContainer>
          </FormControl>
        </Grid>
        <Grid item sm={6}>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Knowledge (step {_stepIndex})</FormLabel>
            <TableContainer>
              <Table size='small' className={classes.knowledgeTable}>
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
                          className={clsx(stepIndex > 0 &&
                            newKnowledge?.side === side.name &&
                            newKnowledge?.divisibility === divisibility.name &&
                            classes.selected
                          )}
                          onClick={onSelectKnowledge.bind(null, verification.steps, side.name, divisibility.name)}
                        >
                          {(() => {
                            const state = step.knowledge[side.name][divisibility.name]
                            switch (TRUTH_STATES.get(state)) {
                              case 'true':
                                return <CheckIcon className={classes.trueIcon} />
                              case 'false':
                                return <CloseIcon className={classes.falseIcon} />
                              case 'unknown':
                                return <RemoveIcon className={classes.unknownIcon} />
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
        <Grid item sm={12}>
          <FormControl component='fieldset' className={classes.buttonControl}>
            <FormLabel component='legend'>Passed Cases (50 total)</FormLabel>
            {PASSED.map((equivalent: number) =>
              <Button
                key={equivalent}
                variant='contained'
                color={id === equivalent ? 'primary' : 'default'}
                onClick={handleClickId.bind(null, equivalent)}
              >
                {equivalent}
              </Button>
            )}
          </FormControl>
        </Grid>
      </Grid>
    </Section>
  )
}

export default Playground
