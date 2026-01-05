import '@/types/mui.d.ts'
import {
  createTheme,
  responsiveFontSizes,
  type Shadows,
  type ThemeOptions,
} from '@mui/material/styles'

const getThemeOptions = (
  mode: 'light' | 'dark',
  direction: 'ltr' | 'rtl' = 'ltr',
): ThemeOptions => ({
  direction,
  palette: {
    mode,
    primary: {
      main: mode === 'dark' ? '#5BA3F5' : '#003580',
      light: mode === 'dark' ? '#7BB5F7' : '#3366a6',
      dark: mode === 'dark' ? '#4A90E2' : '#00224f',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#F9BC02',
      dark: '#c89600',
      contrastText: '#000000',
    },
    success: {
      main: '#00800D',
      dark: '#005c0a',
      contrastText: '#ffffff',
    },
    error: {
      main: '#D4111E',
      dark: '#a70d17',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#F46A25',
      contrastText: '#ffffff',
    },
    text: {
      primary: mode === 'dark' ? '#E0E0E0' : '#262626',
      secondary: mode === 'dark' ? '#B0B0B0' : '#6B6B6B',
    },
    background: {
      default: mode === 'dark' ? '#121212' : '#F5F5F5',
      paper: mode === 'dark' ? '#1E1E1E' : '#ffffff',
    },
    divider: mode === 'dark' ? '#333333' : '#E6E6E6',
  },

  typography: {
    fontFamily: 'Inter, Roboto, sans-serif',

    h1: { fontSize: '2.25rem', fontWeight: 700, lineHeight: 1.2 },
    h2: { fontSize: '1.875rem', fontWeight: 700, lineHeight: 1.25 },
    h3: { fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.3 },
    h4: { fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.35 },
    h5: { fontSize: '1.125rem', fontWeight: 500, lineHeight: 1.4 },
    h6: { fontSize: '1rem', fontWeight: 500, lineHeight: 1.4 },

    body1: { fontSize: '1rem', fontWeight: 400, lineHeight: 1.6 },
    body2: { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.6 },

    button: { textTransform: 'none', fontWeight: 600, fontSize: '0.95rem' },

    caption: { fontSize: '0.75rem', lineHeight: 1.4 },

    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.45,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.45,
    },

    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      lineHeight: 1.4,
    },
  },

  spacing: 8,
  shape: {
    borderRadius: 8,
  },

  shadows: [
    'none',
    mode === 'dark' ? '0px 1px 3px rgba(0, 0, 0, 0.3)' : '0px 1px 3px rgba(0, 0, 0, 0.12)',
    mode === 'dark' ? '0px 2px 6px rgba(0, 0, 0, 0.3)' : '0px 2px 6px rgba(0, 0, 0, 0.12)',
    mode === 'dark' ? '0px 4px 12px rgba(0, 0, 0, 0.4)' : '0px 4px 12px rgba(0, 0, 0, 0.12)',
    mode === 'dark' ? '0px 8px 20px rgba(0, 0, 0, 0.5)' : '0px 8px 20px rgba(0, 0, 0, 0.15)',
    ...Array.from({ length: 20 }, () => 'none'),
  ] as Shadows,

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 20px',
        },
      },
      defaultProps: {
        disableElevation: true,
      },
      variants: [
        {
          props: { variant: 'primary' },
          style: {
            backgroundColor: mode === 'dark' ? '#5BA3F5' : '#003580',
            color: '#fff',
            '&:hover': {
              backgroundColor: mode === 'dark' ? '#4A90E2' : '#002a66',
            },
          },
        },
        {
          props: { variant: 'secondary' },
          style: {
            backgroundColor: '#F9BC02',
            color: '#000',
            '&:hover': { backgroundColor: '#d9a701' },
          },
        },
        {
          props: { variant: 'danger' },
          style: {
            backgroundColor: '#D4111E',
            color: '#fff',
            '&:hover': { backgroundColor: '#a70d17' },
          },
        },
        {
          props: { variant: 'soft' },
          style: {
            backgroundColor: mode === 'dark' ? '#333333' : '#E6E6E6',
            color: mode === 'dark' ? '#E0E0E0' : '#262626',
            '&:hover': { backgroundColor: mode === 'dark' ? '#404040' : '#d4d4d4' },
          },
        },
      ],
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow:
            mode === 'dark' ? '0px 1px 3px rgba(0,0,0,0.3)' : '0px 1px 3px rgba(0,0,0,0.12)',
        },
      },
      variants: [
        {
          props: { variant: 'elevated' },
          style: {
            boxShadow:
              mode === 'dark' ? '0px 4px 12px rgba(0,0,0,0.4)' : '0px 4px 12px rgba(0,0,0,0.12)',
            borderRadius: 12,
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            border: `1px solid ${mode === 'dark' ? '#333333' : '#E6E6E6'}`,
            boxShadow: 'none',
          },
        },
      ],
    },

    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },

    MuiTypography: {
      variants: [
        {
          props: { variant: 'price' },
          style: {
            fontWeight: 700,
            fontSize: '1.25rem',
            color: '#D4111E',
          },
        },
        {
          props: { variant: 'label' },
          style: {
            fontWeight: 600,
            fontSize: '0.875rem',
            color: mode === 'dark' ? '#5BA3F5' : '#003580',
          },
        },
      ],
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'dark' ? '#1E1E1E' : '#ffffff',
          color: mode === 'dark' ? '#E0E0E0' : '#262626',
        },
      },
    },
  },
})

export const createAppTheme = (
  mode: 'light' | 'dark' = 'light',
  direction: 'ltr' | 'rtl' = 'ltr',
) => {
  return responsiveFontSizes(createTheme(getThemeOptions(mode, direction)))
}

export const theme = createAppTheme('light')
