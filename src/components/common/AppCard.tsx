import { Card } from '@mui/material'
import type { CardProps } from '@mui/material'
import { forwardRef } from 'react'

type AppCardProps = CardProps & {
  hover?: boolean
}

export const AppCard = forwardRef<HTMLDivElement, AppCardProps>(
  ({ hover = false, sx, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        sx={{
          transition: hover ? 'transform 0.2s, box-shadow 0.2s' : undefined,
          '&:hover': hover
            ? {
                transform: 'translateY(-4px)',
                boxShadow: 4,
              }
            : undefined,
          ...sx,
        }}
        {...props}
      />
    )
  },
)

AppCard.displayName = 'AppCard'
