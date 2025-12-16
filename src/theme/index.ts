import { createTheme, responsiveFontSizes, type Shadows } from '@mui/material/styles'

export const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: '#003580',
        light: '#3366a6',
        dark: '#00224f',
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
        primary: '#262626',
        secondary: '#6B6B6B',
      },
      background: {
        default: '#F5F5F5',
        paper: '#ffffff',
      },
      divider: '#E6E6E6',
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
        color: '#262626',
      },
      subtitle2: {
        fontSize: '0.875rem',
        fontWeight: 500,
        lineHeight: 1.45,
        color: '#6B6B6B',
      },

      overline: {
        fontSize: '0.75rem',
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        lineHeight: 1.4,
        color: '#6B6B6B',
      },
    },

    spacing: 8,
    shape: {
      borderRadius: 8,
    },

    shadows: [
      'none',
      '0px 1px 3px rgba(0, 0, 0, 0.12)',
      '0px 2px 6px rgba(0, 0, 0, 0.12)',
      '0px 4px 12px rgba(0, 0, 0, 0.12)',
      '0px 8px 20px rgba(0, 0, 0, 0.15)',
      ...Array.from({ length: 20 }, () => 'none'), //MUI accept 25 strictly -YA
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
              backgroundColor: '#003580',
              color: '#fff',
              '&:hover': { backgroundColor: '#002a66' },
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
              backgroundColor: '#E6E6E6',
              color: '#262626',
              '&:hover': { backgroundColor: '#d4d4d4' },
            },
          },
        ],
      },

      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: '0px 1px 3px rgba(0,0,0,0.12)',
          },
        },
        variants: [
          {
            props: { variant: 'elevated' },
            style: {
              boxShadow: '0px 4px 12px rgba(0,0,0,0.12)',
              borderRadius: 12,
            },
          },
          {
            props: { variant: 'outlined' },
            style: {
              border: '1px solid #E6E6E6',
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
              color: '#003580',
            },
          },
        ],
      },
    },
  }),
)
