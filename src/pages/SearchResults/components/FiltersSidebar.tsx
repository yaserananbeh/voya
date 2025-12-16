import { Paper, Typography, Stack, Divider, Box } from '@mui/material'
import { PriceFilter } from './PriceFilter'
import { StarRatingFilter } from './StarRatingFilter'
import { AmenitiesFilter } from './AmenitiesFilter'
import { HotelTypeFilter } from './HotelTypeFilter'

export function FiltersSidebar() {
  return (
    <Box
      sx={{
        position: 'sticky',
        top: 80, // Account for header height
        maxHeight: 'calc(100vh - 100px)',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '4px',
          '&:hover': {
            background: 'rgba(0,0,0,0.3)',
          },
        },
      }}
    >
      <Paper elevation={1} sx={{ p: 3 }}>
        <Stack spacing={3}>
          <Typography variant="h6" fontWeight={600}>
            Filters
          </Typography>

          <Box>
            <PriceFilter />
          </Box>
          <Divider />

          <Box>
            <StarRatingFilter />
          </Box>
          <Divider />

          <Box>
            <AmenitiesFilter />
          </Box>
          <Divider />

          <Box>
            <HotelTypeFilter />
          </Box>
        </Stack>
      </Paper>
    </Box>
  )
}
