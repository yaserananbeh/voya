import { Stack, Chip } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { selectSearchFilters, setSearchFilters } from '@/pages/SearchResults/store'
import { useTranslation } from 'react-i18next'
import { HOTEL } from '@/pages/Hotel/constants'

export function SelectedFiltersBar() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { priceRange, stars, amenities = [], hotelTypes = [] } = useSelector(selectSearchFilters)

  const chips: Array<{ key: string; label: string; onDelete: () => void }> = []

  if (
    priceRange &&
    (priceRange[0] !== HOTEL.PRICE_RANGE.MIN || priceRange[1] !== HOTEL.PRICE_RANGE.MAX)
  ) {
    chips.push({
      key: 'priceRange',
      label: t('search.priceLabel', { min: priceRange[0], max: priceRange[1] }),
      onDelete: () => dispatch(setSearchFilters({ priceRange: undefined })),
    })
  }

  if (stars !== null && stars !== undefined) {
    chips.push({
      key: 'stars',
      label: `${stars}★`,
      onDelete: () => dispatch(setSearchFilters({ stars: null })),
    })
  }

  for (const a of amenities) {
    chips.push({
      key: `amenity:${a}`,
      label: a,
      onDelete: () =>
        dispatch(
          setSearchFilters({
            amenities: amenities.filter((x) => x !== a),
          }),
        ),
    })
  }

  for (const t of hotelTypes) {
    chips.push({
      key: `hotelType:${t}`,
      label: t,
      onDelete: () =>
        dispatch(
          setSearchFilters({
            hotelTypes: hotelTypes.filter((x) => x !== t),
          }),
        ),
    })
  }

  if (chips.length === 0) return null

  return (
    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
      {chips.map((c) => (
        <Chip key={c.key} label={c.label} onDelete={c.onDelete} />
      ))}
    </Stack>
  )
}
