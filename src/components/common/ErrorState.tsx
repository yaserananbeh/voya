import { Alert, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

type ErrorStateProps = {
  message?: string
  variant?: 'alert' | 'typography'
}

export function ErrorState({ message, variant = 'alert' }: ErrorStateProps) {
  const { t } = useTranslation()

  if (variant === 'typography') {
    return <Typography color="error">{message || t('common.error')}</Typography>
  }

  return <Alert severity="error">{message || t('common.error')}</Alert>
}
