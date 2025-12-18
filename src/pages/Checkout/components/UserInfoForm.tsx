import {
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Box,
  InputAdornment,
  alpha,
  useTheme,
} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import PaymentIcon from '@mui/icons-material/Payment'
import NotesIcon from '@mui/icons-material/Notes'
import { Form, Formik } from 'formik'
import { bookingSchema } from './bookingSchema'
import { useTranslation } from 'react-i18next'

export type UserInfoValues = {
  customerName: string
  paymentMethod: string
  specialRequests?: string
}

export function UserInfoForm({
  initialValues,
  onSubmit,
  submitting,
}: {
  initialValues: UserInfoValues
  onSubmit: (values: UserInfoValues) => Promise<void>
  submitting: boolean
}) {
  const { t } = useTranslation()
  const theme = useTheme()

  return (
    <Formik<UserInfoValues>
      initialValues={initialValues}
      validationSchema={bookingSchema}
      onSubmit={async (values, helpers) => {
        try {
          await onSubmit(values)
        } catch (error: unknown) {
          if (error instanceof Error) {
            helpers.setStatus(error.message)
          } else {
            helpers.setStatus(t('checkout.unexpectedError'))
          }
        }
      }}
    >
      {({ values, handleChange, touched, errors, status }) => (
        <Form>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              {t('checkout.customerInfo') || 'Customer Information'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('checkout.fillDetails') || 'Please fill in your details to complete the booking'}
            </Typography>
          </Box>

          <Stack spacing={3}>
            <TextField
              name="customerName"
              label={t('checkout.fullName')}
              value={values.customerName}
              onChange={handleChange}
              error={Boolean(touched.customerName && errors.customerName)}
              helperText={touched.customerName && errors.customerName ? errors.customerName : ' '}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />

            <TextField
              select
              name="paymentMethod"
              label={t('checkout.paymentMethod')}
              value={values.paymentMethod}
              onChange={handleChange}
              error={Boolean(touched.paymentMethod && errors.paymentMethod)}
              helperText={
                touched.paymentMethod && errors.paymentMethod ? errors.paymentMethod : ' '
              }
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PaymentIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            >
              <MenuItem value="Cash">Cash</MenuItem>
              <MenuItem value="Card">Card</MenuItem>
              <MenuItem value="PayPal">PayPal</MenuItem>
            </TextField>

            <TextField
              name="specialRequests"
              label={t('checkout.specialRequests')}
              value={values.specialRequests || ''}
              onChange={handleChange}
              error={Boolean(touched.specialRequests && errors.specialRequests)}
              helperText={
                touched.specialRequests && errors.specialRequests
                  ? errors.specialRequests
                  : t('checkout.specialRequestsHelper')
              }
              fullWidth
              multiline
              rows={4}
              placeholder={t('checkout.specialRequestsPlaceholder')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                    <NotesIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />

            {typeof status === 'string' && (
              <TextField value={status} error fullWidth InputProps={{ readOnly: true }} />
            )}

            <Button
              type="submit"
              variant="contained"
              disabled={submitting}
              size="large"
              fullWidth
              sx={{
                mt: 2,
                py: 1.5,
                borderRadius: 2,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.main} 90%)`,
                fontWeight: 700,
                fontSize: '1rem',
                textTransform: 'none',
                '&:hover': {
                  background: `linear-gradient(135deg, ${theme.palette.primary.dark} 30%, ${theme.palette.secondary.dark} 90%)`,
                },
                '&:disabled': {
                  background: alpha(theme.palette.primary.main, 0.5),
                },
              }}
            >
              {t('checkout.confirmBooking')}
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  )
}
