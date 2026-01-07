import { TextField } from '@mui/material'
import type { TextFieldProps } from '@mui/material'
import type { FormikProps } from 'formik'

type FormFieldProps<T = Record<string, unknown>> = Omit<
  TextFieldProps,
  'name' | 'value' | 'onChange' | 'onBlur' | 'error' | 'helperText'
> & {
  name: string
  formik: FormikProps<T>
}

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

export function FormField<T = Record<string, unknown>>({
  name,
  formik,
  ...props
}: FormFieldProps<T>) {
  const fieldTouched = formik.touched[name as keyof typeof formik.touched] as boolean | undefined
  const fieldError = formik.errors[name as keyof typeof formik.errors] as unknown
  const hasError = Boolean(fieldTouched && fieldError)

  const errorMessage = hasError ? getErrorMessage(fieldError) : ' '

  const fieldValue =
    (formik.values[name as keyof typeof formik.values] as string | number | undefined) ?? ''

  return (
    <TextField
      name={name}
      value={fieldValue}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={hasError}
      helperText={errorMessage}
      fullWidth
      {...props}
    />
  )
}
