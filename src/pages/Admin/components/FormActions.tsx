import { Button, Stack } from '@mui/material'
import type { FormikProps } from 'formik'

type FormActionsProps<T = Record<string, unknown>> = {
  onCancel: () => void
  submitLabel?: string
  cancelLabel?: string
  isSubmitting?: boolean
  formik: FormikProps<T>
}

export function FormActions<T = Record<string, unknown>>({
  onCancel,
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
  isSubmitting = false,
  formik,
}: FormActionsProps<T>) {
  return (
    <Stack direction="row" spacing={2} justifyContent="flex-end">
      <Button onClick={onCancel} disabled={isSubmitting || formik.isSubmitting}>
        {cancelLabel}
      </Button>
      <Button type="submit" variant="contained" disabled={isSubmitting || formik.isSubmitting}>
        {submitLabel}
      </Button>
    </Stack>
  )
}
