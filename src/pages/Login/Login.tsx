import { Card, CardContent, TextField, Button, Typography, Box } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useLoginMutation } from '@/api/auth'
import { useDispatch } from 'react-redux'
import { setCredentials } from '@/store/authSlice'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './styles.module.css'
import { useNotification } from '@/hooks'
import { useTranslation } from 'react-i18next'

const validationSchema = yup.object({
  userName: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
})

export default function Login() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [login, { isLoading }] = useLoginMutation()
  const { showSuccess, showError } = useNotification()

  const from = (location.state as { from?: Location })?.from?.pathname || null

  const formik = useFormik({
    initialValues: { userName: '', password: '' },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const result = await login(values).unwrap()
        localStorage.setItem('token', result.authentication)
        localStorage.setItem('userType', result.userType)
        dispatch(
          setCredentials({
            token: result.authentication,
            userType: result.userType,
          }),
        )

        showSuccess(t('auth.loginSuccess'))

        if (result.userType === 'Admin') {
          await navigate(from || '/admin/dashboard', { replace: true })
        } else {
          await navigate(from || '/home', { replace: true })
        }
      } catch (error) {
        console.error('Login failed:', error)
        showError(t('auth.loginFailed'))
      }
    },
  })

  return (
    <Box
      className={styles.loginContainer}
      sx={{
        px: { xs: 2, sm: 3 },
        py: { xs: 3, sm: 4 },
      }}
    >
      <Card
        className={styles.loginCard}
        sx={{
          maxWidth: { xs: '100%', sm: 400 },
          width: '100%',
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Typography
            variant="h5"
            align="center"
            mb={2}
            sx={{
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
            }}
          >
            {t('auth.loginTitle')}
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              label={t('auth.username')}
              name="userName"
              value={formik.values.userName}
              onChange={formik.handleChange}
              error={formik.touched.userName && Boolean(formik.errors.userName)}
              helperText={formik.touched.userName && formik.errors.userName}
              margin="normal"
            />

            <TextField
              fullWidth
              type="password"
              label={t('auth.password')}
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              margin="normal"
            />

            <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Login'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}
