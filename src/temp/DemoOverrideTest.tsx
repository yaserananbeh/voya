import { Button, Card, CardContent, Typography } from '@mui/material'

export default function DemoOverrideTest() {
  return (
    <Card
      variant="elevated"
      sx={{
        maxWidth: 300,
        p: 2,
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          MUI Override Test
        </Typography>

        <Button variant="primary" sx={{ mt: 2 }}>
          Primary Button
        </Button>

        <Button variant="soft" sx={{ mt: 2 }}>
          Soft Variant
        </Button>
      </CardContent>
    </Card>
  )
}
