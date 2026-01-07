import { Container, Typography, Stack, Box } from '@mui/material'
import { HotelGallery } from './components/HotelGallery'
import { HotelAmenities } from './components/HotelAmenities'
import { HotelMap } from './components/HotelMap'
import { HotelRooms } from './components/HotelRooms'
import { HotelReviews } from './components/HotelReviews'
import { VoyaLoader } from '@/components'
import { useTranslation } from 'react-i18next'
import { StarRatingDisplay } from '@/components/atomic'
import type { HotelDto, HotelRoomDto, HotelReviewDto, HotelGalleryPhotoDto } from './api'

type HotelPresentationalProps = {
  hotel?: HotelDto | null
  gallery?: HotelGalleryPhotoDto[]
  rooms?: HotelRoomDto[]
  reviews?: HotelReviewDto[]
  isLoading?: boolean
  isError?: boolean
  error?: string
}

export function HotelPresentational({
  hotel,
  gallery,
  rooms,
  reviews,
  isLoading,
  isError,
  error,
}: HotelPresentationalProps) {
  const { t } = useTranslation()

  if (error) {
    return <Typography color="error">{error}</Typography>
  }

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 200px)',
        }}
      >
        <VoyaLoader />
      </Box>
    )
  }

  if (isError || !hotel) {
    return <Typography color="error">{t('hotel.failedToLoadHotel')}</Typography>
  }

  return (
    <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
      <Stack spacing={{ xs: 2, sm: 4 }}>
        <div>
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
            }}
          >
            {hotel.hotelName ?? hotel.name}
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            sx={{ mt: 1 }}
          >
            <StarRatingDisplay rating={hotel.starRating ?? 0} />
            <Typography color="text.secondary" variant="body2">
              {hotel.location}
            </Typography>
          </Stack>
        </div>

        <HotelGallery
          images={gallery ?? (hotel.imageUrl ? [hotel.imageUrl] : [])}
          hotelName={hotel.hotelName ?? hotel.name}
        />

        <Typography>{hotel.description}</Typography>

        <HotelAmenities amenities={hotel.amenities} />

        {hotel.latitude !== undefined && hotel.longitude !== undefined && (
          <HotelMap lat={hotel.latitude} lng={hotel.longitude} />
        )}

        <HotelRooms
          hotelId={hotel.id}
          hotelName={hotel.hotelName ?? hotel.name}
          cityName={hotel.location}
          rooms={rooms ?? hotel.rooms}
        />

        <HotelReviews reviews={reviews ?? []} />
      </Stack>
    </Container>
  )
}
