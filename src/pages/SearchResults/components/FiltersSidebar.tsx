import {
  Paper,
  Typography,
  Stack,
  Divider,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { PriceFilter } from './PriceFilter'
import { StarRatingFilter } from './StarRatingFilter'
import { AmenitiesFilter } from './AmenitiesFilter'
import { HotelTypeFilter } from './HotelTypeFilter'

type FiltersSidebarProps = {
  onClose?: () => void
}

export function FiltersSidebar({ onClose }: FiltersSidebarProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box
      sx={{
        position: { xs: 'static', md: 'sticky' },
        top: { md: 80 },
        maxHeight: { xs: 'none', md: 'calc(100vh - 100px)' },
        overflowY: { xs: 'visible', md: 'auto' },
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
      <Paper elevation={1} sx={{ p: { xs: 2, md: 3 } }}>
        <Stack spacing={3}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight={600}>
              Filters
            </Typography>
            {isMobile && onClose && (
              <IconButton onClick={onClose} size="small">
                <CloseIcon />
              </IconButton>
            )}
          </Box>

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
