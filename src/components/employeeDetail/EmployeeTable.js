import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid, Tooltip,TextField } from '@mui/material';
import AddEmployee from '../popup/AddEmployee';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { Link } from 'react-router-dom';
import Popup from '../popup/Popup';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEmployeesData } from '../../Store/EmployeeSlice';
import DeletePopup from '../popup/DeletePopup';
import Typography from '@mui/material/Typography';


const datagridSx = {
  '& .MuiDataGrid-main': {
    minHeight: 365,
    maxHeight: 365,
  },
  // disable cell selection style
  '.MuiDataGrid-cell:focus': {
    outline: 'none'
  },
  // pointer cursor on ALL rows
  '& .MuiDataGrid-row:hover': {
    cursor: 'pointer'
  },
  // '& .MuiSvgIcon-root': {
  //   color: 'darkgoldenrod'
  // }
};
function EmployeeTable() {
  const [openPopup, setOpenPopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [email, setEmail] = useState();
  const [deleteEmpDetail, setDeleteEmpDetail] = useState({});
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
              color='warning'
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
    setDeleteEmpDetail(cellValues.row);
    setOpenDeletePopup(true);
  };

  useEffect(() => {
    dispatch(fetchEmployeesData());
  }, [dispatch]);

  return (
    <>
      <Typography  variant="h4" component="div" sx={{marginBottom: 4, marginTop: 1, textAlign: 'center'}}>
        Details of Employees in Pool
      </Typography>
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
          ) : (<Box sx={{margin: 2, marginTop: 0}}>
            <Grid container></Grid>
          <Grid container justifyContent="flex-end" marginBottom={2}>
            <Tooltip title='Add Employee'>
            <Link onClick={() => {handleAdd()}}>
              <Fab color='primary' aria-label='add'>
                <AddIcon />
              </Fab>
            </Link>
          </Tooltip>
          </Grid>
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
          </Box>)}
        </Box>
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} email={email}>
        <AddEmployee email={email} addOrEdit={addOrEdit} />
      </Popup>
      <DeletePopup openDeletePopup={openDeletePopup} setOpenDeletePopup={setOpenDeletePopup} deleteEmpDetail={deleteEmpDetail}>
      </DeletePopup>
    </>
  );
}

export default EmployeeTable;
