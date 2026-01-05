import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
} from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'
import { startOfToday, addDays, formatDateForApi } from '@/utils/date'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { selectSearchParams, setSearchParams } from '@/store/searchSlice'

type DateSelectionDialogProps = {
  open: boolean
  onClose: () => void
  onConfirm: (checkInDate: string, checkOutDate: string) => void
}

export function DateSelectionDialog({ open, onClose, onConfirm }: DateSelectionDialogProps) {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const stored = useAppSelector(selectSearchParams)

  const today = startOfToday()
  const tomorrow = addDays(today, 1)

  const validationSchema = yup.object({
    checkInDate: yup.string().required(t('home.checkInRequired')),
    checkOutDate: yup
      .string()
      .required(t('home.checkOutRequired'))
      .test('is-after-checkin', t('home.checkOutAfterCheckIn'), function (value) {
        const { checkInDate } = this.parent as { checkInDate: string }
        if (!checkInDate || !value) return true
        return new Date(value) > new Date(checkInDate)
      }),
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      checkInDate: stored.checkInDate || formatDateForApi(today),
      checkOutDate: stored.checkOutDate || formatDateForApi(tomorrow),
    },
    validationSchema,
    onSubmit(values) {
      // Update search params with dates
      dispatch(
        setSearchParams({ checkInDate: values.checkInDate, checkOutDate: values.checkOutDate }),
      )
      onConfirm(values.checkInDate, values.checkOutDate)
      onClose()
    },
  })

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t('hotel.selectDates')}</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {t('hotel.selectDatesMessage')}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              name="checkInDate"
              label={t('home.checkIn')}
              type="date"
              fullWidth
              value={formik.values.checkInDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.checkInDate && Boolean(formik.errors.checkInDate)}
              helperText={formik.touched.checkInDate && formik.errors.checkInDate}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              name="checkOutDate"
              label={t('home.checkOut')}
              type="date"
              fullWidth
              value={formik.values.checkOutDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.checkOutDate && Boolean(formik.errors.checkOutDate)}
              helperText={formik.touched.checkOutDate && formik.errors.checkOutDate}
              InputLabelProps={{ shrink: true }}
              inputProps={{
                min: formik.values.checkInDate,
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>{t('common.cancel')}</Button>
          <Button type="submit" variant="contained">
            {t('common.confirm')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
