import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material'
import type { SelectProps } from '@mui/material'
import { useFormikContext } from 'formik'
import type { FormikErrors, FormikTouched, FormikValues } from 'formik'

type Option = {
  value: string | number
  label: string
}

type FormSelectProps = Omit<SelectProps, 'name' | 'value' | 'onChange' | 'error'> & {
  name: string
  options: Option[]
  label: string
}

function getErrorMessage(error: unknown): string | undefined {
  if (error === null || error === undefined) {
    return undefined
  }
  if (typeof error === 'string') {
    return error
  }
  if (typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
    return error.message
  }
  return undefined
}

export function FormSelect({ name, options, label, ...props }: FormSelectProps) {
  const { values, touched, errors, handleChange, handleBlur } = useFormikContext<FormikValues>()

  const fieldTouched = touched[name as keyof FormikTouched<FormikValues>] as boolean | undefined
  const fieldError = errors[name as keyof FormikErrors<FormikValues>] as unknown
  const hasError = Boolean(fieldTouched && fieldError)

  const errorMessage = hasError ? getErrorMessage(fieldError) : undefined

  const fieldValue = (values[name as keyof FormikValues] as string | number | undefined) ?? ''

  return (
    <FormControl fullWidth error={hasError}>
      <InputLabel>{label}</InputLabel>
      <Select
        name={name}
        value={fieldValue}
        onChange={handleChange}
        onBlur={handleBlur}
        label={label}
        {...props}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  )
}
