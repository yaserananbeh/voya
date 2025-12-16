import { useFormik } from 'formik'
import * as yup from 'yup'
import { TextField, Button, Stack } from '@mui/material'
import { useGetCitiesQuery } from '@/api/admin'
import type { CityForCreationDto } from '@/types/models'

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  description: yup.string(),
})

type Props = {
  cityId: number | null
  onSubmit: (data: CityForCreationDto) => Promise<void>
  onCancel: () => void
}

export function CityForm({ cityId, onSubmit, onCancel }: Props) {
  const { data: cities } = useGetCitiesQuery()
  const city = cityId ? cities?.find((c) => c.id === cityId) : null

  const formik = useFormik<CityForCreationDto>({
    initialValues: {
      name: city?.name || '',
      description: city?.description || '',
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      await onSubmit(values)
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2} sx={{ mt: 1 }}>
        <TextField
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          fullWidth
        />

        <TextField
          name="description"
          label="Description"
          value={formik.values.description || ''}
          onChange={formik.handleChange}
          multiline
          rows={3}
          fullWidth
        />
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="submit" variant="contained">
            {cityId ? 'Update' : 'Create'}
          </Button>
        </Stack>
      </Stack>
    </form>
  )
}
