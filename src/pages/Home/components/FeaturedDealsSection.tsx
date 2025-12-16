import { Alert, Card, CardContent, Typography, Box, Button, CardActions } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useFeaturedDealsQuery } from '@/api/home'
import { HomeSkeletonCard } from './HomeSkeletonCard'
import { SafeImage } from '@/components/common/SafeImage'
import styles from '../styles.module.css'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useTranslation } from 'react-i18next'

export function FeaturedDealsSection() {
  const { t } = useTranslation()
  const { data, isLoading, isError } = useFeaturedDealsQuery()

  if (isLoading) {
    return (
      <Box className={styles.cardsGrid}>
        {Array.from({ length: 3 }).map((_, i) => (
          <HomeSkeletonCard key={i} />
        ))}
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
    <Box className={styles.cardsGrid}>
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
