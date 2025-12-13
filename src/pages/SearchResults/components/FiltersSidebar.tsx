import { Paper, Typography, Stack, Divider } from '@mui/material'
import { PriceFilter } from './PriceFilter'
import { StarRatingFilter } from './StarRatingFilter'
import { AmenitiesFilter } from './AmenitiesFilter'
import { HotelTypeFilter } from './HotelTypeFilter'

export function FiltersSidebar() {
  return (
    <Paper elevation={1} sx={{ p: 2, position: 'sticky', top: 16 }}>
      <Stack spacing={3}>
        <Typography variant="h6">Filters</Typography>

        <PriceFilter />
        <Divider />

        <StarRatingFilter />
        <Divider />

        <AmenitiesFilter />
        <Divider />

        <HotelTypeFilter />
      </Stack>
    </Paper>
  )
}
