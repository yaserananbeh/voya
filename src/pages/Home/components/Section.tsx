import type { ReactNode } from 'react'
import { Box, Typography, type SxProps, type Theme } from '@mui/material'

interface SectionProps {
  id?: string
  title?: string
  subtitle?: string
  children: ReactNode
  className?: string
  sx?: SxProps<Theme>
}

export function Section({ id, title, subtitle, children, className, sx }: SectionProps) {
  return (
    <Box component="section" id={id} className={className} sx={{ py: 4, ...sx }}>
      {(title || subtitle) && (
        <Box mb={3}>
          {title && (
            <Typography variant="h5" component="h2" fontWeight="bold">
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
      )}
      {children}
    </Box>
  )
}
