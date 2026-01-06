import { Typography, Box } from '@mui/material'

type PriceDisplayProps = {
  price: number
  originalPrice?: number
  discount?: number
  showDiscount?: boolean
  variant?: 'h6' | 'h5' | 'body1' | 'body2'
  currency?: string
}

export function PriceDisplay({
  price,
  originalPrice,
  discount,
  showDiscount = false,
  variant = 'h6',
  currency = '$',
}: PriceDisplayProps) {
  const hasDiscount = showDiscount && originalPrice && discount

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
      <Typography variant={variant} component="span">
        {currency}
        {price.toFixed(2)}
      </Typography>
      {hasDiscount && (
        <>
          <Typography
            component="span"
            variant="body2"
            color="text.secondary"
            sx={{ textDecoration: 'line-through' }}
          >
            {currency}
            {originalPrice.toFixed(2)}
          </Typography>
          <Typography component="span" color="success.main" variant="body2">
            -{Math.round(discount * 100)}%
          </Typography>
        </>
      )}
    </Box>
  )
}
