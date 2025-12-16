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
  useGetCitiesQuery,
  useCreateCityMutation,
  useUpdateCityMutation,
  useDeleteCityMutation,
} from '@/api/admin'
import type { CityDto } from '@/types/models'
import { CityForm } from './components/CityForm'
import { DeleteConfirmDialog } from './components/DeleteConfirmDialog'

export default function Cities() {
  const [searchQuery, setSearchQuery] = useState('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [openForm, setOpenForm] = useState(false)
  const [editingCity, setEditingCity] = useState<number | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const { data: cities = [], isLoading } = useGetCitiesQuery({
    pageNumber: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,
  })

  const [createCity] = useCreateCityMutation()
  const [updateCity] = useUpdateCityMutation()
  const [deleteCity] = useDeleteCityMutation()

  const columns: GridColDef<CityDto>[] = [
    { field: 'name', headerName: 'Name', width: 200, flex: 1 },
    {
      field: 'description',
      headerName: 'Description',
      width: 400,
      flex: 2,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params: GridRenderCellParams<CityDto>) => (
        <>
          <IconButton
            size="small"
            onClick={() => {
              setEditingCity(params.row.id)
              setOpenForm(true) // Add this line to open the dialog
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
    setEditingCity(null)
    setOpenForm(true)
  }

  const handleDelete = async (id: number) => {
    await deleteCity(id).unwrap()
    setDeleteId(null)
  }
  // Filter cities on the frontend
  const filteredCities = cities.filter(
    (city) =>
      !searchQuery ||
      city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (city.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false),
  )
  return (
    <Box>
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
          Cities
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreate}
          sx={{
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          Add City
        </Button>
      </Box>

      <TextField
        fullWidth
        label="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Box sx={{ width: '100%', overflow: 'auto' }}>
        <DataGrid<CityDto>
          rows={filteredCities} // Use filteredCities instead of cities
          columns={columns}
          loading={isLoading}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 25, 50]}
          getRowId={(row) => row.id}
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

      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingCity ? 'Edit City' : 'Create City'}</DialogTitle>
        <DialogContent>
          <CityForm
            cityId={editingCity}
            onSubmit={async (data) => {
              if (editingCity) {
                await updateCity({ id: editingCity, data }).unwrap()
              } else {
                await createCity(data).unwrap()
              }
              setOpenForm(false)
              setEditingCity(null)
            }}
            onCancel={() => {
              setOpenForm(false)
              setEditingCity(null)
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
        title="Delete City"
        message={`Are you sure you want to delete this city?`}
      />
    </Box>
  )
}
