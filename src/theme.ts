import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  typography: {
    fontSize: 20,
    fontFamily: 'Lora, serif',
    h1: {
      fontSize: '2.75rem',
      fontWeight: 'bold'
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 'bold'
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 'bold'
    }
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'none'
      }
    }
  }
})

export default theme
