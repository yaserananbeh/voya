import {
  Alert,
  Box,
  Card,
  CardContent,
  Rating,
  Typography,
  Button,
  CardActions,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useRecentHotelsQuery } from '@/api/home'
import { HomeSkeletonCard } from './HomeSkeletonCard'
import { SafeImage } from '@/components/common/SafeImage'
import styles from '../styles.module.css'
import { formatDistanceToNow } from '@/utils/date'
import VisibilityIcon from '@mui/icons-material/Visibility'

const MOCK_USER_ID = 1

export function RecentHotelsSection() {
  const { data, isLoading, isError } = useRecentHotelsQuery({
    userId: MOCK_USER_ID,
  })

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
    return <Alert severity="error">Couldn&apos;t load your recent hotels right now.</Alert>
  }

  if (!data || data.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        You don&apos;t have any recently visited hotels yet.
      </Typography>
    )
  }

  return (
    <Box className={styles.cardsGrid}>
      {data.map((hotel) => (
        <Card key={hotel.hotelId} sx={{ display: 'flex', flexDirection: 'column' }}>
          <SafeImage src={hotel.thumbnailUrl} alt={hotel.hotelName ?? 'Hotel'} height={140} />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h6">{hotel.hotelName}</Typography>
            <Typography variant="body2" color="text.secondary">
              {hotel.cityName}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 1 }}>
              <Rating value={hotel.starRating} readOnly size="small" max={5} />
              <Typography variant="body2" sx={{ ml: 1 }}>
                {hotel.starRating}-star hotel
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Visited{' '}
              {formatDistanceToNow(new Date(hotel.visitDate), {
                addSuffix: true,
              })}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              component={RouterLink}
              to={`/hotel/${hotel.hotelId}`}
              variant="contained"
              fullWidth
              startIcon={<VisibilityIcon />}
            >
              View Details
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  )
}
