// src/pages/Home/components/FeaturedDealsSection.tsx
import { Alert, Card, CardContent, CardMedia, Typography, Box } from '@mui/material'
import { useFeaturedDealsQuery } from '@/api/home'
import { HomeSkeletonCard } from './HomeSkeletonCard'
import styles from '../styles.module.css'

export function FeaturedDealsSection() {
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
    return (
      <Alert severity="error">Couldn&apos;t load featured deals. Please try again later.</Alert>
    )
  }

  if (!data || data.length === 0) {
    return <Typography>No featured deals at the moment.</Typography>
  }

  return (
    <Box className={styles.cardsGrid}>
      {data.map((deal) => (
        <Card key={deal.hotelId}>
          {deal.roomPhotoUrl && (
            <CardMedia
              component="img"
              height="140"
              image={deal.roomPhotoUrl}
              alt={deal.hotelName ?? 'Featured hotel'}
            />
          )}
          <CardContent>
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
        </Card>
      ))}
    </Box>
  )
}
