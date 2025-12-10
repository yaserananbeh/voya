import { Box, Stack, Typography } from '@mui/material'
import type { ReactNode } from 'react'

interface PageHeaderProps {
  title: ReactNode
  subtitle?: ReactNode
  actions?: ReactNode // e.g. buttons on the right
}

/**
 * Standard page header with title, optional subtitle,
 * and optional actions area on the right.
 */
export const PageHeader = ({ title, subtitle, actions }: PageHeaderProps) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Stack
        direction="row"
        alignItems={subtitle ? 'flex-end' : 'center'}
        justifyContent="space-between"
        gap={2}
      >
        <Box>
          <Typography variant="h4" component="h1" fontWeight={700}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="subtitle1" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>

        {actions && <Box>{actions}</Box>}
      </Stack>
    </Box>
  )
}
