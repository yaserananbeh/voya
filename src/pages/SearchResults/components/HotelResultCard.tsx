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
    <Card
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2,
        p: { xs: 1.5, sm: 1 },
      }}
    >
      {hotel.imageUrl ? (
        <CardMedia
          component="img"
          image={hotel.imageUrl}
          alt={hotel.name}
          sx={{
            width: { xs: '100%', sm: 160 },
            height: { xs: 200, sm: 120 },
            borderRadius: 1,
            objectFit: 'cover',
          }}
        />
      ) : (
        <Box
          sx={{
            width: { xs: '100%', sm: 160 },
            height: { xs: 200, sm: 120 },
            borderRadius: 1,
            bgcolor: 'action.hover',
          }}
        />
      )}

      <CardContent sx={{ flex: 1, minWidth: 0, p: { xs: 1, sm: 2 } }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'flex-start' }}
          spacing={2}
        >
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
                overflow: { xs: 'visible', sm: 'hidden' },
                textOverflow: { xs: 'clip', sm: 'ellipsis' },
                whiteSpace: { xs: 'normal', sm: 'nowrap' },
              }}
            >
              {hotel.name}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                overflow: { xs: 'visible', sm: 'hidden' },
                textOverflow: { xs: 'clip', sm: 'ellipsis' },
                whiteSpace: { xs: 'normal', sm: 'nowrap' },
                mt: 0.5,
              }}
            >
              {hotel.location} • {hotel.hotelType}
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
              <Rating value={hotel.starRating} readOnly size="small" />
            </Stack>

            <Typography
              variant="body2"
              sx={{
                mt: 1,
                display: { xs: '-webkit-box', sm: 'none' },
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {hotel.description}
            </Typography>
          </Box>

          <Stack
            alignItems={{ xs: 'flex-start', sm: 'flex-end' }}
            spacing={1}
            sx={{ minWidth: { xs: '100%', sm: 'auto' } }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
              }}
            >
              {price !== null ? `$${price}/night` : '—'}
            </Typography>
            <Button
              variant="contained"
              onClick={() => void navigate(`/hotel/${hotel.id}`)}
              fullWidth
              sx={{
                minWidth: { xs: '100%', sm: 'auto' },
                width: { xs: '100%', sm: 'auto' },
              }}
            >
              View Hotel
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}
