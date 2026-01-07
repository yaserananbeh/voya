import { Paper, Box } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { selectSearchParams, setSearchParams, clearSearchParams } from '@/pages/SearchResults/store'
import { startOfToday, addDays, formatDateForApi } from '@/utils/date'
import { GuestRoomSelector } from '@/components/common'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '@/pages/Home/constants'
import { SEARCH_BAR } from '@/pages/SearchResults/constants'
import { SearchCityField, SearchDateField, SearchActionButtons } from './'

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
        flexWrap: { xs: 'nowrap', md: 'wrap' },
        gap: 2,
        alignItems: { xs: 'stretch', md: 'center' },
      }}
      component="form"
      onSubmit={formik.handleSubmit}
    >
      <SearchCityField
        value={formik.values.city}
        onChange={(value) => void formik.setFieldValue('city', value)}
        onBlur={formik.handleBlur}
        error={formik.touched.city && Boolean(formik.errors.city)}
        helperText={formik.touched.city && formik.errors.city}
        sx={{
          flex: SEARCH_BAR.CITY_FLEX,
          minWidth: { xs: 0, md: SEARCH_BAR.CITY_MIN_WIDTH },
          maxWidth: { xs: '100%', md: 'none' },
        }}
      />

      <Box
        sx={{
          flex: SEARCH_BAR.DATE_FLEX,
          minWidth: { xs: 0, md: SEARCH_BAR.DATE_MIN_WIDTH },
          maxWidth: { xs: '100%', md: 'none' },
        }}
      >
        <SearchDateField
          name="checkInDate"
          label={t('home.checkIn')}
          value={formik.values.checkInDate}
          onChange={(value) => void formik.setFieldValue('checkInDate', value)}
          onBlur={formik.handleBlur}
          error={formik.touched.checkInDate && Boolean(formik.errors.checkInDate)}
          helperText={formik.touched.checkInDate && formik.errors.checkInDate}
          isRTL={isRTL}
          sx={{ width: '100%' }}
        />
      </Box>

      <Box
        sx={{
          flex: SEARCH_BAR.DATE_FLEX,
          minWidth: { xs: 0, md: SEARCH_BAR.DATE_MIN_WIDTH },
          maxWidth: { xs: '100%', md: 'none' },
        }}
      >
        <SearchDateField
          name="checkOutDate"
          label={t('home.checkOut')}
          value={formik.values.checkOutDate}
          onChange={(value) => void formik.setFieldValue('checkOutDate', value)}
          onBlur={formik.handleBlur}
          error={formik.touched.checkOutDate && Boolean(formik.errors.checkOutDate)}
          helperText={formik.touched.checkOutDate && formik.errors.checkOutDate}
          min={formik.values.checkInDate}
          isRTL={isRTL}
          sx={{ width: '100%' }}
        />
      </Box>

      <Box
        sx={{
          flexShrink: { xs: 0, md: 1 },
          width: { xs: '100%', md: 'auto' },
          minWidth: { xs: '100%', md: 220 },
          maxWidth: { xs: '100%', md: 'none' },
        }}
      >
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
      </Box>

      <Box
        sx={{
          flexShrink: { xs: 0, md: 1 },
          width: { xs: '100%', md: 'auto' },
          minWidth: { xs: '100%', md: 200 },
          maxWidth: { xs: '100%', md: 'none' },
        }}
      >
        <SearchActionButtons
          onClear={() => {
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
        />
      </Box>
    </Paper>
  )
}
