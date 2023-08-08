import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { json, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { Tooltip } from '@mui/material';

function EmployeeTable() {
  const empCols = [
    {
      field: 'fullName',
      headerName: 'Name',
      headerClassName: 'main-header',
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'email',
      headerName: 'Email ID',
      headerClassName: 'main-header',
      type: 'email',
      width: 230,
    },
    {
      field: 'primarySkills',
      headerClassName: 'main-header',
      headerName: 'Skillset',
      width: 200,
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
      width: 150,
    },
    {
      field: 'isActive',
      headerClassName: 'main-header',
      headerName: 'Status',
      width: 120,
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
            }}
          /></Tooltip>
        );
      },
    },
    {
      field: 'Status',
      headerName: '',
      width: 40,
      renderCell: (cellValues) => {
        return (
          <Tooltip title="Detailed Status">
          <ChevronRightIcon
            variant='contained'
            color='primary'
            onClick={(event) => {
              console.log(event);
              navigate(`/employeeStatus?email=${cellValues.row.email}`);
            }}
          /></Tooltip>
        );
      },
    },
  ];
  const navigate = useNavigate();
  const handleEditClick = (event, cellValues) => {
    console.log('clicked edit');
    navigate(`/addEmployee/?email=${cellValues.row.email}`);
  };
  const handleDeleteClick = (event, cellValues) => {
    const confirm = window.confirm(
      `Are you sure to delete the record of ${cellValues.row.firstName} ?`
    );
    if(confirm){
      let list = JSON.parse(localStorage.getItem('list')).filter(
        (el) => el.email != cellValues.row.email
      );
      localStorage.setItem('list', JSON.stringify(list));
      setEmpRows([...list]);
    }
  };

  const [loader, setLoader] = useState(true);
  const [empRows, setEmpRows] = useState([]);

  const getData = async () => {
    const response = await axios.get('http://localhost:4000/empsDetails/');
    localStorage.setItem('list', JSON.stringify(response.data));
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
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            getRowId={(row) => row?.email}
            pageSizeOptions={[5, 10]}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
            }
          />
        )}
      </Box>
    </div>
  );
}

export default EmployeeTable;
