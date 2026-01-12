import { Stack } from '@mui/material'
import { FormField, FormActions } from '@/pages/Admin/components'
import type { FormikProps } from 'formik'
import type { CityForCreationDto } from '@/pages/Admin/Cities/types'
import { BUTTON_LABELS } from '@/pages/Admin/constants'

type CityFormPresentationalProps = {
  cityId: number | null
  onCancel: () => void
  formik: FormikProps<CityForCreationDto>
}

export function CityFormPresentational({ cityId, onCancel, formik }: CityFormPresentationalProps) {
  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2} sx={{ mt: 1 }}>
        <FormField name="name" label="Name" required formik={formik} />
        <FormField name="description" label="Description" multiline rows={3} formik={formik} />
        <FormActions
          onCancel={onCancel}
          submitLabel={cityId ? BUTTON_LABELS.UPDATE : BUTTON_LABELS.CREATE}
          formik={formik}
        />
      </Stack>
    </form>
  )
}
