import { Box, Rating, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

type StarRatingDisplayProps = {
  rating: number
  showLabel?: boolean
  size?: 'small' | 'medium' | 'large'
}

export function StarRatingDisplay({
  rating,
  showLabel = true,
  size = 'small',
}: StarRatingDisplayProps) {
  const { t } = useTranslation()

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Rating value={rating} readOnly size={size} max={5} />
      {showLabel && (
        <Typography variant="body2" component="span">
          {rating} {t('hotel.starHotel')}
        </Typography>
      )}
    </Box>
  )
}
