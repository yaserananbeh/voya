import { TextField } from '@mui/material'
import type { FocusEvent } from 'react'

type SearchDateFieldProps = {
  name: string
  label: string
  value: string
  onChange: (value: string) => void
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
  error?: boolean
  helperText?: string | false
  min?: string
  isRTL?: boolean
  sx?: object
  'aria-label'?: string
}

export function SearchDateField({
  name,
  label,
  value,
  onChange,
  onBlur,
  error = false,
  helperText,
  min,
  isRTL = false,
  sx,
  'aria-label': ariaLabel,
}: SearchDateFieldProps) {
  return (
    <TextField
      name={name}
      label={label}
      type="date"
      size="small"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      InputLabelProps={{ shrink: true }}
      sx={sx}
      inputProps={{
        min,
        dir: isRTL ? 'rtl' : 'ltr',
        'aria-label': ariaLabel || label,
      }}
    />
  )
}
