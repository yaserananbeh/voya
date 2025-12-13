import { Slider, Typography, Stack } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { selectSearchFilters, setSearchFilters } from '@/store/searchSlice'

const DEFAULT_RANGE: [number, number] = [0, 2000]

export function PriceFilter() {
  const dispatch = useDispatch()
  const { priceRange = DEFAULT_RANGE } = useSelector(selectSearchFilters)

  const handleChange = (_: unknown, value: number | number[]) => {
    dispatch(setSearchFilters({ priceRange: value as [number, number] }))
  }

  return (
    <Stack spacing={1}>
      <Typography variant="subtitle1">Price Range</Typography>
      <Slider
        value={priceRange}
        min={DEFAULT_RANGE[0]}
        max={DEFAULT_RANGE[1]}
        onChange={handleChange}
        valueLabelDisplay="auto"
      />
    </Stack>
  )
}
