import { ThemeProvider } from '@mui/material/styles'
import { theme as baseTheme } from '@/theme'
import CssBaseline from '@mui/material/CssBaseline' // apply MUI theme automatically to the HTML body
import { type ReactNode, useMemo } from 'react'

export const Providers = ({ children }: { children: ReactNode }) => {
  const theme = useMemo(() => baseTheme, []) // Memoizes MUI theme
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
