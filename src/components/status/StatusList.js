import * as React from 'react';
import { datagridSx, statusHead } from '../../utils/employeeConfig';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

const statusCols = [
  {
    field: 'date',
    headerName: 'Date',
    headerClassName: 'main-header',
    flex: 33,
  },
  {
    field: 'skillLearning',
    headerName: 'Skills Learning',
    headerClassName: 'main-header',
    flex: 33,
  },
  {
    field: 'status',
    headerName: 'Status',
    headerClassName: 'main-header',
    flex: 33,
  }
]
const StatusList = (props) => {
  return (
    <Box sx={statusHead}>
    <DataGrid
    disableColumnMenu
    rows={props?.empStatus}
    columns={statusCols}
    sx={datagridSx}
    initialState={{
      sorting: {
        sortModel: [{ field: 'date', sort: 'desc' }],
      },
      pagination: {
        paginationModel: { page: 0, pageSize: 5 },
      },
    }}
    getRowId={(row) => row?.skillLearning}
    pageSizeOptions={[5, 10]}
    getRowClassName={(params) =>
      params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
    }
  />
  </Box>
  )
}

export default StatusList;