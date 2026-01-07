import { useState, useMemo } from 'react'
import { Box } from '@mui/material'
import { type GridColDef } from '@mui/x-data-grid'
import AddIcon from '@mui/icons-material/Add'
import {
  useGetAdminHotelsQuery,
  useCreateHotelMutation,
  useUpdateHotelMutation,
  useDeleteHotelMutation,
} from '@/api/admin'
import type { HotelDto } from '@/types'
import { HotelForm } from './components/HotelForm'
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

export default function Hotels() {
  usePageTitle('pages.adminHotels')
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
      renderCell: (params) => (
        <DataGridActions
          onEdit={() => {
            setEditingHotel(params.row.id)
            setOpenForm(true)
          }}
          onDelete={() => setDeleteId(params.row.id)}
        />
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

  const rowCount = useMemo(() => {
    const currentPageItems = hotels.length
    const hasMore = currentPageItems === paginationModel.pageSize
    return paginationModel.page * paginationModel.pageSize + currentPageItems + (hasMore ? 1 : 0)
  }, [hotels.length, paginationModel.page, paginationModel.pageSize])

  const handlePaginationModelChange = (newModel: typeof paginationModel) => {
    if (newModel.pageSize !== paginationModel.pageSize) {
      setPaginationModel({ ...newModel, page: 0 })
    } else {
      setPaginationModel(newModel)
    }
  }

  return (
    <Box sx={{ width: '100%', minWidth: 0, maxWidth: '100%', overflow: 'hidden' }}>
      <PageHeader
        title="Hotels"
        actionLabel="Add Hotel"
        actionIcon={<AddIcon />}
        onAction={handleCreate}
      />

      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      <AdminDataGrid<HotelDto>
        rows={hotels}
        columns={columns}
        loading={isLoading}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={handlePaginationModelChange}
        rowCount={rowCount}
        getRowId={(row) => row.id}
      />

      <AdminFormDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        title={editingHotel ? 'Edit Hotel' : 'Create Hotel'}
        maxWidth="md"
      >
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
      </AdminFormDialog>

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
