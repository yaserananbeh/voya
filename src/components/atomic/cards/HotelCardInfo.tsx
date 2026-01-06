import { Typography, Stack, Rating } from '@mui/material'

type HotelCardInfoProps = {
  name: string
  location?: string | null
  hotelType?: string | null
  starRating?: number | null
  description?: string | null
  showDescription?: boolean
}

export function HotelCardInfo({
  name,
  location,
  hotelType,
  starRating,
  description,
  showDescription = false,
}: HotelCardInfoProps) {
  return (
    <>
      <Typography
        variant="h6"
        sx={{
          fontSize: { xs: '1.1rem', sm: '1.25rem' },
          overflow: { xs: 'visible', sm: 'hidden' },
          textOverflow: { xs: 'clip', sm: 'ellipsis' },
          whiteSpace: { xs: 'normal', sm: 'nowrap' },
        }}
      >
        {name}
      </Typography>

      {(location || hotelType) && (
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
          {[location, hotelType].filter(Boolean).join(' • ')}
        </Typography>
      )}

      {starRating !== null && starRating !== undefined && (
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
          <Rating value={starRating} readOnly size="small" />
        </Stack>
      )}

      {showDescription && description && (
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
          {description}
        </Typography>
      )}
    </>
  )
}
