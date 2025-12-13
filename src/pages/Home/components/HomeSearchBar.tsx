import { Box, Button, TextField, Paper, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { selectSearchParams, setSearchParams } from '@/store/searchSlice'
import { startOfToday, addDays, formatDateForApi } from '@/utils/date'
import { GuestRoomSelector } from './GuestRoomSelector'

const validationSchema = yup.object({
  city: yup.string().required('City is required'),
  checkInDate: yup.string().required('Check-in is required'),
  checkOutDate: yup
    .string()
    .required('Check-out is required')
    .test('is-after-checkin', 'Check-out must be after check-in', function (value) {
      const { checkInDate } = this.parent as { checkInDate: string }
      if (!checkInDate || !value) return true // Let 'required' handle empty values
      return new Date(value) > new Date(checkInDate)
    }),
  adults: yup.number().min(1).required(),
  children: yup.number().min(0).required(),
  rooms: yup.number().min(1).required(),
})

export function HomeSearchBar() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const stored = useAppSelector(selectSearchParams)

  const today = startOfToday()
  const tomorrow = addDays(today, 1)

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      city: stored.city || '',
      checkInDate: stored.checkInDate || formatDateForApi(today),
      checkOutDate: stored.checkOutDate || formatDateForApi(tomorrow),
      adults: stored.adults ?? 1,
      children: stored.children ?? 0,
      rooms: stored.rooms ?? 1,
    },
    validationSchema,
    onSubmit(values) {
      // sync to global search state
      dispatch(setSearchParams(values))

      // navigate to search results
      void navigate('/search')
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
      {/* City */}
      <TextField
        name="city"
        label="Where are you going?"
        size="small"
        value={formik.values.city}
        onChange={formik.handleChange}
        error={formik.touched.city && Boolean(formik.errors.city)}
        helperText={formik.touched.city && formik.errors.city}
        sx={{ flex: 2, minWidth: 180 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {/* Dates */}
      <TextField
        name="checkInDate"
        label="Check-in"
        type="date"
        size="small"
        value={formik.values.checkInDate}
        onChange={formik.handleChange}
        InputLabelProps={{ shrink: true }}
        sx={{ flex: 1, minWidth: 150 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CalendarMonthIcon />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        name="checkOutDate"
        label="Check-out"
        type="date"
        size="small"
        value={formik.values.checkOutDate}
        onChange={formik.handleChange}
        InputLabelProps={{ shrink: true }}
        sx={{ flex: 1, minWidth: 150 }}
        inputProps={{
          min: formik.values.checkInDate, // Prevent picking dates before check-in
        }}
      />

      {/* Guest / room selector */}
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

      {/* Submit */}
      <Box sx={{ flexShrink: 0 }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          startIcon={<SearchIcon />}
        >
          Search
        </Button>
      </Box>
    </Paper>
  )
}
