import { useState } from 'react'
import { Box } from '@mui/material'
import { type GridColDef } from '@mui/x-data-grid'
import AddIcon from '@mui/icons-material/Add'
import {
  useGetRoomsAdminQuery,
  useCreateRoomMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
} from './api'
import type { RoomDto } from '@/types'
import { RoomForm } from './components/RoomForm'
import {
  PageHeader,
  SearchBar,
  DataGridActions,
  AdminDataGrid,
  AdminFormDialog,
  DeleteConfirmDialog,
} from '../components'
import { usePageTitle } from '@/hooks'
import { getInitialPaginationModel } from '@/constants'

export default function Rooms() {
  usePageTitle('pages.adminRooms')
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
      renderCell: (params) => (
        <DataGridActions
          onEdit={() => {
            setEditingRoom(params.row.roomId || params.row.id || 0)
            setOpenForm(true)
          }}
          onDelete={() => setDeleteId(params.row.roomId || params.row.id || 0)}
        />
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
      <PageHeader
        title="Rooms"
        actionLabel="Add Room"
        actionIcon={<AddIcon />}
        onAction={handleCreate}
      />

      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      <AdminDataGrid<RoomDto>
        rows={filteredRooms}
        columns={columns}
        loading={isLoading}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        getRowId={(row) => row.roomId || row.id || 0}
      />

      <AdminFormDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        title={editingRoom ? 'Edit Room' : 'Create Room'}
        maxWidth="md"
      >
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
      </AdminFormDialog>

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
