import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { type ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { ThemeProvider, useThemeMode } from './ThemeContext'
import { NotificationProvider } from './NotificationProvider'
import { LoadingProvider } from './LoadingProvider'
import { useRTL } from '@/hooks'

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

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ThemeWrapper>
        <Provider store={store}>
          <NotificationProvider>
            <LoadingProvider>{children}</LoadingProvider>
          </NotificationProvider>
        </Provider>
      </ThemeWrapper>
    </ThemeProvider>
  )
}
