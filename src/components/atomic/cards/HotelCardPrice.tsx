import { Typography, Button, Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'

type HotelCardPriceProps = {
  price: number | null
  onViewHotel: () => void
  isRTL?: boolean
  buttonLabel?: string
}

export function HotelCardPrice({
  price,
  onViewHotel,
  isRTL = false,
  buttonLabel,
}: HotelCardPriceProps) {
  const { t } = useTranslation()

  return (
    <Stack
      alignItems={{ xs: 'flex-start', sm: 'flex-end' }}
      spacing={1}
      sx={{ minWidth: { xs: '100%', sm: 'auto' } }}
    >
      <Typography
        variant="h6"
        sx={{
          fontSize: { xs: '1.1rem', sm: '1.25rem' },
        }}
      >
        {price !== null ? `$${price}${t('hotel.perNight')}` : '-'}
      </Typography>
      <Button
        variant="contained"
        onClick={onViewHotel}
        fullWidth
        sx={{
          minWidth: { xs: '100%', sm: 'auto' },
          width: { xs: '100%', sm: 'auto' },
          flexDirection: isRTL ? 'row-reverse' : 'row',
        }}
      >
        {buttonLabel || t('search.viewHotel')}
      </Button>
    </Stack>
  )
}
