import { Typography } from '@mui/material'

type DiscountBadgeProps = {
  discount: number
}

export function DiscountBadge({ discount }: DiscountBadgeProps) {
  return (
    <Typography component="span" color="success.main" variant="body2">
      -{discount}%
    </Typography>
  )
}
