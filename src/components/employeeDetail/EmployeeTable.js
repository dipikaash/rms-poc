import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid, Tooltip } from '@mui/material';
import AddEmployee from '../popup/AddEmployee';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { Link } from 'react-router-dom';
import Popup from '../popup/Popup';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEmployeesData } from '../../Store/EmployeeSlice';
import DeletePopup from '../popup/DeletePopup';
import Typography from '@mui/material/Typography';
import EmployeeGrid from './EmployeeGrid';
import { empHead, tableHead } from '../../utils/employeeConfig';
import SearchBar from './SearchBar';

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
  const dispatch = useDispatch();
  const { employeesData: empRows } = useSelector((state) => state.employees);
  const [searchText, setSearchText] = useState('');
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
      <Typography variant="h4" component="div" sx={empHead}>
        Details of Employees in Pool
      </Typography>
      <Box sx={tableHead}>
        {empRows.length < 1 ? (
          <h1 className="loader">
            <CircularProgress color='success' />
          </h1>
        ) :
          (<Box sx={{ margin: 2, marginTop: 0 }}>     
            <Grid container justifyContent="space-between" marginBottom={2}>
               <SearchBar setSearchText={setSearchText} searchText={searchText} />
              <Tooltip title='Add Employee'>
                <Link onClick={() => { handleAdd() }}>
                  <Fab color='primary' aria-label='add'>
                    <AddIcon />
                  </Fab>
                </Link>
              </Tooltip>
            </Grid>
            <EmployeeGrid empRows={empRows} empCols={empCols} />
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
