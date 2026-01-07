import { Stack, Typography, Box } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import PaymentIcon from '@mui/icons-material/Payment'
import NotesIcon from '@mui/icons-material/Notes'
import { useFormik } from 'formik'
import { createBookingSchema } from './bookingSchema'
import { useTranslation } from 'react-i18next'
import { PAYMENT_METHOD_OPTIONS, FORM } from '../constants'
import { FormTextField, FormSelectField, SubmitButton } from './'

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

  const formik = useFormik<UserInfoValues>({
    initialValues,
    validationSchema: createBookingSchema(t),
    onSubmit: async (values, helpers) => {
      try {
        await onSubmit(values)
      } catch (error: unknown) {
        if (error instanceof Error) {
          helpers.setStatus(error.message)
        } else {
          helpers.setStatus(t('checkout.unexpectedError'))
        }
      }
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={700} gutterBottom component="h2">
          {t('checkout.customerInfo') || 'Customer Information'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('checkout.fillDetails') || 'Please fill in your details to complete the booking'}
        </Typography>
      </Box>

      <Stack spacing={3}>
        <FormTextField
          name="customerName"
          label={t('checkout.fullName')}
          value={formik.values.customerName}
          onChange={(value) => void formik.setFieldValue('customerName', value)}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.customerName && formik.errors.customerName)}
          helperText={
            formik.touched.customerName && formik.errors.customerName
              ? formik.errors.customerName
              : ' '
          }
          autoComplete="name"
          aria-required={true}
          aria-invalid={Boolean(formik.touched.customerName && formik.errors.customerName)}
          startAdornment={<PersonIcon sx={{ color: 'text.secondary' }} aria-hidden="true" />}
        />

        <FormSelectField
          name="paymentMethod"
          label={t('checkout.paymentMethod')}
          value={formik.values.paymentMethod}
          onChange={(value) => void formik.setFieldValue('paymentMethod', value)}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.paymentMethod && formik.errors.paymentMethod)}
          helperText={
            formik.touched.paymentMethod && formik.errors.paymentMethod
              ? formik.errors.paymentMethod
              : ' '
          }
          autoComplete="payment-method"
          aria-required={true}
          aria-invalid={Boolean(formik.touched.paymentMethod && formik.errors.paymentMethod)}
          startAdornment={<PaymentIcon sx={{ color: 'text.secondary' }} aria-hidden="true" />}
          options={PAYMENT_METHOD_OPTIONS.map((method) => ({
            value: method,
            label: t(`checkout.paymentMethods.${method}`, { defaultValue: method }),
          }))}
        />

        <FormTextField
          name="specialRequests"
          label={t('checkout.specialRequests')}
          value={formik.values.specialRequests || ''}
          onChange={(value) => void formik.setFieldValue('specialRequests', value)}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.specialRequests && formik.errors.specialRequests)}
          helperText={
            formik.touched.specialRequests && formik.errors.specialRequests
              ? formik.errors.specialRequests
              : t('checkout.specialRequestsHelper')
          }
          placeholder={t('checkout.specialRequestsPlaceholder')}
          multiline
          rows={FORM.SPECIAL_REQUESTS_ROWS}
          startAdornment={
            <Box sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
              <NotesIcon sx={{ color: 'text.secondary' }} aria-hidden="true" />
            </Box>
          }
        />

        {typeof formik.status === 'string' && (
          <Box role="alert" aria-live="assertive">
            <FormTextField
              name="error"
              label=""
              value={formik.status}
              onChange={() => {}}
              error
              helperText={formik.status}
              readOnly
            />
          </Box>
        )}

        <SubmitButton
          disabled={submitting}
          loading={submitting}
          loadingText={t('checkout.processing')}
          aria-label={submitting ? t('checkout.processing') : t('checkout.confirmBooking')}
          sx={{ mt: 2 }}
        >
          {t('checkout.confirmBooking')}
        </SubmitButton>
      </Stack>
    </form>
  )
}
