import React, { useState } from 'react'
import sowpods from 'pf-sowpods'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import Section from '../../blog/Section'

const Playground = (): React.ReactElement => {
  const [verificationWord, setVerificationWord] = useState('')
  const [anagramString, setAnagramString] = useState('')
  const [anagramResults, setAnagramResults] = useState<string[]>([])
  const isValid: boolean | null = verificationWord.length > 0
    ? sowpods.verify(verificationWord)
    : null

  const handleInputVerificationWord = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setVerificationWord(event.target.value.trim())
  }

  const handleInputAnagramString = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setAnagramString(event.target.value)
  }

  const handleKeyPressAnagramString = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      handleClickAnagram()
    }
  }

  const handleClickRandomWord = (): void => {
    setVerificationWord(sowpods.random())
  }

  const handleClickAnagram = (): void => {
    if (anagramString.length > 0) {
      setAnagramResults(sowpods.anagram(anagramString))
    }
  }

  return (
    <Section title='Playground'>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl component='fieldset' sx={{ width: 1.00 }}>
            <FormLabel component='legend'>Verify</FormLabel>
            <TextField
              value={verificationWord}
              onChange={handleInputVerificationWord}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    {isValid === null
                      ? <QuestionMarkIcon />
                      : isValid
                        ? <CheckIcon sx={{ color: 'success.main' }} />
                        : <CloseIcon sx={{ color: 'error.main' }} />
                    }
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position='end'>
                    <Divider orientation="vertical" sx={{ height: '2em', mx: 2 }} />
                    <Button onClick={handleClickRandomWord}>
                      Random
                    </Button>
                  </InputAdornment>
                )
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl component='fieldset' sx={{ width: 1.00 }}>
            <FormLabel component='legend'>Anagram</FormLabel>
            <Typography>Non-alphabetic characters are treated as wildcards</Typography>
            <TextField
              value={anagramString}
              onChange={handleInputAnagramString}
              onKeyPress={handleKeyPressAnagramString}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <Divider orientation="vertical" sx={{ height: '2em', mx: 2 }} />
                    <Button onClick={handleClickAnagram}>
                      Anagram
                    </Button>
                  </InputAdornment>
                )
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Box component={Paper} variant='outlined' sx={{
            p: 2,
            fontSize: '1.25em',
            textAlign: 'center'
          }}>
            {anagramResults.length > 0
              ? anagramResults
                .sort((wordA, wordB) => wordB.length - wordA.length)
                .map(word => <div>{word}</div>)
              : <i>No results</i>
            }
          </Box>
        </Grid>
      </Grid>
    </Section>
  )
}

export default Playground
