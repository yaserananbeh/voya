import { Card, CardContent, CardActions, Typography, Box, Button, Rating } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { SafeImage } from '@/components/common/SafeImage'
import { useTranslation } from 'react-i18next'
import VisibilityIcon from '@mui/icons-material/Visibility'

export type HotelCardData = {
  hotelId: number
  hotelName: string
  cityName?: string
  starRating: number
  imageUrl?: string
  price?: number
  originalPrice?: number
  discount?: number
  visitedDate?: string
  showDiscount?: boolean
}

type HotelCardProps = {
  hotel: HotelCardData
  variant?: 'vertical' | 'horizontal'
  onViewDetails?: (hotelId: number) => void
}

export function HotelCard({ hotel, variant = 'vertical', onViewDetails }: HotelCardProps) {
  const { t } = useTranslation()

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(hotel.hotelId)
    }
  }

  if (variant === 'horizontal') {
    return (
      <Card
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          p: { xs: 1.5, sm: 1 },
        }}
      >
        {hotel.imageUrl && (
          <Box
            sx={{
              width: { xs: '100%', sm: 160 },
              height: { xs: 200, sm: 120 },
              borderRadius: 1,
              overflow: 'hidden',
            }}
          >
            <SafeImage src={hotel.imageUrl} alt={hotel.hotelName} height={120} />
          </Box>
        )}
        <CardContent sx={{ flex: 1, minWidth: 0, p: { xs: 1, sm: 2 } }}>
          <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
            {hotel.hotelName}
          </Typography>
          {hotel.cityName && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {hotel.cityName}
            </Typography>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <Rating value={hotel.starRating} readOnly size="small" />
            <Typography variant="body2" sx={{ ml: 1 }}>
              {hotel.starRating} {t('hotel.starHotel')}
            </Typography>
          </Box>
          {hotel.price !== undefined && (
            <Typography variant="h6" sx={{ mt: 1 }}>
              ${hotel.price}
              {hotel.showDiscount && hotel.originalPrice && hotel.discount && (
                <>
                  {' '}
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.secondary"
                    sx={{ textDecoration: 'line-through', ml: 1 }}
                  >
                    ${hotel.originalPrice}
                  </Typography>{' '}
                  <Typography component="span" color="success.main" variant="body2">
                    -{Math.round(hotel.discount * 100)}%
                  </Typography>
                </>
              )}
            </Typography>
          )}
        </CardContent>
        <CardActions sx={{ p: { xs: 1, sm: 2 } }}>
          <Button
            component={RouterLink}
            to={`/hotel/${hotel.hotelId}`}
            variant="contained"
            onClick={handleViewDetails}
            startIcon={<VisibilityIcon />}
          >
            {t('common.viewDetails')}
          </Button>
        </CardActions>
      </Card>
    )
  }

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {hotel.imageUrl && <SafeImage src={hotel.imageUrl} alt={hotel.hotelName} height={140} />}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6">{hotel.hotelName}</Typography>
        {hotel.cityName && (
          <Typography variant="body2" color="text.secondary">
            {hotel.cityName}
          </Typography>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 1 }}>
          <Rating value={hotel.starRating} readOnly size="small" max={5} />
          <Typography variant="body2" sx={{ ml: 1 }}>
            {hotel.starRating} {t('hotel.starHotel')}
          </Typography>
        </Box>
        {hotel.visitedDate && (
          <Typography variant="body2" color="text.secondary">
            {t('hotel.visited')} {hotel.visitedDate}
          </Typography>
        )}
        {hotel.price !== undefined && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            <strong>${hotel.price.toFixed(2)}</strong>
            {hotel.showDiscount && hotel.originalPrice && hotel.discount && (
              <>
                {' '}
                <Typography
                  component="span"
                  variant="body2"
                  color="text.secondary"
                  sx={{ textDecoration: 'line-through', ml: 1 }}
                >
                  ${hotel.originalPrice.toFixed(2)}
                </Typography>{' '}
                <Typography component="span" color="success.main" variant="body2">
                  -{Math.round(hotel.discount * 100)}%
                </Typography>
              </>
            )}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button
          component={RouterLink}
          to={`/hotel/${hotel.hotelId}`}
          variant="contained"
          fullWidth
          onClick={handleViewDetails}
          startIcon={<VisibilityIcon />}
        >
          {t('common.viewDetails')}
        </Button>
      </CardActions>
    </Card>
  )
}
