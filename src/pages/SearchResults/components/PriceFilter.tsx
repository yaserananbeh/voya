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

  const getAriaLabel = (index: number) => {
    return index === 0
      ? t('search.priceRangeMin', { defaultValue: 'Minimum price' })
      : t('search.priceRangeMax', { defaultValue: 'Maximum price' })
  }

  const getAriaValueText = (value: number) => {
    return `$${value}`
  }

  return (
    <Stack spacing={1}>
      <Typography variant="subtitle1" component="label" id="price-range-label">
        {t('search.priceRange')}
      </Typography>
      <Slider
        value={priceRange}
        min={HOTEL.PRICE_RANGE.MIN}
        max={HOTEL.PRICE_RANGE.MAX}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaLabel={getAriaLabel}
        getAriaValueText={getAriaValueText}
        aria-labelledby="price-range-label"
        sx={{
          direction: isRTL ? 'rtl' : 'ltr',
        }}
      />
    </Stack>
  )
}
