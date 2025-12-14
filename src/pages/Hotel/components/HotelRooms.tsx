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

type Props = {
  rooms: HotelRoomDto[]
}

export function HotelRooms({ rooms }: Props) {
  const navigate = useNavigate()

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
                onClick={() => void navigate('/checkout', { state: room })}
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
