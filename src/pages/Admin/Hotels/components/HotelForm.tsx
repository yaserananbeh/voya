import { useFormik } from 'formik'
import * as yup from 'yup'
import {
  TextField,
  Button,
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useGetAdminHotelsQuery, useGetCitiesQuery } from '@/api/admin'
import type { HotelForCreationDto } from '@/types'
import { VoyaLoader } from '@/components'
import { HOTEL, VALIDATION } from '@/constants'

type Props = {
  hotelId: number | null
  onSubmit: (data: HotelForCreationDto) => Promise<void>
  onCancel: () => void
}

export function HotelForm({ hotelId, onSubmit, onCancel }: Props) {
  const { t } = useTranslation()
  const { data: hotels, isLoading: hotelsLoading } = useGetAdminHotelsQuery()
  const { data: cities = [], isLoading: citiesLoading } = useGetCitiesQuery()
  const hotel = hotelId ? hotels?.find((h) => h.id === hotelId) : null

  const validationSchema = yup.object({
    name: yup.string().required(t('validation.nameRequired')),
    cityId: yup.number().required(t('validation.cityRequired')),
    description: yup.string(),
    hotelType: yup.string(),
    starRating: yup
      .number()
      .min(
        VALIDATION.HOTEL.STAR_RATING_MIN,
        t('validation.starRatingMin', { min: VALIDATION.HOTEL.STAR_RATING_MIN }),
      )
      .max(
        VALIDATION.HOTEL.STAR_RATING_MAX,
        t('validation.starRatingMax', { max: VALIDATION.HOTEL.STAR_RATING_MAX }),
      )
      .required(t('validation.starRatingRequired')),
    location: yup.string(),
    latitude: yup.number(),
    longitude: yup.number(),
    imageUrl: yup.string().url(t('validation.invalidUrl')),
  })

  const formik = useFormik<
    HotelForCreationDto & {
      location?: string
      latitude?: number
      longitude?: number
      imageUrl?: string
    }
  >({
    initialValues: {
      name: hotel?.name || hotel?.hotelName || '',
      cityId: hotel?.cityId || 0,
      description: hotel?.description || '',
      hotelType: hotel?.hotelType || '',
      starRating: hotel?.starRating || 1,
      location: hotel?.location || '',
      latitude: hotel?.latitude,
      longitude: hotel?.longitude,
      imageUrl: hotel?.imageUrl || '',
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      await onSubmit(values)
    },
  })

  if (hotelsLoading || citiesLoading) {
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
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2} sx={{ mt: 1 }}>
        <TextField
          name="name"
          label="Hotel Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          fullWidth
        />

        <FormControl fullWidth error={formik.touched.cityId && Boolean(formik.errors.cityId)}>
          <InputLabel>City</InputLabel>
          <Select
            name="cityId"
            value={formik.values.cityId}
            onChange={formik.handleChange}
            label="City"
          >
            {cities.map((city) => (
              <MenuItem key={city.id} value={city.id}>
                {city.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          name="description"
          label="Description"
          value={formik.values.description || ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          multiline
          rows={3}
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel>Hotel Type</InputLabel>
          <Select
            name="hotelType"
            value={formik.values.hotelType || ''}
            onChange={formik.handleChange}
            label="Hotel Type"
          >
            {HOTEL.TYPE_OPTIONS.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          name="starRating"
          label="Star Rating"
          type="number"
          inputProps={{
            min: VALIDATION.HOTEL.STAR_RATING_MIN,
            max: VALIDATION.HOTEL.STAR_RATING_MAX,
          }}
          value={formik.values.starRating}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.starRating && Boolean(formik.errors.starRating)}
          helperText={formik.touched.starRating && formik.errors.starRating}
          fullWidth
        />

        <TextField
          name="location"
          label="Location"
          value={formik.values.location || ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
        />

        <TextField
          name="imageUrl"
          label="Image URL"
          value={formik.values.imageUrl || ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.imageUrl && Boolean(formik.errors.imageUrl)}
          helperText={formik.touched.imageUrl && formik.errors.imageUrl}
          fullWidth
        />

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="submit" variant="contained">
            {hotelId ? 'Update' : 'Create'}
          </Button>
        </Stack>
      </Stack>
    </form>
  )
}
