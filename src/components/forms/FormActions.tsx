import { Button, Stack } from '@mui/material'
import { useFormikContext } from 'formik'

type FormActionsProps = {
  onCancel: () => void
  submitLabel?: string
  cancelLabel?: string
  isSubmitting?: boolean
}

export function FormActions({
  onCancel,
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
  isSubmitting = false,
}: FormActionsProps) {
  const { isSubmitting: formikSubmitting } = useFormikContext()

  return (
    <Stack direction="row" spacing={2} justifyContent="flex-end">
      <Button onClick={onCancel} disabled={isSubmitting || formikSubmitting}>
        {cancelLabel}
      </Button>
      <Button type="submit" variant="contained" disabled={isSubmitting || formikSubmitting}>
        {submitLabel}
      </Button>
    </Stack>
  )
}
