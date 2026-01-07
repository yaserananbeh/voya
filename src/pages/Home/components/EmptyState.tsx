import { Typography } from '@mui/material'

type EmptyStateProps = {
  message: string
  variant?: 'body1' | 'body2'
  color?: 'text.primary' | 'text.secondary'
}

export function EmptyState({
  message,
  variant = 'body2',
  color = 'text.secondary',
}: EmptyStateProps) {
  return (
    <Typography variant={variant} color={color}>
      {message}
    </Typography>
  )
}
