import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
  CircularProgress,
  Stack,
  alpha,
} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import LockIcon from '@mui/icons-material/Lock'
import LoginIcon from '@mui/icons-material/Login'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useLoginMutation } from './api'
import { useDispatch } from 'react-redux'
import { setCredentials } from '@/store/authSlice'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './styles/styles.module.css'
import { useNotification } from '@/hooks'
import { useTranslation } from 'react-i18next'
import { STORAGE_KEYS, ROUTES } from '@/constants'
import { usePageTitle } from '@/hooks'
import { SEO } from '@/components/common'

type LoginValues = {
  userName: string
  password: string
}

export default function Login() {
  const { t } = useTranslation()
  usePageTitle('pages.login')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [login, { isLoading }] = useLoginMutation()
  const { showSuccess, showError } = useNotification()

  const from = (location.state as { from?: Location })?.from?.pathname || null

  const validationSchema = yup.object({
    userName: yup.string().required(t('validation.usernameRequired')),
    password: yup.string().required(t('validation.passwordRequired')),
  })

  const formik = useFormik<LoginValues>({
    initialValues: { userName: '', password: '' },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const result = await login(values).unwrap()
        localStorage.setItem(STORAGE_KEYS.TOKEN, result.authentication)
        localStorage.setItem(STORAGE_KEYS.USER_TYPE, result.userType)
        dispatch(
          setCredentials({
            token: result.authentication,
            userType: result.userType,
          }),
        )

        showSuccess(t('auth.loginSuccess'))

        if (result.userType === 'Admin') {
          await navigate(from || ROUTES.ADMIN_DASHBOARD, { replace: true })
        } else {
          await navigate(from || ROUTES.HOME, { replace: true })
        }
      } catch (error) {
        console.error('Login failed:', error)
        showError(t('auth.loginFailed'))
      }
    },
  })

  return (
    <>
      <SEO
        title={t('seo.login.title')}
        description={t('seo.login.description')}
        keywords={t('seo.login.keywords')}
      />
      <Box
        className={styles.loginContainer}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: { xs: 'flex-start', sm: 'center' },
          minHeight: { xs: 'calc(100vh - 150px)', sm: 'calc(100vh - 200px)' },
          width: '100%',
          px: { xs: 2, sm: 3 },
          py: { xs: 4, sm: 4 },
          pt: { xs: 6, sm: 4 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
          },
        }}
      >
        <Card
          className={styles.loginCard}
          sx={{
            maxWidth: { xs: '100%', sm: 440 },
            width: '100%',
            position: 'relative',
            zIndex: 1,
            borderRadius: 3,
            boxShadow: (theme) =>
              theme.palette.mode === 'dark'
                ? '0px 8px 32px rgba(0, 0, 0, 0.4)'
                : '0px 8px 32px rgba(0, 53, 128, 0.12)',
            border: (theme) =>
              theme.palette.mode === 'dark'
                ? `1px solid ${alpha(theme.palette.divider, 0.5)}`
                : 'none',
          }}
        >
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            <Stack spacing={2} alignItems="center" mb={4}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: '50%',
                  background: (theme) =>
                    `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: (theme) => `0px 4px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                }}
              >
                <FlightTakeoffIcon sx={{ fontSize: 32, color: 'white' }} />
              </Box>
              <Typography
                variant="h4"
                align="center"
                sx={{
                  fontWeight: 700,
                  background: (theme) =>
                    `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: { xs: '1.5rem', sm: '2rem' },
                }}
              >
                {t('auth.loginTitle')}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                sx={{ maxWidth: 280 }}
              >
                {t('auth.welcomeBack')}
              </Typography>
            </Stack>

            <form onSubmit={formik.handleSubmit} noValidate>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label={t('auth.username')}
                  name="userName"
                  type="text"
                  autoComplete="username"
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.userName && Boolean(formik.errors.userName)}
                  helperText={formik.touched.userName && formik.errors.userName}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon
                          sx={{
                            color: (theme) =>
                              formik.touched.userName && formik.errors.userName
                                ? theme.palette.error.main
                                : theme.palette.primary.main,
                          }}
                          aria-hidden="true"
                        />
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{
                    'aria-invalid': formik.touched.userName && Boolean(formik.errors.userName),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      transition: 'all 0.2s ease-in-out',
                      backgroundColor: (theme) => theme.palette.background.paper,
                      '&:hover': {
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: (theme) => theme.palette.primary.main,
                          borderWidth: 2,
                        },
                      },
                      '&.Mui-focused': {
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderWidth: 2,
                        },
                      },
                      '& .MuiOutlinedInput-input': {
                        backgroundColor: 'transparent',
                        '&:-webkit-autofill': {
                          WebkitBoxShadow: (theme) =>
                            `0 0 0 100px ${theme.palette.background.paper} inset !important`,
                          WebkitTextFillColor: (theme) =>
                            `${theme.palette.text.primary} !important`,
                          caretColor: (theme) => theme.palette.text.primary,
                          borderRadius: '8px',
                          transition: 'background-color 5000s ease-in-out 0s',
                        },
                        '&:-webkit-autofill:hover': {
                          WebkitBoxShadow: (theme) =>
                            `0 0 0 100px ${theme.palette.background.paper} inset !important`,
                          WebkitTextFillColor: (theme) =>
                            `${theme.palette.text.primary} !important`,
                        },
                        '&:-webkit-autofill:focus': {
                          WebkitBoxShadow: (theme) =>
                            `0 0 0 100px ${theme.palette.background.paper} inset !important`,
                          WebkitTextFillColor: (theme) =>
                            `${theme.palette.text.primary} !important`,
                        },
                        '&:-webkit-autofill:active': {
                          WebkitBoxShadow: (theme) =>
                            `0 0 0 100px ${theme.palette.background.paper} inset !important`,
                          WebkitTextFillColor: (theme) =>
                            `${theme.palette.text.primary} !important`,
                        },
                      },
                    },
                  }}
                />

                <TextField
                  fullWidth
                  type="password"
                  label={t('auth.password')}
                  name="password"
                  autoComplete="current-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon
                          sx={{
                            color: (theme) =>
                              formik.touched.password && formik.errors.password
                                ? theme.palette.error.main
                                : theme.palette.primary.main,
                          }}
                          aria-hidden="true"
                        />
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{
                    'aria-invalid': formik.touched.password && Boolean(formik.errors.password),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      transition: 'all 0.2s ease-in-out',
                      backgroundColor: (theme) => theme.palette.background.paper,
                      '&:hover': {
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: (theme) => theme.palette.primary.main,
                          borderWidth: 2,
                        },
                      },
                      '&.Mui-focused': {
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderWidth: 2,
                        },
                      },
                      '& .MuiOutlinedInput-input': {
                        backgroundColor: 'transparent',
                        '&:-webkit-autofill': {
                          WebkitBoxShadow: (theme) =>
                            `0 0 0 100px ${theme.palette.background.paper} inset !important`,
                          WebkitTextFillColor: (theme) =>
                            `${theme.palette.text.primary} !important`,
                          caretColor: (theme) => theme.palette.text.primary,
                          borderRadius: '8px',
                          transition: 'background-color 5000s ease-in-out 0s',
                        },
                        '&:-webkit-autofill:hover': {
                          WebkitBoxShadow: (theme) =>
                            `0 0 0 100px ${theme.palette.background.paper} inset !important`,
                          WebkitTextFillColor: (theme) =>
                            `${theme.palette.text.primary} !important`,
                        },
                        '&:-webkit-autofill:focus': {
                          WebkitBoxShadow: (theme) =>
                            `0 0 0 100px ${theme.palette.background.paper} inset !important`,
                          WebkitTextFillColor: (theme) =>
                            `${theme.palette.text.primary} !important`,
                        },
                        '&:-webkit-autofill:active': {
                          WebkitBoxShadow: (theme) =>
                            `0 0 0 100px ${theme.palette.background.paper} inset !important`,
                          WebkitTextFillColor: (theme) =>
                            `${theme.palette.text.primary} !important`,
                        },
                      },
                    },
                  }}
                />

                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isLoading}
                  aria-label={isLoading ? t('auth.loggingIn') : t('common.login')}
                  startIcon={
                    isLoading ? (
                      <CircularProgress size={20} color="inherit" aria-hidden="true" />
                    ) : (
                      <LoginIcon aria-hidden="true" />
                    )
                  }
                  sx={{
                    mt: 1,
                    py: 1.5,
                    borderRadius: 2,
                    fontSize: '1rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    background: (theme) =>
                      `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                    boxShadow: (theme) => `0px 4px 16px ${alpha(theme.palette.primary.main, 0.4)}`,
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: (theme) =>
                        `0px 6px 20px ${alpha(theme.palette.primary.main, 0.5)}`,
                    },
                    '&:active': {
                      transform: 'translateY(0)',
                    },
                    '&:disabled': {
                      background: (theme) => theme.palette.action.disabledBackground,
                      boxShadow: 'none',
                    },
                  }}
                >
                  {isLoading ? t('auth.loggingIn') : t('common.login')}
                </Button>
              </Stack>
            </form>
          </CardContent>
        </Card>
      </Box>
    </>
  )
}
