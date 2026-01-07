import { CardActions, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'

type RoomCardActionsProps = {
  available: boolean
  onBook: () => void
  isRTL?: boolean
}

export function RoomCardActions({ available, onBook, isRTL = false }: RoomCardActionsProps) {
  const { t } = useTranslation()

  return (
    <CardActions>
      <Button
        fullWidth
        variant="contained"
        disabled={!available}
        onClick={onBook}
        sx={{
          flexDirection: isRTL ? 'row-reverse' : 'row',
        }}
      >
        {available ? t('hotel.bookNow') : t('hotel.notAvailable')}
      </Button>
    </CardActions>
  )
}
