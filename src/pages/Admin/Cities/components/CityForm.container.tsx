import { Formik } from 'formik'
import * as yup from 'yup'
import { useGetCitiesQuery } from '@/api/admin'
import type { CityForCreationDto } from '@/types/models'
import { CityFormPresentational } from './CityForm.presentational'

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
  const { data: cities } = useGetCitiesQuery()
  const city = cityId ? cities?.find((c) => c.id === cityId) : null

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
