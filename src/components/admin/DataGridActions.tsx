import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

interface DataGridActionsProps {
  onEdit: () => void
  onDelete: () => void
  editLabel?: string
  deleteLabel?: string
}

export function DataGridActions({
  onEdit,
  onDelete,
  editLabel = 'Edit',
  deleteLabel = 'Delete',
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
