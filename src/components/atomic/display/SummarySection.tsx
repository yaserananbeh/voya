import { Box, Typography } from '@mui/material'
import type { ReactNode } from 'react'

type SummarySectionProps = {
  icon?: ReactNode
  label: string
  value: ReactNode
  divider?: boolean
}

export function SummarySection({ icon, label, value, divider = false }: SummarySectionProps) {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
        {icon && <Box sx={{ mt: 0.5, color: 'primary.main' }}>{icon}</Box>}
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {label}
          </Typography>
          {typeof value === 'string' ? (
            <Typography variant="body1" fontWeight={600}>
              {value}
            </Typography>
          ) : (
            value
          )}
        </Box>
      </Box>
      {divider && <Box sx={{ my: 1 }} />}
    </>
  )
}
