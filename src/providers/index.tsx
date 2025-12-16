import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { type ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { ThemeProvider, useThemeMode } from './ThemeContext'
import { NotificationProvider } from './NotificationProvider'
import '@/i18n/config'
import { useRTL } from '@/hooks/useRTL'

function ThemeWrapper({ children }: { children: ReactNode }) {
  const { theme } = useThemeMode()
  useRTL()

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider>
      <ThemeWrapper>
        <Provider store={store}>
          <NotificationProvider>{children}</NotificationProvider>
        </Provider>
      </ThemeWrapper>
    </ThemeProvider>
  )
}
