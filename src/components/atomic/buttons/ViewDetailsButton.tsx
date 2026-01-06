import { Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useTranslation } from 'react-i18next'

type ViewDetailsButtonProps = {
  hotelId: number
  fullWidth?: boolean
  onClick?: () => void
  variant?: 'contained' | 'outlined' | 'text'
}

export function ViewDetailsButton({
  hotelId,
  fullWidth = false,
  onClick,
  variant = 'contained',
}: ViewDetailsButtonProps) {
  const { t } = useTranslation()

  return (
    <Button
      component={RouterLink}
      to={`/hotel/${hotelId}`}
      variant={variant}
      onClick={onClick}
      fullWidth={fullWidth}
      startIcon={<VisibilityIcon />}
    >
      {t('common.viewDetails')}
    </Button>
  )
}
