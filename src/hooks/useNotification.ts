import { useSnackbar } from 'notistack'
import { UI } from '@/constants'

export function useNotification() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const showSuccess = (message: string) => {
    enqueueSnackbar(message, {
      variant: 'success',
      autoHideDuration: UI.NOTIFICATION.AUTO_HIDE_DURATION.SUCCESS,
    })
  }

  const showError = (message: string) => {
    enqueueSnackbar(message, {
      variant: 'error',
      autoHideDuration: UI.NOTIFICATION.AUTO_HIDE_DURATION.ERROR,
    })
  }

  const showWarning = (message: string) => {
    enqueueSnackbar(message, {
      variant: 'warning',
      autoHideDuration: UI.NOTIFICATION.AUTO_HIDE_DURATION.WARNING,
    })
  }

  const showInfo = (message: string) => {
    enqueueSnackbar(message, {
      variant: 'info',
      autoHideDuration: UI.NOTIFICATION.AUTO_HIDE_DURATION.INFO,
    })
  }

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    closeSnackbar,
  }
}
