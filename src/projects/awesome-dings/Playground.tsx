import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import Section from '../../blog/Section'
import Highlight from '../../Highlight'

import 'awesome-dings/css/awesome-dings.css'

const radioGroups = [{
  name: 'Fonts',
  radios: [
    { name: 'Webdings', css: 'wd-webdings' },
    { name: 'Wingdings 1', css: 'wd-wingdings-1' },
    { name: 'Wingdings 2', css: 'wd-wingdings-2' },
    { name: 'Wingdings 3', css: 'wd-wingdings-3' }
  ]
}, {
  name: 'Sizing',
  radios: [
    { name: 'None' },
    { name: 'Large', css: 'wd-lg' },
    { name: '2x', css: 'wd-2x' },
    { name: '3x', css: 'wd-3x' },
    { name: '4x', css: 'wd-4x' },
    { name: '5x', css: 'wd-5x' }
  ]
}, {
  name: 'Animations',
  radios: [
    { name: 'None' },
    { name: 'Spin', css: 'wd-spin' },
    { name: 'Pulse', css: 'wd-pulse' }
  ]
}, {
  name: 'Transformations',
  radios: [
    { name: 'None' },
    { name: 'Rotate 90', css: 'wd-rotate-90' },
    { name: 'Rotate 180', css: 'wd-rotate-180' },
    { name: 'Rotate 270', css: 'wd-rotate-270' },
    { name: 'Flip Horizontal', css: 'wd-flip-horizontal' },
    { name: 'Flip Vertical', css: 'wd-flip-vertical' }
  ]
}]

const Playground = (): React.ReactElement => {
  const [code, setCode] = useState(109)
  const [codeInput, setCodeInput] = useState(String(code))
  const [radios, setRadios] = useState<Record<string, string>>({
    Fonts: 'Webdings',
    Sizing: '5x',
    Animations: 'None',
    Transformations: 'None'
  })

  const shiftedCode = code === 173 ? code + 0xF000 : code
  const character = String.fromCharCode(shiftedCode)
  const cssClassNames = radioGroups.map(radioGroup => {
    for (const radio of radioGroup.radios) {
      if (radio.name === radios[radioGroup.name]) {
        return radio.css
      }
    }
    return undefined
  }).filter(x => x).join(' ')

  const handleFocusCharacter = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.select()
  }

  const handleInputCharacter = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const input = event.target.value
    const charCode = input.charCodeAt(input.length - 1)
    const code = isNaN(charCode) ? 0 : charCode

    setCode(code)
    setCodeInput(String(code))
  }

  const handleInputCode = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const codeInput = event.target.value
    const code = Number(codeInput)

    setCode(Math.max(0, Math.floor(isNaN(code) ? 0 : code)))
    setCodeInput(codeInput)
  }

  const handleBlurCodeInput = (): void => {
    setCodeInput(String(code))
  }

  const handleSelectRadio = (group: string, event: React.ChangeEvent<HTMLInputElement>): void => {
    setRadios({
      ...radios,
      [group]: event.target.value
    })
  }

  return (
    <Section title='Playground'>
      <Typography paragraph>This does not go over <Link href='https://fontawesome.com/v4/examples/#fixed-width'>Fixed Width Icons</Link>, <Link href='https://fontawesome.com/v4/examples/#list'>List Icons</Link>, <Link href='https://fontawesome.com/v4/examples/#bordered-pulled'>Bordered & Pulled Icons</Link>, and <Link href='https://fontawesome.com/v4/examples/#stacked'>Stacked Icons</Link> which are all supported. Remember to add <samp>0xF000</samp> for <samp>0xAD</samp> / <samp>173</samp> (<Link href='https://bugzilla.mozilla.org/show_bug.cgi?id=399636#c24'>see issue</Link>).</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormControl component='fieldset' sx={{ width: 1.00 }}>
            <FormLabel component='legend'>Character</FormLabel>
            <TextField
              value={character}
              onFocus={handleFocusCharacter}
              onChange={handleInputCharacter}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl component='fieldset' sx={{ width: 1.00 }}>
            <FormLabel component='legend'>Code</FormLabel>
            <TextField
              type='number'
              value={codeInput}
              onFocus={handleFocusCharacter}
              onChange={handleInputCode}
              onBlur={handleBlurCodeInput}
            />
          </FormControl>
        </Grid>
        {radioGroups.map(radioGroup =>
          <Grid key={radioGroup.name} item xs={12} md={6} lg={3}>
            <FormControl component='fieldset'>
              <FormLabel component='legend'>{radioGroup.name}</FormLabel>
              <RadioGroup
                name={radioGroup.name}
                value={radios[radioGroup.name]}
                onChange={handleSelectRadio.bind(this, radioGroup.name)}
              >
                {radioGroup.radios.map(radio =>
                  <FormControlLabel
                    key={radio.name}
                    control={<Radio />}
                    value={radio.name}
                    label={radio.name}
                  />
                )}
              </RadioGroup>
            </FormControl>
          </Grid>
        )}
        <Grid item xs={12}>
          <FormControl component='fieldset' sx={{ width: 1.00 }}>
            <FormLabel component='legend'>Code</FormLabel>
            <Highlight language='html'>
              {`<i class="${cssClassNames}">&#x${shiftedCode.toString(16)};</i>`}
            </Highlight>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl component='fieldset' sx={{ width: 1.00 }}>
            <FormLabel component='legend'>Output</FormLabel>
            <Box
              component={Paper}
              variant='outlined'
              sx={{
                display: 'flex',
                width: 1.00,
                height: 200,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <i className={cssClassNames}>{character}</i>
            </Box>
          </FormControl>
        </Grid>
      </Grid>
    </Section>
  )
}

export default Playground
