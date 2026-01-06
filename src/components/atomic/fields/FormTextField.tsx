import { TextField, InputAdornment } from '@mui/material'
import type { ReactNode, FocusEvent } from 'react'

type FormTextFieldProps = {
  name: string
  label: string
  value: string
  onChange: (value: string) => void
  onBlur?: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  error?: boolean
  helperText?: string | false
  placeholder?: string
  fullWidth?: boolean
  multiline?: boolean
  rows?: number
  autoComplete?: string
  startAdornment?: ReactNode
  readOnly?: boolean
  'aria-label'?: string
  'aria-required'?: boolean
  'aria-invalid'?: boolean
}

export function FormTextField({
  name,
  label,
  value,
  onChange,
  onBlur,
  error = false,
  helperText,
  placeholder,
  fullWidth = true,
  multiline = false,
  rows,
  autoComplete,
  startAdornment,
  readOnly = false,
  'aria-label': ariaLabel,
  'aria-required': ariaRequired,
  'aria-invalid': ariaInvalid,
}: FormTextFieldProps) {
  return (
    <TextField
      name={name}
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      placeholder={placeholder}
      fullWidth={fullWidth}
      multiline={multiline}
      rows={rows}
      autoComplete={autoComplete}
      required={ariaRequired}
      InputProps={{
        ...(startAdornment
          ? {
              startAdornment: <InputAdornment position="start">{startAdornment}</InputAdornment>,
            }
          : {}),
        readOnly,
      }}
      inputProps={{
        'aria-label': ariaLabel,
        'aria-invalid': ariaInvalid,
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
        },
      }}
    />
  )
}
