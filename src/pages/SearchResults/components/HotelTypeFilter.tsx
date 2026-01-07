import { Checkbox, FormControlLabel, FormGroup, Typography, Stack } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { selectSearchFilters, setSearchFilters } from '../store'
import { useTranslation } from 'react-i18next'

const HOTEL_TYPES = ['Boutique', 'Resort', 'Hotel', 'Lodge', 'Inn'] as const

export function HotelTypeFilter() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { hotelTypes = [] } = useSelector(selectSearchFilters)

  const toggle = (type: string) => {
    const updated = hotelTypes.includes(type)
      ? hotelTypes.filter((t) => t !== type)
      : [...hotelTypes, type]

    dispatch(setSearchFilters({ hotelTypes: updated }))
  }

  return (
    <Stack spacing={1}>
      <Typography variant="subtitle1">{t('search.hotelType')}</Typography>
      <FormGroup>
        {HOTEL_TYPES.map((t) => (
          <FormControlLabel
            key={t}
            label={t}
            control={<Checkbox checked={hotelTypes.includes(t)} onChange={() => toggle(t)} />}
          />
        ))}
      </FormGroup>
    </Stack>
  )
}
