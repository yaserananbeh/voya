import { Stack, Typography, Rating, Paper, Divider } from '@mui/material'
import type { HotelReviewDto } from '@/api/hotels'

type Props = {
  reviews: HotelReviewDto[]
}

export function HotelReviews({ reviews }: Props) {
  if (reviews.length === 0) {
    return (
      <div>
        <Typography variant="h6">Reviews</Typography>
        <Typography color="text.secondary">No reviews yet.</Typography>
      </div>
    )
  }

  const average =
    Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) * 10) / 10

  return (
    <div>
      {/* Header / Summary */}
      <Stack spacing={1} mb={2}>
        <Typography variant="h6">Guest Reviews</Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Rating value={average} precision={0.1} readOnly />
          <Typography fontWeight="bold">{average}</Typography>
          <Typography color="text.secondary">({reviews.length} reviews)</Typography>
        </Stack>
      </Stack>

      {/* Reviews list */}
      <Stack spacing={2}>
        {reviews.map((r) => (
          <Paper key={r.reviewId} sx={{ p: 2 }}>
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between">
                <Typography fontWeight="bold">{r.customerName}</Typography>
                <Rating value={r.rating} precision={0.5} readOnly size="small" />
              </Stack>

              <Divider />

              <Typography variant="body2">{r.description}</Typography>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </div>
  )
}
