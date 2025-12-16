import {
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Stack,
  Chip,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import type { HotelRoomDto } from '@/api/hotels'
import { selectSearchParams } from '@/store/searchSlice'
import type { CheckoutContext } from '@/pages/Checkout/types'
import { saveCheckoutContext } from '@/pages/Checkout/utils/checkoutStorage'
import { useAppSelector } from '@/hooks'
type Props = {
  hotelId: number
  hotelName: string
  cityName?: string | null
  rooms: HotelRoomDto[]
}

export function HotelRooms({ hotelId, hotelName, cityName, rooms }: Props) {
  const navigate = useNavigate()
  const searchParams = useAppSelector(selectSearchParams)

  const handleBook = (room: HotelRoomDto) => {
    if (!searchParams.checkInDate || !searchParams.checkOutDate) {
      return
    }

    const ctx: CheckoutContext = {
      hotelId,
      hotelName,
      roomId: room.roomId,
      roomNumber: String(room.roomNumber),
      roomType: room.roomType,
      cityName: cityName ?? undefined,
      pricePerNight: room.price,
      checkInDate: searchParams.checkInDate,
      checkOutDate: searchParams.checkOutDate,
      userId: 1,
    }

    saveCheckoutContext(ctx)
    void navigate('/checkout', { state: { checkout: ctx } })
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Available Rooms
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 3,
        }}
      >
        {rooms.map((room) => (
          <Card
            key={room.roomId}
            sx={{
              opacity: room.availability ? 1 : 0.6,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CardMedia
              component="img"
              height="180"
              image={room.roomPhotoUrl || ''}
              alt={room.roomType}
              key={room.roomId}
            />

            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6">{room.roomType}</Typography>

              <Typography color="text.secondary" variant="body2">
                {room.capacityOfAdults} Adults
              </Typography>
              <Typography color="text.secondary" variant="body2">
                {room.capacityOfChildren} Children
              </Typography>

              <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
                {(room.amenities || []).slice(0, 3).map((a) => (
                  <Chip key={a.id} label={a.name} size="small" />
                ))}
                {(room.amenities?.length || 0) > 3 && (
                  <Chip label={`+${(room.amenities?.length || 0) - 3}`} size="small" />
                )}
              </Stack>

              <Typography mt={2} fontWeight="bold">
                ${room.price} / night
              </Typography>
            </CardContent>

            <CardActions>
              <Button
                fullWidth
                variant="contained"
                disabled={!room.availability}
                onClick={() => handleBook(room)}
              >
                {room.availability ? 'Book now' : 'Not available'}
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  )
}
