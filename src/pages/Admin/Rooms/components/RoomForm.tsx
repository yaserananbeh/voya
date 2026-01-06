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
import { useTranslation } from 'react-i18next'
import { useGetRoomsAdminQuery, useGetAdminHotelsQuery } from '@/api/admin'
import type { RoomForCreationDto } from '@/types'
import { VoyaLoader } from '@/components'
import { VALIDATION } from '@/constants'

type Props = {
  roomId: number | null
  onSubmit: (data: RoomForCreationDto) => Promise<void>
  onCancel: () => void
}

export function RoomForm({ roomId, onSubmit, onCancel }: Props) {
  const { t } = useTranslation()
  const { data: rooms, isLoading: roomsLoading } = useGetRoomsAdminQuery()
  const { data: hotels = [], isLoading: hotelsLoading } = useGetAdminHotelsQuery()
  const room = roomId ? rooms?.find((r) => r.roomId === roomId || r.id === roomId) : null

  const validationSchema = yup.object({
    roomNumber: yup.string().required(t('validation.roomNumberRequired')),
    hotelId: yup.number().required(t('validation.hotelRequired')),
    roomType: yup.string().required(t('validation.roomTypeRequired')),
    capacityOfAdults: yup
      .number()
      .min(1, t('validation.adultCapacityMin'))
      .required(t('validation.adultCapacityRequired')),
    capacityOfChildren: yup
      .number()
      .min(0, t('validation.childrenCapacityMin'))
      .required(t('validation.childrenCapacityRequired')),
    price: yup.number().min(0, t('validation.priceMin')).required(t('validation.priceRequired')),
    availability: yup.boolean(),
    roomPhotoUrl: yup.string().url(t('validation.invalidUrl')),
  })

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
          onBlur={formik.handleBlur}
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
          onBlur={formik.handleBlur}
          error={formik.touched.roomType && Boolean(formik.errors.roomType)}
          helperText={formik.touched.roomType && formik.errors.roomType}
          fullWidth
        />

        <TextField
          name="capacityOfAdults"
          label="Adult Capacity"
          type="number"
          inputProps={{ min: VALIDATION.ROOM.CAPACITY_OF_ADULTS_MIN }}
          value={formik.values.capacityOfAdults}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.capacityOfAdults && Boolean(formik.errors.capacityOfAdults)}
          helperText={formik.touched.capacityOfAdults && formik.errors.capacityOfAdults}
          fullWidth
        />

        <TextField
          name="capacityOfChildren"
          label="Children Capacity"
          type="number"
          inputProps={{ min: VALIDATION.ROOM.CAPACITY_OF_CHILDREN_MIN }}
          value={formik.values.capacityOfChildren}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.capacityOfChildren && Boolean(formik.errors.capacityOfChildren)}
          helperText={formik.touched.capacityOfChildren && formik.errors.capacityOfChildren}
          fullWidth
        />

        <TextField
          name="price"
          label="Price"
          type="number"
          inputProps={{ min: VALIDATION.ROOM.PRICE_MIN, step: VALIDATION.ROOM.PRICE_STEP }}
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
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
          onBlur={formik.handleBlur}
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
