// src/components/layout/Section.tsx
import { Box, type BoxProps } from '@mui/material'
import type { PropsWithChildren } from 'react'

interface SectionProps extends PropsWithChildren<Pick<BoxProps, 'sx'>> {
  /**
   * Vertical spacing multiplier using theme.spacing.
   * 3 = theme.spacing(3) on top & bottom.
   */
  spacing?: number
}

/**
 * Simple vertical section wrapper with consistent top/bottom spacing.
 * Useful to separate logical blocks within a page.
 */
export const Section = ({ children, spacing = 3, sx }: SectionProps) => {
  return (
    <Box
      sx={{
        mt: spacing,
        mb: spacing,
        ...(sx || {}),
      }}
    >
      {children}
    </Box>
  )
}
