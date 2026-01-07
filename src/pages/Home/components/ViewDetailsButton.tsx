import { Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useTranslation } from 'react-i18next'

type ViewDetailsButtonProps = {
  hotelId: number
  hotelName?: string
  fullWidth?: boolean
  onClick?: () => void
  variant?: 'contained' | 'outlined' | 'text'
}

export function ViewDetailsButton({
  hotelId,
  hotelName,
  fullWidth = false,
  onClick,
  variant = 'contained',
}: ViewDetailsButtonProps) {
  const { t } = useTranslation()
  const ariaLabel = hotelName ? `${t('common.viewDetails')} ${hotelName}` : t('common.viewDetails')

  return (
    <Button
      component={RouterLink}
      to={`/hotel/${hotelId}`}
      variant={variant}
      onClick={onClick}
      fullWidth={fullWidth}
      startIcon={<VisibilityIcon />}
      aria-label={ariaLabel}
    >
      {t('common.viewDetails')}
    </Button>
  )
}
