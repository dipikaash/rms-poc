import { datagridSx } from '../../utils/employeeConfig';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

const EmployeeGrid = (props) => { 
    const {empRows, empCols} = props;
    const navigate = useNavigate();
    return (
        <DataGrid
        disableColumnMenu
        rows={empRows}
        columns={empCols}
        sx={datagridSx}
        initialState={{
          sorting: {
            sortModel: [{ field: 'poolJoinedDate', sort: 'asc' }],
          },
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        getRowId={(row) => row?.email}
        pageSizeOptions={[10, 15]}
        onRowClick={(event) => {
          navigate(`/employeeStatus?email=${event.row.email}`);
        }}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
      />
    )
}

export default EmployeeGrid;