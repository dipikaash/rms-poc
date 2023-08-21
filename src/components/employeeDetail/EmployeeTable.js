import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import { Tooltip } from '@mui/material';
import AddEmployee from '../popup/AddEmployee';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { Link } from 'react-router-dom';
import Popup from '../popup/Popup';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEmployeesData, handleDelete } from '../../Store/UserSlice';

const datagridSx = {
  '& .MuiDataGrid-main': {
    minHeight: 390,
    maxHeight: 390,
  },
};
function EmployeeTable() {
  const [openPopup, setOpenPopup] = useState(false);
  const [email, setEmail] = useState();
  const empCols = [
    {
      field: 'fullName',
      headerName: 'Name',
      headerClassName: 'main-header',
      flex: 14,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'email',
      headerName: 'Email ID',
      headerClassName: 'main-header',
      type: 'email',
      flex: 20,
    },
    {
      field: 'primarySkills',
      headerClassName: 'main-header',
      headerName: 'Skillset',
      flex: 18,
    },
    {
      field: 'poolJoinedDate',
      headerClassName: 'main-header',
      headerName: 'Pool Joined Date',
      flex: 15,
    },
    {
      field: 'poolEndDate',
      headerClassName: 'main-header',
      headerName: 'Pool End Date',
      flex: 15,
    },
    {
      field: 'isActive',
      headerClassName: 'main-header',
      headerName: 'Status',
      flex: 9,
      valueGetter: (params) => {
        return params.row.isActive ? 'Active' : 'Inactive';
      },
    },
    {
      field: 'Edit',
      headerName: '',
      flex: 3,
      renderCell: (cellValues) => {
        return (
          <Tooltip title='Edit'>
            <EditIcon
              variant='contained'
              color='black'
              onClick={(event) => {
                handleEditClick(event, cellValues);
                event.stopPropagation();
              }}
            />
          </Tooltip>
        );
      },
    },
    {
      field: 'Delete',
      headerName: '',
      flex: 3,
      renderCell: (cellValues) => {
        return (
          <Tooltip title='Delete'>
            <DeleteIcon
              variant='contained'
              color='error'
              onClick={(event) => {
                handleDeleteClick(event, cellValues);
                event.stopPropagation();
              }}
            />
          </Tooltip>
        );
      },
    },
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { employeesData: empRows } = useSelector((state) => state.employees);
  const handleEditClick = (event, cellValues) => {
    setEmail(cellValues.row.email);
    setOpenPopup(true);
  };
  const handleAdd = () => {
    setOpenPopup(true);
    setEmail('');
  };
  const addOrEdit = () => {
    setOpenPopup(false);
  };
  const handleDeleteClick = (event, cellValues) => {
    const confirm = window.confirm(
      `Are you sure to delete the record of ${cellValues.row.firstName} ?`
    );
    if (confirm) {
      dispatch(handleDelete(cellValues.row.email));
    }
  };

  useEffect(() => {
    dispatch(fetchEmployeesData());
  }, [dispatch]);

  return (
    <>
      <h1 className='detailHead'>
        Detailes of Employees in Pool
        <Tooltip title='Add Employee' className='addEmp'>
          <Link
            onClick={() => {
              handleAdd();
            }}
          >
            <Fab className='addEmp' color='success' aria-label='add'>
              <AddIcon />
            </Fab>
          </Link>
        </Tooltip>
      </h1>
      <div style={{ height: 400, width: '100%' }}>
        <Box
          sx={{
            '& .main-header': {
              fontWeight: 'medium',
              fontSize: 18,
            },
          }}
        >
          {empRows.length < 1 ? (
            <h1 style={{ marginTop: '100px', textAlign: 'center' }}>
              <CircularProgress color='success' />
            </h1>
          ) : (
            <DataGrid
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
          )}
        </Box>
      </div>
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} email={email}>
        <AddEmployee email={email} addOrEdit={addOrEdit} />
      </Popup>
    </>
  );
}

export default EmployeeTable;
