import { Box } from '@mui/material'
import {
  DataGrid,
  type GridColDef,
  type GridPaginationModel,
  type GridValidRowModel,
} from '@mui/x-data-grid'
import { PAGINATION } from '../constants'

type AdminDataGridProps<T extends GridValidRowModel> = {
  rows: T[]
  columns: GridColDef<T>[]
  loading?: boolean
  paginationModel: GridPaginationModel
  onPaginationModelChange: (model: GridPaginationModel) => void
  paginationMode?: 'client' | 'server'
  rowCount?: number
  getRowId: (row: T) => string | number
}

export function AdminDataGrid<T extends GridValidRowModel>({
  rows,
  columns,
  loading = false,
  paginationModel,
  onPaginationModelChange,
  paginationMode = 'client',
  rowCount,
  getRowId,
}: AdminDataGridProps<T>) {
  return (
    <Box
      sx={{
        width: '100%',
        overflowX: 'auto',
        overflowY: 'hidden',
        minWidth: 0,
        maxWidth: '100%',
      }}
    >
      <DataGrid<T>
        rows={rows}
        columns={columns}
        loading={loading}
        paginationMode={paginationMode}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        rowCount={rowCount}
        pageSizeOptions={PAGINATION.PAGE_SIZE_OPTIONS}
        getRowId={getRowId}
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
  )
}
