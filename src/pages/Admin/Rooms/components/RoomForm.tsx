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
  Switch,
  FormControlLabel,
  Box,
} from '@mui/material'
import { useGetRoomsAdminQuery, useGetAdminHotelsQuery } from '@/api/admin'
import type { RoomForCreationDto } from '@/types/models'
import { VoyaLoader } from '@/components'

const validationSchema = yup.object({
  roomNumber: yup.string().required('Room number is required'),
  hotelId: yup.number().required('Hotel is required'),
  roomType: yup.string().required('Room type is required'),
  capacityOfAdults: yup.number().min(1).required('Adult capacity is required'),
  capacityOfChildren: yup.number().min(0).required('Children capacity is required'),
  price: yup.number().min(0).required('Price is required'),
  availability: yup.boolean(),
  roomPhotoUrl: yup.string().url('Must be a valid URL'),
})

type Props = {
  roomId: number | null
  onSubmit: (data: RoomForCreationDto) => Promise<void>
  onCancel: () => void
}

export function RoomForm({ roomId, onSubmit, onCancel }: Props) {
  const { data: rooms, isLoading: roomsLoading } = useGetRoomsAdminQuery()
  const { data: hotels = [], isLoading: hotelsLoading } = useGetAdminHotelsQuery()
  const room = roomId ? rooms?.find((r) => r.roomId === roomId || r.id === roomId) : null

  const formik = useFormik<RoomForCreationDto & { roomPhotoUrl?: string }>({
    initialValues: {
      roomNumber: room?.roomNumber || '',
      hotelId: room?.hotelId || 0,
      roomType: room?.roomType || '',
      capacityOfAdults: room?.capacityOfAdults || 1,
      capacityOfChildren: room?.capacityOfChildren || 0,
      price: room?.price || 0,
      availability: room?.availability ?? true,
      roomPhotoUrl: room?.roomPhotoUrl || '',
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      await onSubmit(values)
    },
  })

  if (roomsLoading || hotelsLoading) {
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
          name="roomNumber"
          label="Room Number"
          value={formik.values.roomNumber}
          onChange={formik.handleChange}
          error={formik.touched.roomNumber && Boolean(formik.errors.roomNumber)}
          helperText={formik.touched.roomNumber && formik.errors.roomNumber}
          fullWidth
        />

        <FormControl fullWidth error={formik.touched.hotelId && Boolean(formik.errors.hotelId)}>
          <InputLabel>Hotel</InputLabel>
          <Select
            name="hotelId"
            value={formik.values.hotelId}
            onChange={formik.handleChange}
            label="Hotel"
          >
            {hotels.map((hotel) => (
              <MenuItem key={hotel.id} value={hotel.id}>
                {hotel.name || hotel.hotelName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          name="roomType"
          label="Room Type"
          value={formik.values.roomType}
          onChange={formik.handleChange}
          error={formik.touched.roomType && Boolean(formik.errors.roomType)}
          helperText={formik.touched.roomType && formik.errors.roomType}
          fullWidth
        />

        <TextField
          name="capacityOfAdults"
          label="Adult Capacity"
          type="number"
          inputProps={{ min: 1 }}
          value={formik.values.capacityOfAdults}
          onChange={formik.handleChange}
          error={formik.touched.capacityOfAdults && Boolean(formik.errors.capacityOfAdults)}
          helperText={formik.touched.capacityOfAdults && formik.errors.capacityOfAdults}
          fullWidth
        />

        <TextField
          name="capacityOfChildren"
          label="Children Capacity"
          type="number"
          inputProps={{ min: 0 }}
          value={formik.values.capacityOfChildren}
          onChange={formik.handleChange}
          error={formik.touched.capacityOfChildren && Boolean(formik.errors.capacityOfChildren)}
          helperText={formik.touched.capacityOfChildren && formik.errors.capacityOfChildren}
          fullWidth
        />

        <TextField
          name="price"
          label="Price"
          type="number"
          inputProps={{ min: 0, step: 0.01 }}
          value={formik.values.price}
          onChange={formik.handleChange}
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
          fullWidth
        />

        <FormControlLabel
          control={
            <Switch
              name="availability"
              checked={formik.values.availability ?? true}
              onChange={formik.handleChange}
            />
          }
          label="Available"
        />

        <TextField
          name="roomPhotoUrl"
          label="Room Photo URL"
          value={formik.values.roomPhotoUrl || ''}
          onChange={formik.handleChange}
          error={formik.touched.roomPhotoUrl && Boolean(formik.errors.roomPhotoUrl)}
          helperText={formik.touched.roomPhotoUrl && formik.errors.roomPhotoUrl}
          fullWidth
        />

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="submit" variant="contained">
            {roomId ? 'Update' : 'Create'}
          </Button>
        </Stack>
      </Stack>
    </form>
  )
}
