import { Box, Typography, Stack, Button, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import type { ReactNode } from 'react'

type FooterSectionProps = {
  title: string
  children: ReactNode
}

export function FooterSection({ title, children }: FooterSectionProps) {
  return (
    <Box sx={{ flex: 1 }}>
      <Typography variant="h6" component="h2" fontWeight={600} sx={{ mb: 2 }}>
        {title}
      </Typography>
      {children}
    </Box>
  )
}

type FooterLinksProps = {
  links: Array<{ label: string; to: string }>
}

export function FooterLinks({ links }: FooterLinksProps) {
  return (
    <Stack spacing={1}>
      {links.map((link) => (
        <Link key={link.to} component={RouterLink} to={link.to} color="inherit" underline="hover">
          {link.label}
        </Link>
      ))}
    </Stack>
  )
}

type FooterButtonsProps = {
  buttons: Array<{ label: string; to: string }>
}

export function FooterButtons({ buttons }: FooterButtonsProps) {
  return (
    <Stack direction="row" spacing={2}>
      {buttons.map((button) => (
        <Button key={button.to} component={RouterLink} to={button.to} color="inherit" size="small">
          {button.label}
        </Button>
      ))}
    </Stack>
  )
}
