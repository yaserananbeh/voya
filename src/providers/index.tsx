import { ThemeProvider } from '@mui/material/styles'
import { theme } from '@/theme'
import CssBaseline from '@mui/material/CssBaseline' //apply MUI theme automatically to the HTML body

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
