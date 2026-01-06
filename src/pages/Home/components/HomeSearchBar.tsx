import { Box, Button, TextField, Paper, InputAdornment, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import RefreshIcon from '@mui/icons-material/Refresh'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { selectSearchParams, setSearchParams, clearSearchParams } from '@/store/searchSlice'
import { startOfToday, addDays, formatDateForApi } from '@/utils/date'
import { GuestRoomSelector } from './GuestRoomSelector'
import { useTranslation } from 'react-i18next'
import { ROUTES, UI } from '@/constants'

type SearchValues = {
  city: string
  checkInDate: string
  checkOutDate: string
  adults: number
  children: number
  rooms: number
}

export function HomeSearchBar() {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const stored = useAppSelector(selectSearchParams)

  const today = startOfToday()
  const tomorrow = addDays(today, 1)

  const validationSchema = yup.object({
    city: yup.string(),
    checkInDate: yup.string().required(t('home.checkInRequired')),
    checkOutDate: yup
      .string()
      .required(t('home.checkOutRequired'))
      .test('is-after-checkin', t('home.checkOutAfterCheckIn'), function (value) {
        const { checkInDate } = this.parent as { checkInDate: string }
        if (!checkInDate || !value) return true
        return new Date(value) > new Date(checkInDate)
      }),
    adults: yup.number().min(1, t('validation.adultsMin')).required(t('validation.required')),
    children: yup.number().min(0, t('validation.childrenMin')).required(t('validation.required')),
    rooms: yup.number().min(1, t('validation.roomsMin')).required(t('validation.required')),
  })

  const formik = useFormik<SearchValues>({
    enableReinitialize: true,
    initialValues: {
      city: stored.city || '',
      checkInDate: stored.checkInDate || formatDateForApi(today),
      checkOutDate: stored.checkOutDate || formatDateForApi(tomorrow),
      adults: stored.adults ?? 2,
      children: stored.children ?? 0,
      rooms: stored.rooms ?? 1,
    },
    validationSchema,
    onSubmit(values) {
      dispatch(setSearchParams({ ...values, searchQuery: values.city }))

      void navigate(ROUTES.SEARCH)
    },
  })

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 2,
        alignItems: 'center',
      }}
      component="form"
      onSubmit={formik.handleSubmit}
    >
      <TextField
        name="city"
        label={t('home.whereGoing')}
        placeholder={t('home.whereGoingPlaceholder')}
        size="small"
        value={formik.values.city}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.city && Boolean(formik.errors.city)}
        sx={{ flex: UI.SEARCH_BAR.CITY_FLEX, minWidth: UI.SEARCH_BAR.CITY_MIN_WIDTH }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon aria-hidden="true" />
            </InputAdornment>
          ),
          endAdornment: formik.values.city ? (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={() => {
                  void formik.setFieldValue('city', '')
                }}
                edge="end"
                aria-label={t('common.clear') || 'Clear city field'}
              >
                <ClearIcon fontSize="small" aria-hidden="true" />
              </IconButton>
            </InputAdornment>
          ) : undefined,
        }}
      />

      <TextField
        name="checkInDate"
        label={t('home.checkIn')}
        type="date"
        size="small"
        value={formik.values.checkInDate}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        InputLabelProps={{ shrink: true }}
        sx={{ flex: UI.SEARCH_BAR.DATE_FLEX, minWidth: UI.SEARCH_BAR.DATE_MIN_WIDTH }}
        inputProps={{
          dir: isRTL ? 'rtl' : 'ltr',
        }}
      />

      <TextField
        name="checkOutDate"
        label={t('home.checkOut')}
        type="date"
        size="small"
        value={formik.values.checkOutDate}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        InputLabelProps={{ shrink: true }}
        sx={{ flex: UI.SEARCH_BAR.DATE_FLEX, minWidth: UI.SEARCH_BAR.DATE_MIN_WIDTH }}
        inputProps={{
          min: formik.values.checkInDate,
          dir: isRTL ? 'rtl' : 'ltr',
        }}
      />

      <GuestRoomSelector
        adults={formik.values.adults}
        children={formik.values.children}
        rooms={formik.values.rooms}
        onChange={(next) => {
          void formik.setFieldValue('adults', next.adults)
          void formik.setFieldValue('children', next.children)
          void formik.setFieldValue('rooms', next.rooms)
        }}
      />

      <Box sx={{ flexShrink: 0, display: 'flex', gap: 1 }}>
        <Button
          type="button"
          variant="outlined"
          color="primary"
          size="large"
          startIcon={<RefreshIcon aria-hidden="true" />}
          aria-label={t('common.clear') || 'Clear search form'}
          onClick={() => {
            dispatch(clearSearchParams())
            void formik.resetForm({
              values: {
                city: '',
                checkInDate: formatDateForApi(today),
                checkOutDate: formatDateForApi(tomorrow),
                adults: 2,
                children: 0,
                rooms: 1,
              },
            })
          }}
        >
          {t('common.clear')}
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          startIcon={<SearchIcon aria-hidden="true" />}
          aria-label={t('common.search') || 'Search hotels'}
        >
          {t('common.search')}
        </Button>
      </Box>
    </Paper>
  )
}
