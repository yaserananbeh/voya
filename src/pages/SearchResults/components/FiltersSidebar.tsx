import { Box } from '@mui/material'
import { PriceFilter } from './PriceFilter'
import { StarRatingFilter } from './StarRatingFilter'
import { AmenitiesFilter } from './AmenitiesFilter'
import { HotelTypeFilter } from './HotelTypeFilter'
import { useTranslation } from 'react-i18next'
import { FilterContainer, FilterSection } from './FilterContainer'

type FiltersSidebarProps = {
  onClose?: () => void
}

export function FiltersSidebar({ onClose }: FiltersSidebarProps) {
  const { t } = useTranslation()

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
      <FilterContainer title={t('search.filters')} onClose={onClose}>
        <FilterSection>
          <PriceFilter />
        </FilterSection>

        <FilterSection>
          <StarRatingFilter />
        </FilterSection>

        <FilterSection>
          <AmenitiesFilter />
        </FilterSection>

        <FilterSection showDivider={false}>
          <HotelTypeFilter />
        </FilterSection>
      </FilterContainer>
    </Box>
  )
}
