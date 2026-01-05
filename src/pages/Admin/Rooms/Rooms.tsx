import { useState } from 'react'
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  InputAdornment,
} from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import { DataGrid, type GridColDef, type GridRenderCellParams } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import {
  useGetRoomsAdminQuery,
  useCreateRoomMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
} from '@/api/admin'
import type { RoomDto } from '@/types'
import { RoomForm } from './components/RoomForm'
import { DeleteConfirmDialog } from './components/DeleteConfirmDialog'

import { getInitialPaginationModel, PAGINATION } from '@/constants'

export default function Rooms() {
  const [searchQuery, setSearchQuery] = useState('')
  const [paginationModel, setPaginationModel] = useState(getInitialPaginationModel())
  const [openForm, setOpenForm] = useState(false)
  const [editingRoom, setEditingRoom] = useState<number | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const { data: rooms = [], isLoading } = useGetRoomsAdminQuery()

  const filteredRooms = rooms.filter(
    (room) =>
      !searchQuery ||
      String(room.roomNumber).toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.roomType.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const [createRoom] = useCreateRoomMutation()
  const [updateRoom] = useUpdateRoomMutation()
  const [deleteRoom] = useDeleteRoomMutation()

  const columns: GridColDef<RoomDto>[] = [
    {
      field: 'roomNumber',
      headerName: 'Room Number',
      width: 150,
      minWidth: 100,
      valueGetter: (value) => String(value),
    },
    {
      field: 'availability',
      headerName: 'Availability',
      width: 120,
      minWidth: 100,
      type: 'boolean',
      renderCell: (params) => (params.value ? 'Available' : 'Unavailable'),
    },
    {
      field: 'capacityOfAdults',
      headerName: 'Adult Capacity',
      width: 150,
      minWidth: 100,
      type: 'number',
    },
    {
      field: 'capacityOfChildren',
      headerName: 'Children Capacity',
      width: 150,
      minWidth: 100,
      type: 'number',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      minWidth: 100,
      sortable: false,
      renderCell: (params: GridRenderCellParams<RoomDto>) => (
        <>
          <IconButton
            size="small"
            onClick={() => {
              setEditingRoom(params.row.roomId || params.row.id || 0)
              setOpenForm(true)
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => setDeleteId(params.row.roomId || params.row.id || 0)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ]

  const handleCreate = () => {
    setEditingRoom(null)
    setOpenForm(true)
  }

  const handleDelete = async (id: number) => {
    await deleteRoom(id).unwrap()
    setDeleteId(null)
  }

  return (
    <Box sx={{ width: '100%', minWidth: 0, maxWidth: '100%', overflow: 'hidden' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: { xs: 2, sm: 0 },
          mb: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
          }}
        >
          Rooms
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreate}
          sx={{
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          Add Room
        </Button>
      </Box>

      <TextField
        fullWidth
        label="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 2 }}
        InputProps={{
          endAdornment: searchQuery ? (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={() => setSearchQuery('')}
                edge="end"
                aria-label="clear"
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ) : undefined,
        }}
      />

      <Box
        sx={{
          width: '100%',
          overflowX: 'auto',
          overflowY: 'hidden',
          minWidth: 0,
          maxWidth: '100%',
        }}
      >
        <DataGrid<RoomDto>
          rows={filteredRooms}
          columns={columns}
          loading={isLoading}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={PAGINATION.PAGE_SIZE_OPTIONS}
          getRowId={(row) => row.roomId || row.id || 0}
          disableRowSelectionOnClick
          sx={{
            '& .MuiDataGrid-cell': {
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
            },
            '& .MuiDataGrid-columnHeader': {
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
            },
          }}
          autoHeight
        />
      </Box>

      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editingRoom ? 'Edit Room' : 'Create Room'}</DialogTitle>
        <DialogContent>
          <RoomForm
            roomId={editingRoom}
            onSubmit={async (data) => {
              if (editingRoom) {
                await updateRoom({ id: editingRoom, data }).unwrap()
              } else {
                await createRoom(data).unwrap()
              }
              setOpenForm(false)
              setEditingRoom(null)
            }}
            onCancel={() => {
              setOpenForm(false)
              setEditingRoom(null)
            }}
          />
        </DialogContent>
      </Dialog>

      <DeleteConfirmDialog
        open={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) {
            void handleDelete(deleteId)
          }
        }}
        title="Delete Room"
        message="Are you sure you want to delete this room?"
      />
    </Box>
  )
}
