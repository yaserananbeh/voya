import { useFormik } from 'formik'
import * as yup from 'yup'
import { TextField, Button, Stack, MenuItem, Select, FormControl, InputLabel } from '@mui/material'
import { useGetAdminHotelsQuery, useGetCitiesQuery } from '@/api/admin'
import type { HotelForCreationDto } from '@/types/models'

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  cityId: yup.number().required('City is required'),
  description: yup.string(),
  hotelType: yup.string(),
  starRating: yup.number().min(1).max(5).required('Star rating is required'),
  location: yup.string(),
  latitude: yup.number(),
  longitude: yup.number(),
  imageUrl: yup.string().url('Must be a valid URL'),
})

type Props = {
  hotelId: number | null
  onSubmit: (data: HotelForCreationDto) => Promise<void>
  onCancel: () => void
}

export function HotelForm({ hotelId, onSubmit, onCancel }: Props) {
  const { data: hotels } = useGetAdminHotelsQuery()
  const { data: cities = [] } = useGetCitiesQuery()
  const hotel = hotelId ? hotels?.find((h) => h.id === hotelId) : null

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

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2} sx={{ mt: 1 }}>
        <TextField
          name="name"
          label="Hotel Name"
          value={formik.values.name}
          onChange={formik.handleChange}
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
            <MenuItem value="Hotel">Hotel</MenuItem>
            <MenuItem value="Resort">Resort</MenuItem>
            <MenuItem value="Boutique">Boutique</MenuItem>
            <MenuItem value="Lodge">Lodge</MenuItem>
            <MenuItem value="Inn">Inn</MenuItem>
          </Select>
        </FormControl>

        <TextField
          name="starRating"
          label="Star Rating"
          type="number"
          inputProps={{ min: 1, max: 5 }}
          value={formik.values.starRating}
          onChange={formik.handleChange}
          error={formik.touched.starRating && Boolean(formik.errors.starRating)}
          helperText={formik.touched.starRating && formik.errors.starRating}
          fullWidth
        />

        <TextField
          name="location"
          label="Location"
          value={formik.values.location || ''}
          onChange={formik.handleChange}
          fullWidth
        />

        <TextField
          name="imageUrl"
          label="Image URL"
          value={formik.values.imageUrl || ''}
          onChange={formik.handleChange}
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
