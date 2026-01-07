import { Card, CardContent, Typography, Box } from '@mui/material'
import type { ReactNode } from 'react'

interface StatisticItemProps {
  label: string
  value: string | number
  icon?: ReactNode
  color?: 'default' | 'success' | 'error' | 'warning'
}

interface StatisticCardProps {
  title: string
  items: StatisticItemProps[]
}

function StatisticItem({ label, value, icon, color = 'default' }: StatisticItemProps) {
  const colorMap = {
    default: 'text.primary',
    success: 'success.main',
    error: 'error.main',
    warning: 'warning.main',
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
      <Typography color="text.secondary">{label}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {icon}
        <Typography variant="h6" component="span" fontWeight="bold" color={colorMap[color]}>
          {value}
        </Typography>
      </Box>
    </Box>
  )
}

export function StatisticCard({ title, items }: StatisticCardProps) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom>
          {title}
        </Typography>
        <Box sx={{ mt: 2 }}>
          {items.map((item, index) => (
            <StatisticItem
              key={index}
              label={item.label}
              value={item.value}
              icon={item.icon}
              color={item.color}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}
