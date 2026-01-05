import { SnackbarProvider } from 'notistack'
import { type ReactNode } from 'react'
import { UI } from '@/constants'

interface NotificationProviderProps {
  children: ReactNode
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  return (
    <SnackbarProvider
      maxSnack={UI.NOTIFICATION.MAX_SNACKS}
      anchorOrigin={UI.NOTIFICATION.ANCHOR_ORIGIN}
      autoHideDuration={UI.NOTIFICATION.AUTO_HIDE_DURATION.DEFAULT}
      dense
      preventDuplicate
    >
      {children}
    </SnackbarProvider>
  )
}
