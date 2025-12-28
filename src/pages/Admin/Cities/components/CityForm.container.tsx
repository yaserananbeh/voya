import { Formik } from 'formik'
import * as yup from 'yup'
import { Box } from '@mui/material'
import { useGetCitiesQuery } from '@/api/admin'
import type { CityForCreationDto } from '@/types'
import { CityFormPresentational } from './CityForm.presentational'
import { VoyaLoader } from '@/components'

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  description: yup.string(),
})

type Props = {
  cityId: number | null
  onSubmit: (data: CityForCreationDto) => Promise<void>
  onCancel: () => void
}

export function CityFormContainer({ cityId, onSubmit, onCancel }: Props) {
  const { data: cities, isLoading } = useGetCitiesQuery()
  const city = cityId ? cities?.find((c) => c.id === cityId) : null

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 200px)',
        }}
      >
        <VoyaLoader size="small" />
      </Box>
    )
  }

  return (
    <Formik<CityForCreationDto>
      initialValues={{
        name: city?.name || '',
        description: city?.description || '',
      }}
      validationSchema={validationSchema}
      enableReinitialize={true}
      onSubmit={async (values) => {
        await onSubmit(values)
      }}
    >
      <CityFormPresentational cityId={cityId} onCancel={onCancel} />
    </Formik>
  )
}
