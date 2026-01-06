import { Typography, Button, Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'

type HotelCardPriceProps = {
  price: number | null
  onViewHotel: () => void
  isRTL?: boolean
  buttonLabel?: string
  hotelName?: string
}

export function HotelCardPrice({
  price,
  onViewHotel,
  isRTL = false,
  buttonLabel,
  hotelName,
}: HotelCardPriceProps) {
  const { t } = useTranslation()
  const buttonText = buttonLabel || t('search.viewHotel')
  const ariaLabel = hotelName ? `${buttonText} ${hotelName}` : buttonText

  return (
    <Stack
      alignItems={{ xs: 'flex-start', sm: 'flex-end' }}
      spacing={1}
      sx={{ minWidth: { xs: '100%', sm: 'auto' } }}
    >
      <Typography
        variant="body1"
        component="p"
        sx={{
          fontSize: { xs: '1.1rem', sm: '1.25rem' },
          fontWeight: 600,
        }}
      >
        {price !== null ? `$${price}${t('hotel.perNight')}` : '-'}
      </Typography>
      <Button
        variant="contained"
        onClick={onViewHotel}
        fullWidth
        aria-label={ariaLabel}
        sx={{
          minWidth: { xs: '100%', sm: 'auto' },
          width: { xs: '100%', sm: 'auto' },
          flexDirection: isRTL ? 'row-reverse' : 'row',
        }}
      >
        {buttonText}
      </Button>
    </Stack>
  )
}
