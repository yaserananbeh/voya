import { Stack, Typography } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import LocationOnIcon from '@mui/icons-material/LocationOn'

type ContactItem = {
  icon: React.ReactNode
  text: string
}

export function FooterContact() {
  const contactItems: ContactItem[] = [
    { icon: <EmailIcon fontSize="small" />, text: 'support@voya.com' },
    { icon: <PhoneIcon fontSize="small" />, text: '+1 (555) 123-4567' },
    { icon: <LocationOnIcon fontSize="small" />, text: '123 Travel Street, City' },
  ]

  return (
    <Stack spacing={1.5}>
      {contactItems.map((item, index) => (
        <Stack key={index} direction="row" spacing={1} alignItems="center">
          {item.icon}
          <Typography variant="body2" color="grey.400">
            {item.text}
          </Typography>
        </Stack>
      ))}
    </Stack>
  )
}
