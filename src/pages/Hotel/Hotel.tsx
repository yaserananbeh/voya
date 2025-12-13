import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Alert, Container, Typography } from '@mui/material'
import { useGetHotelQuery } from '@/api/hotels'
import { addRecentHotel } from '@/utils/recentHotelsStorage'

export default function Hotel() {
  const { id } = useParams<{ id: string }>()
  const hotelId = Number(id)

  const { data, isLoading, isError, isSuccess } = useGetHotelQuery(hotelId)

  useEffect(() => {
    if (!isSuccess || !data) return

    addRecentHotel({
      hotelId: data.id,
      hotelName: data.name ?? 'Hotel',
      city: data.location ?? 'Unknown',
      starRating: data.starRating ?? 0,
      thumbnailUrl: data.imageUrl ?? '',
    })
  }, [isSuccess, data])

  // ---- UI STATES ----
  if (isLoading) {
    return <Typography>Loading hotel…</Typography>
  }

  if (isError) {
    return <Alert severity="error">Failed to load hotel information.</Alert>
  }

  if (!data) {
    return <Alert severity="warning">Hotel not found.</Alert>
  }

  // ---- MAIN HOTEL UI ----
  return (
    <Container sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom>
        {data.name}
      </Typography>

      <Typography variant="subtitle1">{data.location}</Typography>
      <Typography variant="subtitle2">⭐ {data.starRating}</Typography>

      {data.imageUrl && (
        <img
          src={data.imageUrl}
          alt={data.name}
          style={{ width: '100%', marginTop: 16, borderRadius: 8 }}
        />
      )}

      {/* Add the rest of your hotel details here */}
    </Container>
  )
}
