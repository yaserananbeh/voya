import { ThemeProvider } from '@mui/material/styles'
import { theme as baseTheme } from '@/theme'
import CssBaseline from '@mui/material/CssBaseline'
import { type ReactNode, useMemo } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/store'

export const Providers = ({ children }: { children: ReactNode }) => {
  const theme = useMemo(() => baseTheme, [])
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  )
}
