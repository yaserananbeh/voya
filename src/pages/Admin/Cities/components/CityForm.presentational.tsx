import { Stack } from '@mui/material'
import { FormField, FormActions } from '@/components/forms'
import { Form } from 'formik'

type CityFormPresentationalProps = {
  cityId: number | null
  onCancel: () => void
}

export function CityFormPresentational({ cityId, onCancel }: CityFormPresentationalProps) {
  return (
    <Form>
      <Stack spacing={2} sx={{ mt: 1 }}>
        <FormField name="name" label="Name" required />
        <FormField name="description" label="Description" multiline rows={3} />
        <FormActions onCancel={onCancel} submitLabel={cityId ? 'Update' : 'Create'} />
      </Stack>
    </Form>
  )
}
