import { Box, Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import RefreshIcon from '@mui/icons-material/Refresh'
import { useTranslation } from 'react-i18next'

type SearchActionButtonsProps = {
  onClear: () => void
  onSubmit?: () => void
  submitButtonType?: 'button' | 'submit'
}

export function SearchActionButtons({
  onClear,
  onSubmit,
  submitButtonType = 'submit',
}: SearchActionButtonsProps) {
  const { t } = useTranslation()

  return (
    <Box sx={{ flexShrink: 0, display: 'flex', gap: 1 }}>
      <Button
        type="button"
        variant="outlined"
        color="primary"
        size="large"
        startIcon={<RefreshIcon aria-hidden="true" />}
        aria-label={t('common.clear') || 'Clear search form'}
        onClick={onClear}
      >
        {t('common.clear')}
      </Button>
      <Button
        type={submitButtonType}
        variant="contained"
        color="primary"
        size="large"
        startIcon={<SearchIcon aria-hidden="true" />}
        aria-label={t('common.search') || 'Search hotels'}
        onClick={onSubmit}
      >
        {t('common.search')}
      </Button>
    </Box>
  )
}
