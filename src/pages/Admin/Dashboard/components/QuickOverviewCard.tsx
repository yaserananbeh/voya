import { Card, CardContent, Typography, Box } from '@mui/material'

interface QuickOverviewItem {
  label: string
  value: string | number
}

interface QuickOverviewCardProps {
  title?: string
  items: QuickOverviewItem[]
}

export function QuickOverviewCard({ title = 'Quick Overview', items }: QuickOverviewCardProps) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom>
          {title}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            mt: 1,
          }}
        >
          {items.map((item, index) => (
            <Box
              key={index}
              sx={{
                flex: {
                  xs: '1 1 100%',
                  sm: '1 1 calc(50% - 8px)',
                  md: '1 1 calc(25% - 12px)',
                },
                minWidth: 0,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {item.label}
              </Typography>
              <Typography variant="h6" component="span">
                {item.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}
