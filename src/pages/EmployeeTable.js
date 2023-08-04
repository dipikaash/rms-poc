import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import Box from '@mui/material/Box';

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
        width: 250,
    },
    { field: 'primarySkills', headerClassName: 'main-header', headerName: 'Skillset', width: 220 },
    { field: 'poolJoinedDate', headerClassName: 'main-header', headerName: 'Pool Joined Date', width: 190 },
    { field: 'poolEndDate', headerClassName: 'main-header', headerName: 'Pool End Date', width: 150 },
    {
        field: 'isActive', headerClassName: 'main-header', headerName: 'Status', width: 120,
        valueGetter: (params) => { return params.row.isActive ? 'Active' : 'Inactive' }
    },
];

function EmployeeTable() {
    const data=require('../utils/data.json');
    const empRows= data.empsDetails;     
    const [select, setSelection] = useState([]);
    return (
        <div style={{ height: 400, width: '100%' }}>
            <Box
      sx={{
        '& .main-header': {
            fontWeight: 'medium',
            fontSize: 18
        },
      }}
    >
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
                checkboxSelection
                onSelectionModelChange={(ids) => {
                    const selectedIDs = new Set(ids);
                    const selectedRowData = empRows.filter((row) =>
                      selectedIDs.has(row.email.toString()));
                    console.log(selectedRowData);
                  }}
                getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'}
            />
            </Box>
        </div>
    );
}

export default EmployeeTable;