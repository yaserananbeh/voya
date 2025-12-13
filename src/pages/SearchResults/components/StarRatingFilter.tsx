import { Rating, Typography, Stack, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { selectSearchFilters, setSearchFilters } from '@/store/searchSlice'

export function StarRatingFilter() {
  const dispatch = useDispatch()
  const { stars = null } = useSelector(selectSearchFilters)

  return (
    <Stack spacing={1}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1">Star Rating</Typography>
        <Button size="small" onClick={() => dispatch(setSearchFilters({ stars: null }))}>
          Clear
        </Button>
      </Stack>

      <Rating value={stars} onChange={(_, value) => dispatch(setSearchFilters({ stars: value }))} />
    </Stack>
  )
}
