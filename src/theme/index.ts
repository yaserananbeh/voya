import { createTheme, responsiveFontSizes, type Shadows } from '@mui/material/styles'

export const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: '#003580', // Booking Blue
        light: '#3366a6',
        dark: '#00224f',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#F9BC02', // Booking Yellow
        dark: '#c89600',
        contrastText: '#000000',
      },
      success: {
        main: '#00800D', // Green success
        dark: '#005c0a',
        contrastText: '#ffffff',
      },
      error: {
        main: '#D4111E', // Red alerts
        dark: '#a70d17',
        contrastText: '#ffffff',
      },
      warning: {
        main: '#F46A25', // Sale / discount
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

      // --- Headings ---
      h1: {
        fontSize: '2.25rem', // 36px
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h2: {
        fontSize: '1.875rem', // 30px
        fontWeight: 700,
        lineHeight: 1.25,
      },
      h3: {
        fontSize: '1.5rem', // 24px
        fontWeight: 600,
        lineHeight: 1.3,
      },
      h4: {
        fontSize: '1.25rem', // 20px
        fontWeight: 600,
        lineHeight: 1.35,
      },
      h5: {
        fontSize: '1.125rem', // 18px
        fontWeight: 500,
        lineHeight: 1.4,
      },
      h6: {
        fontSize: '1rem', // 16px
        fontWeight: 500,
        lineHeight: 1.4,
      },

      // --- Body text ---
      body1: {
        fontSize: '1rem', // 16px
        fontWeight: 400,
        lineHeight: 1.6,
      },
      body2: {
        fontSize: '0.875rem', // 14px
        fontWeight: 400,
        lineHeight: 1.6,
      },

      // --- Buttons ---
      button: {
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '0.95rem', // ~15px
      },

      // --- Caption text ---
      caption: {
        fontSize: '0.75rem', // 12px
        lineHeight: 1.4,
      },
    },
    spacing: 8, // base multiplier (8px)

    shadows: [
      'none', // 0
      '0px 1px 3px rgba(0, 0, 0, 0.12)', // 1
      '0px 2px 6px rgba(0, 0, 0, 0.12)', // 2
      '0px 4px 12px rgba(0, 0, 0, 0.12)', // 3
      '0px 8px 20px rgba(0, 0, 0, 0.15)', // 4
      ...Array.from({ length: 20 }, () => 'none'), // fill remaining 20 slots (MUI requires 25 shadows)
    ] as Shadows,
  }),
)
