import { Button, MenuItem, Stack, TextField } from '@mui/material'
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
          <Stack spacing={2}>
            <TextField
              name="customerName"
              label={t('checkout.fullName')}
              value={values.customerName}
              onChange={handleChange}
              error={Boolean(touched.customerName && errors.customerName)}
              helperText={touched.customerName && errors.customerName ? errors.customerName : ' '}
              fullWidth
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
            />

            {typeof status === 'string' && (
              <TextField value={status} error fullWidth InputProps={{ readOnly: true }} />
            )}

            <Button type="submit" variant="contained" disabled={submitting}>
              {t('checkout.confirmBooking')}
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  )
}
