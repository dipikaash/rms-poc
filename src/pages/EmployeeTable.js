import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';

const empCols = [
    {
        field: 'fullName',
        headerName: 'Name',
        width: 160,
        valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
        field: 'email',
        headerName: 'Email ID',
        type: 'email',
        width: 250,
    },
    { field: 'primarySkills', headerName: 'Skillset', width: 220 },
    { field: 'poolJoinedDate', headerName: 'Pool Joined Date', width: 130 },
    { field: 'poolEndDate', headerName: 'Pool End Date', width: 130 },
    {
        field: 'isActive', headerName: 'Status', width: 70,
        valueGetter: (params) => { return params.row.isActive ? 'Active' : 'Inactive' }
    },
];

function EmployeeTable() {
    const data=require('../utils/data.json');
    const empRows= data.empsDetails;     
    const [select, setSelection] = useState([]);
    return (
        <div style={{ height: 400, width: '100%' }}>
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
        </div>
    );
}

export default EmployeeTable;