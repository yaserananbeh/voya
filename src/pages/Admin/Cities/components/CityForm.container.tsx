import { useFormik } from 'formik'
import * as yup from 'yup'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useGetCitiesQuery } from '../api'
import type { CityForCreationDto } from '@/types'
import { CityFormPresentational } from './CityForm.presentational'
import { VoyaLoader } from '@/components'

type Props = {
  cityId: number | null
  onSubmit: (data: CityForCreationDto) => Promise<void>
  onCancel: () => void
}

export function CityFormContainer({ cityId, onSubmit, onCancel }: Props) {
  const { t } = useTranslation()
  const { data: cities, isLoading } = useGetCitiesQuery()
  const city = cityId ? cities?.find((c) => c.id === cityId) : null

  const validationSchema = yup.object({
    name: yup.string().required(t('validation.nameRequired')),
    description: yup.string(),
  })

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

  return <CityFormPresentational cityId={cityId} onCancel={onCancel} formik={formik} />
}
