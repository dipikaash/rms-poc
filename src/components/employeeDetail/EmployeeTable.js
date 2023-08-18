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
import Fab from "@mui/material/Fab";
import {Link } from 'react-router-dom';
import Popup from '../popup/Popup';
import { hostname } from '../../utils/config';

const datagridSx = {
  "& .MuiDataGrid-main":{
    minHeight: 390,
    maxHeight: 390
  }
}
function EmployeeTable() {
  const [openPopup, setOpenPopup] = useState(false);
  const [email, setEmail] = useState();
  const empCols = [
    {
      field: 'fullName',
      headerName: 'Name',
      headerClassName: 'main-header',
      width: 180,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'email',
      headerName: 'Email ID',
      headerClassName: 'main-header',
      type: 'email',
      width: 250,
    },
    {
      field: 'primarySkills',
      headerClassName: 'main-header',
      headerName: 'Skillset',
      width: 230,
    },
    {
      field: 'poolJoinedDate',
      headerClassName: 'main-header',
      headerName: 'Pool Joined Date',
      width: 190,
    },
    {
      field: 'poolEndDate',
      headerClassName: 'main-header',
      headerName: 'Pool End Date',
      width: 190,
    },
    {
      field: 'isActive',
      headerClassName: 'main-header',
      headerName: 'Status',
      width: 110,
      valueGetter: (params) => {
        return params.row.isActive ? 'Active' : 'Inactive';
      },
    },
    {
      field: 'Edit',
      headerName: '',
      width: 40,
      renderCell: (cellValues) => {
        return (
          <Tooltip title="Edit">
          <EditIcon
            variant='contained'
            color='black'
            onClick={(event) => {
              handleEditClick(event, cellValues);
              event.stopPropagation();
            }}
          /></Tooltip>
        );
      },
    },
    {
      field: 'Delete',
      headerName: '',
      width: 40,
      renderCell: (cellValues) => {
        return (
          <Tooltip title="Delete">
          <DeleteIcon
            variant='contained'
            color='error'
            onClick={(event) => {
              handleDeleteClick(event, cellValues);
              event.stopPropagation();
            }}
          /></Tooltip>
        );
      },
    }
  ];
  const navigate = useNavigate();
   
  const handleEditClick = (event, cellValues) => {
    setEmail(cellValues.row.email);
    setOpenPopup(true);
    // navigate(`/addEmployee/?email=${cellValues.row.email}`);
  };
  const handleAdd = () => {
    setOpenPopup(true);
    setEmail('');
  }
  const addOrEdit = () => {
    let list = JSON.parse(localStorage.getItem('list'));
    setEmpRows([...list]);
    setOpenPopup(false);
  }
  const handleDeleteClick = (event, cellValues) => {
    const confirm = window.confirm(
      `Are you sure to delete the record of ${cellValues.row.firstName} ?`
    );
    if(confirm){
      let list = JSON.parse(localStorage.getItem('list')).filter(
        (el) => el.email !== cellValues.row.email
      );
      localStorage.setItem('list', JSON.stringify(list));
      setEmpRows([...list]);
    }
  };

  const [loader, setLoader] = useState(true);
  const [empRows, setEmpRows] = useState([]);

  const getData = async () => {
    await fetch(`${hostname}/empsDetails/`)
    .then(response=>{ return response?.json()}).then(
      response =>{
      localStorage.setItem('list', JSON.stringify(response));
    });  
    setLoader(false);
  };

  useEffect(() => {
    let asyncFunction = async () => {
      let addedData = JSON.parse(localStorage.getItem('list'));
      if (!addedData) {
        await getData();
      }
      addedData = await JSON.parse(localStorage.getItem('list'));
      setEmpRows([...addedData]);
      setLoader(false);
    };
    asyncFunction();
  }, []);

  return (
    <>
    <h1 className="detailHead">Detailes of Employees in Pool
      <Tooltip title="Add Employee" className="addEmp">
          <Link onClick={()=>{handleAdd()}}><Fab className="addEmp" color="success" aria-label="add"><AddIcon /></Fab></Link>
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
        {loader ? (
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
            pageSizeOptions={[10,15]}
            onRowClick={(event)=>{ 
              navigate(`/employeeStatus?email=${event.row.email}`); }}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
            }
          />
        )}
      </Box>
    </div>
    <Popup 
      openPopup={openPopup} 
      setOpenPopup={setOpenPopup}
      email={email}>
      <AddEmployee 
      email={email} 
      addOrEdit={addOrEdit}/>
    </Popup>
    </>
  );
}

export default EmployeeTable;
