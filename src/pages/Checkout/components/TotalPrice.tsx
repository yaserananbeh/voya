import { Typography, Box, useTheme } from '@mui/material'

type TotalPriceProps = {
  total: number
  currency?: string
  label?: string
}

export function TotalPrice({ total, currency = '$', label }: TotalPriceProps) {
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        pt: 2,
        borderTop: `2px solid ${theme.palette.divider}`,
      }}
    >
      <Typography variant="h6" component="span" fontWeight={700}>
        {label || 'Total'}
      </Typography>
      <Typography
        variant="h5"
        component="span"
        fontWeight={700}
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.main} 90%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {currency}
        {total.toFixed(2)}
      </Typography>
    </Box>
  )
}
