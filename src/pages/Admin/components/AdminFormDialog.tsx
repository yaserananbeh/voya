import { Dialog, DialogTitle, DialogContent } from '@mui/material'
import type { ReactNode } from 'react'

type AdminFormDialogProps = {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  fullWidth?: boolean
}

export function AdminFormDialog({
  open,
  onClose,
  title,
  children,
  maxWidth = 'sm',
  fullWidth = true,
}: AdminFormDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth={maxWidth} fullWidth={fullWidth}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}
