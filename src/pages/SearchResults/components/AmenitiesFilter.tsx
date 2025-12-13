import { Checkbox, FormControlLabel, FormGroup, Typography, Stack } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchFilters, selectSearchFilters } from '@/store/searchSlice'
import { useAmenities } from '../hooks/useAmenities'

export function AmenitiesFilter() {
  const dispatch = useDispatch()
  const { amenities = [] } = useSelector(selectSearchFilters)
  const { data, isLoading, isError } = useAmenities()

  const toggle = (amenity: string) => {
    const updated = amenities.includes(amenity)
      ? amenities.filter((a) => a !== amenity)
      : [...amenities, amenity]

    dispatch(setSearchFilters({ amenities: updated }))
  }

  const options = (data ?? []).map((x) => x.name)

  return (
    <Stack spacing={1}>
      <Typography variant="subtitle1">Amenities</Typography>

      {isLoading && (
        <Typography variant="body2" color="text.secondary">
          Loading amenities…
        </Typography>
      )}

      {isError && (
        <Typography variant="body2" color="error">
          Failed to load amenities
        </Typography>
      )}

      {!isLoading && !isError && (
        <FormGroup>
          {options.map((a) => (
            <FormControlLabel
              key={a}
              label={a}
              control={<Checkbox checked={amenities.includes(a)} onChange={() => toggle(a)} />}
            />
          ))}
        </FormGroup>
      )}
    </Stack>
  )
}
