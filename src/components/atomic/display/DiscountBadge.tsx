import { Chip } from '@mui/material'

type DiscountBadgeProps = {
  discount: number
  size?: 'small' | 'medium'
}

export function DiscountBadge({ discount, size = 'small' }: DiscountBadgeProps) {
  return (
    <Chip
      label={`-${Math.round(discount * 100)}%`}
      size={size}
      color="success"
      sx={{ fontWeight: 600 }}
    />
  )
}
