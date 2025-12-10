import '@mui/material/Button'
import '@mui/material/Card'
import '@mui/material/Paper'
import '@mui/material/Typography'

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    primary: true
    secondary: true
    danger: true
    soft: true
  }
}

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    elevated: true
    outlined: true
  }
}

declare module '@mui/material/Card' {
  interface CardPropsVariantOverrides {
    elevated: true
    outlined: true
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    price: true
    label: true
  }
}
