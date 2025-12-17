import type { TextFieldProps } from '@mui/material'
import { useFormikContext } from 'formik'
import type { FormikErrors, FormikTouched, FormikValues } from 'formik'

function getErrorMessage(error: unknown): string {
  if (error === null || error === undefined) {
    return ' '
  }
  if (typeof error === 'string') {
    return error
  }
  if (typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
    return error.message
  }
  return ' '
}

export function useFormFieldProps(name: string): TextFieldProps {
  const { values, touched, errors, handleChange, handleBlur } = useFormikContext<FormikValues>()

  const fieldTouched = touched[name as keyof FormikTouched<FormikValues>] as boolean | undefined
  const fieldError = errors[name as keyof FormikErrors<FormikValues>] as unknown
  const hasError = Boolean(fieldTouched && fieldError)

  const errorMessage = hasError ? getErrorMessage(fieldError) : ' '

  const fieldValue = (values[name as keyof FormikValues] as string | number | undefined) ?? ''

  return {
    name,
    value: fieldValue,
    onChange: handleChange,
    onBlur: handleBlur,
    error: hasError,
    helperText: errorMessage,
    fullWidth: true,
  }
}

type FilterProps<T = unknown> = {
  value: T
  onChange: (value: T) => void
  label?: string
}

export function useFilterProps<T>(
  value: T,
  onChange: (value: T) => void,
  label?: string,
): FilterProps<T> {
  return {
    value,
    onChange,
    label,
  }
}
