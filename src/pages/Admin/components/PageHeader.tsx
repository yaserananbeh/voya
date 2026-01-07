import { Box, Button, Typography, type SxProps, type Theme } from '@mui/material'
import type { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  actionLabel?: string
  actionIcon?: ReactNode
  onAction?: () => void
  sx?: SxProps<Theme>
}

export function PageHeader({ title, actionLabel, actionIcon, onAction, sx }: PageHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' },
        gap: { xs: 2, sm: 0 },
        mb: 2,
        ...sx,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontSize: { xs: '1.25rem', sm: '1.5rem' },
        }}
      >
        {title}
      </Typography>
      {actionLabel && onAction && (
        <Button
          variant="contained"
          startIcon={actionIcon}
          onClick={onAction}
          sx={{
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          {actionLabel}
        </Button>
      )}
    </Box>
  )
}
