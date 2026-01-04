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
import type { CityDto } from '@/types'
import { CityForm } from './components/CityForm'
import { DeleteConfirmDialog } from './components/DeleteConfirmDialog'
import { useNotification } from '@/hooks/useNotification'

import { getInitialPaginationModel, PAGINATION } from '@/constants'

export default function Cities() {
  const [searchQuery, setSearchQuery] = useState('')
  const [paginationModel, setPaginationModel] = useState(getInitialPaginationModel())
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

  const { showSuccess, showError } = useNotification()

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
    setEditingCity(null)
    setOpenForm(true)
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteCity(id).unwrap()
      showSuccess('City deleted successfully')
      setDeleteId(null)
    } catch {
      showError('Failed to delete city. Please try again.')
      setDeleteId(null)
    }
  }

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
          rows={filteredCities}
          columns={columns}
          loading={isLoading}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={PAGINATION.PAGE_SIZE_OPTIONS}
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
                showSuccess('City updated successfully')
              } else {
                await createCity(data).unwrap()
                showSuccess('City created successfully')
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
