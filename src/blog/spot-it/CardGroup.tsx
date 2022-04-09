import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import SpotItCard from './SpotItCard'

const useStyles = makeStyles(() => ({
  container: {
    position: 'relative',
    '& > *': {
      position: 'absolute'
    }
  },
  unknownIcon: {
    color: 'lightgray'
  }
}))

interface Props {
  Icon: any
}

const CardGroup = ({ Icon }: Props): React.ReactElement => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <div style={{ top: 4, left: 10 }}>
        <SpotItCard noMargin symbols={[null, null, null, null, null, null, null, null]} />
      </div>
      <div style={{ top: 2, left: 5 }}>
        <SpotItCard noMargin symbols={[null, null, null, null, null, null, null, null]} />
      </div>
      <SpotItCard noMargin symbols={[
        <Icon fontSize='large' />,
        <QuestionMarkIcon className={classes.unknownIcon} />,
        <QuestionMarkIcon className={classes.unknownIcon} />,
        <QuestionMarkIcon className={classes.unknownIcon} />,
        <QuestionMarkIcon className={classes.unknownIcon} />,
        <QuestionMarkIcon className={classes.unknownIcon} />,
        <QuestionMarkIcon className={classes.unknownIcon} />,
        <QuestionMarkIcon className={classes.unknownIcon} />
      ]} />
    </div>
  )
}

export default CardGroup
