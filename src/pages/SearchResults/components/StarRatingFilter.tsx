import { Rating, Typography, Stack, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { selectSearchFilters, setSearchFilters } from '@/store/searchSlice'
import { useTranslation } from 'react-i18next'

export function StarRatingFilter() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { stars = null } = useSelector(selectSearchFilters)

  return (
    <Stack spacing={1}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1">{t('search.starRating')}</Typography>
        <Button size="small" onClick={() => dispatch(setSearchFilters({ stars: null }))}>
          {t('common.clear')}
        </Button>
      </Stack>

      <Rating value={stars} onChange={(_, value) => dispatch(setSearchFilters({ stars: value }))} />
    </Stack>
  )
}
