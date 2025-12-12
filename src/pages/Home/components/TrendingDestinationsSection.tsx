// src/pages/Home/components/TrendingDestinationsSection.tsx
import { Alert, Box, Card, CardContent, CardMedia, Typography } from '@mui/material'
import { useTrendingDestinationsQuery } from '@/api/home'
import { HomeSkeletonCard } from './HomeSkeletonCard'
import styles from '../styles.module.css'

export function TrendingDestinationsSection() {
  const { data, isLoading, isError } = useTrendingDestinationsQuery()

  if (isLoading) {
    return (
      <Box className={styles.cardsGrid}>
        {Array.from({ length: 4 }).map((_, i) => (
          <HomeSkeletonCard key={i} />
        ))}
      </Box>
    )
  }

  if (isError) {
    return <Alert severity="error">Unable to load trending destinations at the moment.</Alert>
  }

  if (!data || data.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        No trending destinations right now. Check back later!
      </Typography>
    )
  }

  return (
    <Box className={styles.cardsGrid}>
      {data.map((dest) => (
        <Card key={dest.cityId}>
          {dest.thumbnailUrl && (
            <CardMedia
              component="img"
              height="140"
              image={dest.thumbnailUrl}
              alt={dest.cityName ?? 'Destination'}
            />
          )}
          <CardContent>
            <Typography variant="h6">
              {dest.cityName}, {dest.countryName}
            </Typography>
            {dest.description && (
              <Typography variant="body2" color="text.secondary">
                {dest.description}
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}
