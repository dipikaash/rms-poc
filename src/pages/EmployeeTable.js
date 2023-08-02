import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';


const empCols = [
    { field: 'id', headerName: 'ID', width: 70 },
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

const empRows = [
    { id: 1, lastName: 'Roy', firstName: 'Abhijeet', age: 35, email: 'abhijeet@happiestminds.com', primarySkills: ['angular'], poolJoinedDate: '2/08/2023', poolEndDate: null, isActive: true },
    { id: 2, lastName: 'Kannujiya', firstName: 'Shashikant', age: 42, email: 'shashikant@happiestminds.com', primarySkills: ['angular', 'react'], poolJoinedDate: '2/08/2023', poolEndDate: null, isActive: false },
    { id: 3, lastName: 'Badave', firstName: 'Amrutha', age: 45, email: 'amrutha@happiestminds.com', primarySkills: ['angular', 'Node.js'], poolJoinedDate: '2/08/2023', poolEndDate: null, isActive: true },
    { id: 4, lastName: 'Shukla', firstName: 'Tripti', age: 16, email: 'tripti@happiestminds.com', primarySkills: ['angular', 'Javascript', 'Node.js'], poolJoinedDate: '2/08/2023', poolEndDate: null, isActive: false },
    { id: 5, lastName: 'Khurana', firstName: 'Dimple', age: null, email: 'dimple@happiestminds.com', primarySkills: ['angular', 'Python', 'Vue.js'], poolJoinedDate: '2/08/2023', poolEndDate: null, isActive: true },
    { id: 6, lastName: null, firstName: 'Bala', age: 150, email: 'subbu@happiestminds.com', primarySkills: ['Javascript', 'Node.js'], poolJoinedDate: '2/08/2023', poolEndDate: null, isActive: true },
    { id: 7, lastName: 'Chawla', firstName: 'Tara', age: 44, email: 'tara@happiestminds.com', primarySkills: ['angular', 'C++', 'Typescript'], poolJoinedDate: '2/08/2023', poolEndDate: null, isActive: true },
    { id: 8, lastName: 'Hussain', firstName: 'Jawwad', age: 36, email: 'jd@happiestminds.com', primarySkills: ['angular', 'JavaScript'], poolJoinedDate: '2/08/2023', poolEndDate: null, isActive: true },
    { id: 9, lastName: 'Np', firstName: 'Dinesh', age: 65, email: 'dinesh@happiestminds.com', primarySkills: ['angular', 'Js', 'TypeScript', 'Vue.js'], poolJoinedDate: '2/08/2023', poolEndDate: null, isActive: true },
];

function EmployeeTable() {
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
                pageSizeOptions={[5, 10]}
                checkboxSelection
                getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'}
            />
        </div>
    );
}

export default EmployeeTable;