import { Card, CardContent, CardActions, Typography, Box } from '@mui/material'
import { SafeImage } from '@/components/common/SafeImage'
import { useTranslation } from 'react-i18next'
import { StarRatingDisplay } from '@/components/atomic'
import { PriceDisplay } from './PriceDisplay'
import { ViewDetailsButton } from './ViewDetailsButton'
import type { HotelCardData } from '../types'

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
          <Typography
            variant="h3"
            component="h3"
            sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
          >
            {hotel.hotelName}
          </Typography>
          {hotel.cityName && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {hotel.cityName}
            </Typography>
          )}
          <Box sx={{ mt: 1 }}>
            <StarRatingDisplay rating={hotel.starRating} />
          </Box>
          {hotel.price !== undefined && (
            <Box sx={{ mt: 1 }}>
              <PriceDisplay
                price={hotel.price}
                originalPrice={hotel.originalPrice}
                discount={hotel.discount}
                showDiscount={hotel.showDiscount}
                variant="h6"
              />
            </Box>
          )}
        </CardContent>
        <CardActions sx={{ p: { xs: 1, sm: 2 } }}>
          <ViewDetailsButton
            hotelId={hotel.hotelId}
            hotelName={hotel.hotelName}
            onClick={handleViewDetails}
          />
        </CardActions>
      </Card>
    )
  }

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {hotel.imageUrl && <SafeImage src={hotel.imageUrl} alt={hotel.hotelName} height={140} />}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h3" component="h3">
          {hotel.hotelName}
        </Typography>
        {hotel.cityName && (
          <Typography variant="body2" color="text.secondary">
            {hotel.cityName}
          </Typography>
        )}
        <Box sx={{ mt: 1, mb: 1 }}>
          <StarRatingDisplay rating={hotel.starRating} />
        </Box>
        {hotel.visitedDate && (
          <Typography variant="body2" color="text.secondary">
            {t('hotel.visited')} {hotel.visitedDate}
          </Typography>
        )}
        {hotel.price !== undefined && (
          <Box sx={{ mt: 1 }}>
            <PriceDisplay
              price={hotel.price}
              originalPrice={hotel.originalPrice}
              discount={hotel.discount}
              showDiscount={hotel.showDiscount}
              variant="body2"
            />
          </Box>
        )}
      </CardContent>
      <CardActions>
        <ViewDetailsButton
          hotelId={hotel.hotelId}
          hotelName={hotel.hotelName}
          onClick={handleViewDetails}
          fullWidth
        />
      </CardActions>
    </Card>
  )
}
