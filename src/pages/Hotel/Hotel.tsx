import { Container, Typography, Stack, Rating } from '@mui/material'
import { useParams } from 'react-router-dom'
import {
  useGetHotelQuery,
  useGetHotelGalleryQuery,
  useGetHotelRoomsQuery,
  useGetHotelReviewsQuery,
} from '@/api/hotels'
import { HotelGallery } from './components/HotelGallery'
import { HotelAmenities } from './components/HotelAmenities'
import { HotelMap } from './components/HotelMap'
import { HotelRooms } from './components/HotelRooms'
import { HotelReviews } from './components/HotelReviews'

export default function Hotel() {
  const { hotelId } = useParams()
  const id = Number(hotelId)

  const { data: hotel, isLoading, isError } = useGetHotelQuery(id, { skip: Number.isNaN(id) })

  const { data: gallery } = useGetHotelGalleryQuery(id, { skip: Number.isNaN(id) })
  const { data: rooms } = useGetHotelRoomsQuery(id, { skip: Number.isNaN(id) })
  const { data: reviews } = useGetHotelReviewsQuery(id, { skip: Number.isNaN(id) })

  if (Number.isNaN(id)) return <Typography color="error">Invalid hotel id</Typography>
  if (isLoading) return <Typography>Loading...</Typography>
  if (isError || !hotel) return <Typography color="error">Failed to load hotel</Typography>

  return (
    <Container maxWidth="lg">
      <Stack spacing={4}>
        <div>
          <Typography variant="h4">{hotel.hotelName ?? hotel.name}</Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Rating value={hotel.starRating} readOnly />
            <Typography color="text.secondary">{hotel.location}</Typography>
          </Stack>
        </div>

        <HotelGallery images={gallery ?? (hotel.imageUrl ? [hotel.imageUrl] : [])} />

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
