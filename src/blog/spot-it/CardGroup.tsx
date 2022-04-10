import React from 'react'
import { grey } from '@mui/material/colors'
import Box from '@mui/material/Box'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import SpotItCard from './SpotItCard'

// const useStyles = makeStyles(() => ({
//   container: {
//     position: 'relative',
//     '& > *': {
//       position: 'absolute'
//     }
//   },
//   unknownIcon: {
//     color: 'lightgray'
//   }
// }))

interface Props {
  Icon: any
}

const CardGroup = ({ Icon }: Props): React.ReactElement => {
  return (
    <Box sx={{ position: 'relative' }}>
      <Box sx={{ position: 'absolute', top: 4, left: 10 }}>
        <SpotItCard noMargin symbols={[null, null, null, null, null, null, null, null]} />
      </Box>
      <Box sx={{ position: 'absolute', top: 2, left: 5 }}>
        <SpotItCard noMargin symbols={[null, null, null, null, null, null, null, null]} />
      </Box>
      <SpotItCard noMargin symbols={[
        <Icon fontSize='large' />,
        <QuestionMarkIcon sx={{ color: grey[300] }} />,
        <QuestionMarkIcon sx={{ color: grey[300] }} />,
        <QuestionMarkIcon sx={{ color: grey[300] }} />,
        <QuestionMarkIcon sx={{ color: grey[300] }} />,
        <QuestionMarkIcon sx={{ color: grey[300] }} />,
        <QuestionMarkIcon sx={{ color: grey[300] }} />,
        <QuestionMarkIcon sx={{ color: grey[300] }} />
      ]} />
    </Box>
  )
}

export default CardGroup
