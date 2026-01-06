import {
  Alert,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  CardActions,
  Rating,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useFeaturedDealsQuery } from '@/api/home'
import { SafeImage } from '@/components/common/SafeImage'
import { VoyaLoader } from '@/components'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useTranslation } from 'react-i18next'

export function FeaturedDealsSection() {
  const { t } = useTranslation()
  const { data, isLoading, isError } = useFeaturedDealsQuery()

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '300px',
        }}
      >
        <VoyaLoader size="small" />
      </Box>
    )
  }

  if (isError) {
    return <Alert severity="error">{t('home.featuredDealsError')}</Alert>
  }

  if (!data || data.length === 0) {
    return <Typography>{t('home.noFeaturedDeals')}</Typography>
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(auto-fill, minmax(260px, 1fr))',
        },
        gap: 3,
      }}
    >
      {data.map((deal) => (
        <Card key={deal.hotelId} sx={{ display: 'flex', flexDirection: 'column' }}>
          <SafeImage
            src={deal.roomPhotoUrl}
            alt={deal.hotelName ?? 'Featured hotel'}
            height={140}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h6">{deal.hotelName}</Typography>
            <Typography variant="body2" color="text.secondary">
              {deal.cityName}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 1 }}>
              <Rating value={deal.hotelStarRating} readOnly size="small" max={5} />
              <Typography variant="body2" sx={{ ml: 1 }}>
                {deal.hotelStarRating} {t('hotel.starHotel')}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mt: 1 }}>
              <strong>${deal.finalPrice.toFixed(2)}</strong>{' '}
              <Typography
                component="span"
                variant="body2"
                color="text.secondary"
                sx={{ textDecoration: 'line-through', ml: 1 }}
              >
                ${deal.originalRoomPrice.toFixed(2)}
              </Typography>{' '}
              <Typography component="span" color="success.main" variant="body2">
                -{Math.round(deal.discount * 100)}%
              </Typography>
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              component={RouterLink}
              to={`/hotel/${deal.hotelId}`}
              variant="contained"
              fullWidth
              startIcon={<VisibilityIcon />}
            >
              {t('common.viewDetails')}
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  )
}
