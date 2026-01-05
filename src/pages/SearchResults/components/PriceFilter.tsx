import { Slider, Typography, Stack } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { selectSearchFilters, setSearchFilters } from '@/store/searchSlice'
import { useTranslation } from 'react-i18next'
import { HOTEL } from '@/constants'

export function PriceFilter() {
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
  const { priceRange = HOTEL.PRICE_RANGE.DEFAULT } = useSelector(selectSearchFilters)
  const isRTL = i18n.language === 'ar'

  const handleChange = (_: unknown, value: number | number[]) => {
    dispatch(setSearchFilters({ priceRange: value as [number, number] }))
  }

  return (
    <Stack spacing={1}>
      <Typography variant="subtitle1">{t('search.priceRange')}</Typography>
      <Slider
        value={priceRange}
        min={HOTEL.PRICE_RANGE.MIN}
        max={HOTEL.PRICE_RANGE.MAX}
        onChange={handleChange}
        valueLabelDisplay="auto"
        sx={{
          direction: isRTL ? 'rtl' : 'ltr',
        }}
      />
    </Stack>
  )
}
