import { useState } from 'react'
import { Box } from '@mui/material'
import { type GridColDef } from '@mui/x-data-grid'
import AddIcon from '@mui/icons-material/Add'
import {
  useGetCitiesQuery,
  useCreateCityMutation,
  useUpdateCityMutation,
  useDeleteCityMutation,
} from '@/api/admin'
import type { CityDto } from '@/types'
import { CityForm } from './components/CityForm'
import {
  PageHeader,
  SearchBar,
  DataGridActions,
  AdminDataGrid,
  AdminFormDialog,
  DeleteConfirmDialog,
} from '../components'
import { useNotification, usePageTitle } from '@/hooks'
import { getInitialPaginationModel } from '@/constants'

export default function Cities() {
  usePageTitle('pages.adminCities')
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
      renderCell: (params) => (
        <DataGridActions
          onEdit={() => {
            setEditingCity(params.row.id)
            setOpenForm(true)
          }}
          onDelete={() => setDeleteId(params.row.id)}
        />
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
      <PageHeader
        title="Cities"
        actionLabel="Add City"
        actionIcon={<AddIcon />}
        onAction={handleCreate}
      />

      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      <AdminDataGrid<CityDto>
        rows={filteredCities}
        columns={columns}
        loading={isLoading}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        getRowId={(row) => row.id}
      />

      <AdminFormDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        title={editingCity ? 'Edit City' : 'Create City'}
        maxWidth="sm"
      >
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
      </AdminFormDialog>

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
