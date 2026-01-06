import { useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  Stack,
  TextField,
  InputAdornment,
  Collapse,
  IconButton,
} from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { selectSearchParams, setSearchParams, clearSearchParams } from '@/store/searchSlice'
import { useTranslation } from 'react-i18next'
import EditIcon from '@mui/icons-material/Edit'
import SearchIcon from '@mui/icons-material/Search'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ClearIcon from '@mui/icons-material/Clear'
import RefreshIcon from '@mui/icons-material/Refresh'
import { formatDateForDisplay, startOfToday, addDays, formatDateForApi } from '@/utils/date'
import { GuestRoomSelector } from '@/pages/Home/components/GuestRoomSelector'
import { UI } from '@/constants'

export function EditableSearchBar() {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'
  const dispatch = useAppDispatch()
  const stored = useAppSelector(selectSearchParams)
  const [isExpanded, setIsExpanded] = useState(false)

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

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      city: stored.city || stored.searchQuery || '',
      checkInDate: stored.checkInDate || formatDateForApi(today),
      checkOutDate: stored.checkOutDate || formatDateForApi(tomorrow),
      adults: stored.adults ?? 2,
      children: stored.children ?? 0,
      rooms: stored.rooms ?? 1,
    },
    validationSchema,
    onSubmit(values) {
      dispatch(setSearchParams({ ...values, searchQuery: values.city }))
      setIsExpanded(false)
    },
  })

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return ''
    try {
      return formatDateForDisplay(dateStr)
    } catch {
      return dateStr
    }
  }

  const searchQuery = stored.searchQuery || stored.city || ''
  const checkInDate = formatDate(stored.checkInDate)
  const checkOutDate = formatDate(stored.checkOutDate)
  const adults = stored.adults ?? 0
  const children = stored.children ?? 0
  const rooms = stored.rooms ?? 0

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        mb: 2,
        backgroundColor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Box sx={{ flex: 1, minWidth: 200 }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            {t('search.currentSearch')}
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {searchQuery && (
              <Chip
                label={
                  <Typography variant="body2">
                    <strong>{t('search.searchQuery')}:</strong> {searchQuery}
                  </Typography>
                }
                size="small"
                variant="outlined"
              />
            )}
            {checkInDate && (
              <Chip
                label={
                  <Typography variant="body2">
                    <strong>{t('home.checkIn')}:</strong> {checkInDate}
                  </Typography>
                }
                size="small"
                variant="outlined"
              />
            )}
            {checkOutDate && (
              <Chip
                label={
                  <Typography variant="body2">
                    <strong>{t('home.checkOut')}:</strong> {checkOutDate}
                  </Typography>
                }
                size="small"
                variant="outlined"
              />
            )}
            {adults > 0 && (
              <Chip
                label={
                  <Typography variant="body2">
                    <strong>{t('guestRoom.adults')}:</strong> {adults}
                  </Typography>
                }
                size="small"
                variant="outlined"
              />
            )}
            {children > 0 && (
              <Chip
                label={
                  <Typography variant="body2">
                    <strong>{t('guestRoom.children')}:</strong> {children}
                  </Typography>
                }
                size="small"
                variant="outlined"
              />
            )}
            {rooms > 0 && (
              <Chip
                label={
                  <Typography variant="body2">
                    <strong>{t('guestRoom.rooms')}:</strong> {rooms}
                  </Typography>
                }
                size="small"
                variant="outlined"
              />
            )}
          </Stack>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
          <Button
            variant="outlined"
            size="small"
            color="secondary"
            startIcon={<RefreshIcon />}
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
              setIsExpanded(false)
            }}
          >
            {t('common.clear')}
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={isExpanded ? <ExpandLessIcon /> : <EditIcon />}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? t('search.collapseSearch') : t('search.editSearch')}
          </Button>
        </Box>
      </Box>

      <Collapse in={isExpanded}>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            mt: 2,
            pt: 2,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2}
            sx={{ alignItems: { xs: 'stretch', md: 'center' } }}
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
                    <SearchIcon />
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
                      aria-label="clear"
                    >
                      <ClearIcon fontSize="small" />
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
              error={formik.touched.checkInDate && Boolean(formik.errors.checkInDate)}
              helperText={formik.touched.checkInDate && formik.errors.checkInDate}
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
              error={formik.touched.checkOutDate && Boolean(formik.errors.checkOutDate)}
              helperText={formik.touched.checkOutDate && formik.errors.checkOutDate}
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

            <Box sx={{ flexShrink: 0, display: 'flex', gap: 1, width: { xs: '100%', md: 'auto' } }}>
              <Button
                type="button"
                variant="outlined"
                color="secondary"
                size="large"
                startIcon={<RefreshIcon />}
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
                  setIsExpanded(false)
                }}
                sx={{ flex: { xs: 1, md: 'none' } }}
              >
                {t('common.clear')}
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                startIcon={<SearchIcon />}
                sx={{ flex: { xs: 1, md: 'none' } }}
              >
                {t('common.search')}
              </Button>
            </Box>
          </Stack>
        </Box>
      </Collapse>
    </Paper>
  )
}
