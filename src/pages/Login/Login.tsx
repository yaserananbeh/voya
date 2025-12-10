import { Card, CardContent, TextField, Button, Typography, Box } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useLoginMutation } from '@/api/auth'
import { useDispatch } from 'react-redux'
import { setCredentials } from '@/store/authSlice'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.css'

const validationSchema = yup.object({
  userName: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
})

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()

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

        // REDIRECT BASED ON ROLE
        if (result.userType === 'Admin') {
          await navigate('/admin/dashboard', { replace: true })
        } else {
          await navigate('/home', { replace: true })
        }
      } catch (error) {
        console.error('Login failed:', error)
      }
    },
  })

  return (
    <Box className={styles.loginContainer}>
      <Card className={styles.loginCard}>
        <CardContent>
          <Typography variant="h5" align="center" mb={2}>
            Login to Voya
          </Typography>

          {/* IMPORTANT: Formik handles everything. NO custom wrapper. */}
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              label="Username"
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
              label="Password"
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
