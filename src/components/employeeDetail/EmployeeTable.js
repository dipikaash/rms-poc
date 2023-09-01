import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid, Tooltip, TextField } from '@mui/material';
import AddEmployee from '../popup/AddEmployee';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { Link } from 'react-router-dom';
import Popup from '../popup/Popup';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEmployeesData } from '../../Store/EmployeeSlice';
import DeletePopup from '../popup/DeletePopup';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

export const datagridSx = {
  "&.MuiDataGrid-root": {
    borderRadius: "10px"
  },
  '& .MuiDataGrid-main': {
    minHeight: 365,
    maxHeight: 365,
  },
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: 'black',
    color: 'white'
  },
  '& .MuiDataGrid-columnHeader:focus': {
    outline: 'none'
  },
  // disable cell selection style
  '.MuiDataGrid-cell:focus': {
    outline: 'none'
  },
  // pointer cursor on ALL rows
  '& .MuiDataGrid-row:hover': {
    cursor: 'pointer'
  },
  "& .MuiDataGrid-sortIcon": {
    opacity: 1,
    color: "white",
  },
  "& .MuiDataGrid-menuIconButton": {
    opacity: 1,
    color: "white"
  }
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
  const [searchText, setSearchText] = useState('');
  const [rows, setRows] = useState([]);
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
  function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
const requestSearch = (searchValue) => {
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = empRows.filter((row) => {
        return Object.keys(row)?.some((field) => {
            return searchRegex.test(row[field]?.toString());
        });
    });
    setRows(filteredRows);
};
  useEffect(() => {
    dispatch(fetchEmployeesData()).then((result)=>{
      setRows(result.payload);
    });
  }, [dispatch]);

  return (
    <>
      <Typography variant="h4" component="div" sx={{ marginBottom: 4, marginTop: 1, textAlign: 'center' }}>
        Details of Employees in Pool
      </Typography>
      <Box
        sx={{
          '& .main-header': {
            fontWeight: 'medium',
            fontSize: 18
          },
        }}
      >
        {rows.length < 1 ? (
          <h1 style={{ marginTop: '100px', textAlign: 'center' }}>
            <CircularProgress color='success' />
          </h1>
        ) :
          (<Box sx={{ margin: 2, marginTop: 0 }}>     
            <Grid container justifyContent="space-between" marginBottom={2}>
            <Box>
                    <TextField
                        variant="standard"
                        value={searchText}
                        onChange={(e) => { setSearchText(e.target.value); requestSearch(e.target.value) }}
                        placeholder="Search..."
                        InputProps={{
                            startAdornment: <SearchIcon fontSize="small" color="action" />,
                            endAdornment: (
                                <IconButton
                                    title="Clear"
                                    aria-label="Clear"
                                    size="small"
                                    style={{ visibility: searchText ? 'visible' : 'hidden', borderRadius: "57%", paddingRight: "1px", margin: "0", fontSize: "1.25rem" }}
                                    onClick={(e) => {setSearchText(''); setRows(empRows)} }
                                >
                                    <ClearIcon fontSize="small" color="action" />
                                </IconButton>
                            ),
                        }}
                        sx={{
                            width: { xs: 1, sm: 'auto' }, m: (theme) => theme.spacing(1, 0.5, 1.5),
                            '& .MuiSvgIcon-root': {
                                mr: 0.5,
                            },
                            '& .MuiInput-underline:before': {
                                borderBottom: 1,
                                borderColor: 'divider',
                            },
                        }}
                    />
                </Box>
              <Tooltip title='Add Employee'>
                <Link onClick={() => { handleAdd() }}>
                  <Fab color='primary' aria-label='add'>
                    <AddIcon />
                  </Fab>
                </Link>
              </Tooltip>
            </Grid>
            <DataGrid
              disableColumnMenu
              rows={rows}
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
