import { TextField, InputAdornment, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import { useTranslation } from 'react-i18next'
import type { FocusEvent } from 'react'

type SearchCityFieldProps = {
  value: string
  onChange: (value: string) => void
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
  error?: boolean
  helperText?: string | false
  sx?: object
  'aria-label'?: string
}

export function SearchCityField({
  value,
  onChange,
  onBlur,
  error = false,
  helperText,
  sx,
  'aria-label': ariaLabel,
}: SearchCityFieldProps) {
  const { t } = useTranslation()

  return (
    <TextField
      name="city"
      label={t('home.whereGoing')}
      placeholder={t('home.whereGoingPlaceholder')}
      size="small"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      sx={sx}
      aria-label={ariaLabel || t('home.whereGoing')}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon aria-hidden="true" />
          </InputAdornment>
        ),
        endAdornment: value ? (
          <InputAdornment position="end">
            <IconButton
              size="small"
              onClick={() => onChange('')}
              edge="end"
              aria-label={t('common.clear') || 'Clear city field'}
            >
              <ClearIcon fontSize="small" aria-hidden="true" />
            </IconButton>
          </InputAdornment>
        ) : undefined,
      }}
    />
  )
}
