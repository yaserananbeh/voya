import { Button, MenuItem, Stack, TextField } from '@mui/material'
import { Form, Formik } from 'formik'
import { bookingSchema } from './bookingSchema'

export type UserInfoValues = {
  customerName: string
  paymentMethod: string
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
            helpers.setStatus('Unexpected error occurred')
          }
        }
      }}
    >
      {({ values, handleChange, touched, errors, status }) => (
        <Form>
          <Stack spacing={2}>
            <TextField
              name="customerName"
              label="Full name"
              value={values.customerName}
              onChange={handleChange}
              error={Boolean(touched.customerName && errors.customerName)}
              helperText={touched.customerName && errors.customerName ? errors.customerName : ' '}
              fullWidth
            />

            <TextField
              select
              name="paymentMethod"
              label="Payment method"
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

            {typeof status === 'string' && (
              <TextField value={status} error fullWidth InputProps={{ readOnly: true }} />
            )}

            <Button type="submit" variant="contained" disabled={submitting}>
              Confirm booking
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  )
}
