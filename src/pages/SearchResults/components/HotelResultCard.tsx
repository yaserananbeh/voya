import { Card, CardContent, CardMedia, Typography, Stack, Box, Button } from '@mui/material'
import { Rating } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import type { HotelDto } from '@/api/hotels'

function getMinRoomPrice(hotel: HotelDto): number | null {
  const prices = (hotel.rooms ?? []).map((r) => r.price).filter((p) => typeof p === 'number')
  if (prices.length === 0) return null
  return Math.min(...prices)
}

export function HotelResultCard({ hotel }: { hotel: HotelDto }) {
  const navigate = useNavigate()
  const price = getMinRoomPrice(hotel)

  return (
    <Card sx={{ display: 'flex', gap: 2, p: 1 }}>
      {hotel.imageUrl ? (
        <CardMedia
          component="img"
          image={hotel.imageUrl}
          alt={hotel.name}
          sx={{ width: 160, height: 120, borderRadius: 1, objectFit: 'cover' }}
        />
      ) : (
        <Box sx={{ width: 160, height: 120, borderRadius: 1, bgcolor: 'action.hover' }} />
      )}

      <CardContent sx={{ flex: 1, minWidth: 0 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="h6" noWrap>
              {hotel.name}
            </Typography>

            <Typography variant="body2" color="text.secondary" noWrap>
              {hotel.location} • {hotel.hotelType}
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
              <Rating value={hotel.starRating} readOnly />
            </Stack>

            <Typography variant="body2" sx={{ mt: 1 }} noWrap>
              {hotel.description}
            </Typography>
          </Box>

          <Stack alignItems="flex-end" spacing={1}>
            <Typography variant="h6">{price !== null ? `$${price}/night` : '—'}</Typography>
            <Button variant="contained" onClick={() => void navigate(`/hotels/${hotel.id}`)}>
              View Hotel
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}
