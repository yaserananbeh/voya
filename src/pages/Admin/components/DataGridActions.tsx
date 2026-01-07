import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

interface DataGridActionsProps {
  onEdit: () => void
  onDelete: () => void
  editLabel?: string
  deleteLabel?: string
}

import { BUTTON_LABELS } from '../constants'

export function DataGridActions({
  onEdit,
  onDelete,
  editLabel = BUTTON_LABELS.EDIT,
  deleteLabel = BUTTON_LABELS.DELETE,
}: DataGridActionsProps) {
  return (
    <>
      <IconButton size="small" onClick={onEdit} aria-label={editLabel}>
        <EditIcon />
      </IconButton>
      <IconButton size="small" onClick={onDelete} color="error" aria-label={deleteLabel}>
        <DeleteIcon />
      </IconButton>
    </>
  )
}
