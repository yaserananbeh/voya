import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#003580', // Booking Blue
      light: '#3366a6',
      dark: '#00224f',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#F9BC02', // Booking Yellow
      dark: '#c89600',
      contrastText: '#000000',
    },
    success: {
      main: '#00800D', // Green success
      dark: '#005c0a',
      contrastText: '#ffffff',
    },
    error: {
      main: '#D4111E', // Red alerts
      dark: '#a70d17',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#F46A25', // Sale / discount
      contrastText: '#ffffff',
    },
    text: {
      primary: '#262626',
      secondary: '#6B6B6B',
    },
    background: {
      default: '#F5F5F5',
      paper: '#ffffff',
    },
    divider: '#E6E6E6',
  },
  typography: {
    fontFamily: 'Inter, Roboto, sans-serif',
  },
})
