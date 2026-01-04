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
} from '@mui/material'
import { DataGrid, type GridColDef, type GridRenderCellParams } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import {
  useGetAdminHotelsQuery,
  useCreateHotelMutation,
  useUpdateHotelMutation,
  useDeleteHotelMutation,
} from '@/api/admin'
import type { HotelDto } from '@/types'
import { HotelForm } from './components/HotelForm'
import { DeleteConfirmDialog } from './components/DeleteConfirmDialog'

import { getInitialPaginationModel, PAGINATION } from '@/constants'

export default function Hotels() {
  const [searchQuery, setSearchQuery] = useState('')
  const [paginationModel, setPaginationModel] = useState(getInitialPaginationModel())
  const [openForm, setOpenForm] = useState(false)
  const [editingHotel, setEditingHotel] = useState<number | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const { data: hotels = [], isLoading } = useGetAdminHotelsQuery({
    searchQuery: searchQuery || undefined,
    pageNumber: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,
  })

  const [createHotel] = useCreateHotelMutation()
  const [updateHotel] = useUpdateHotelMutation()
  const [deleteHotel] = useDeleteHotelMutation()

  const columns: GridColDef<HotelDto>[] = [
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      flex: 1,
      minWidth: 150,
      valueGetter: (_value, row) => row.hotelName || row.name,
    },
    {
      field: 'starRating',
      headerName: 'Star Rating',
      width: 120,
      minWidth: 100,
      type: 'number',
    },
    {
      field: 'numberOfRooms',
      headerName: 'Number of Rooms',
      width: 150,
      minWidth: 120,
      type: 'number',
      valueGetter: (_value, row) => row.rooms?.length ?? 0,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      minWidth: 100,
      sortable: false,
      renderCell: (params: GridRenderCellParams<HotelDto>) => (
        <>
          <IconButton
            size="small"
            onClick={() => {
              setEditingHotel(params.row.id)
              setOpenForm(true)
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton size="small" onClick={() => setDeleteId(params.row.id)} color="error">
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ]

  const handleCreate = () => {
    setEditingHotel(null)
    setOpenForm(true)
  }

  const handleDelete = async (id: number) => {
    await deleteHotel(id).unwrap()
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
          Hotels
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreate}
          sx={{
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          Add Hotel
        </Button>
      </Box>

      <TextField
        fullWidth
        label="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 2 }}
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
        <DataGrid<HotelDto>
          rows={hotels}
          columns={columns}
          loading={isLoading}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={PAGINATION.PAGE_SIZE_OPTIONS}
          getRowId={(row) => row.id}
          disableRowSelectionOnClick
          sx={{
            minWidth: 600,
            width: '100%',
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
        <DialogTitle>{editingHotel ? 'Edit Hotel' : 'Create Hotel'}</DialogTitle>
        <DialogContent>
          <HotelForm
            hotelId={editingHotel}
            onSubmit={async (data) => {
              if (editingHotel) {
                await updateHotel({ id: editingHotel, data }).unwrap()
              } else {
                await createHotel(data).unwrap()
              }
              setOpenForm(false)
              setEditingHotel(null)
            }}
            onCancel={() => {
              setOpenForm(false)
              setEditingHotel(null)
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
        title="Delete Hotel"
        message="Are you sure you want to delete this hotel?"
      />
    </Box>
  )
}
