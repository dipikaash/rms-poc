import { Tooltip } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EmployeeTable from './EmployeeTable';
import Fab from "@mui/material/Fab";
import {Link } from 'react-router-dom'

const EmployeeData = () => {
    return (
        <>
            <h2 className="detailHead">Detailes of Employees in Pool
                <Tooltip title="Add Employee">
                <Link to="addEmployee"><Fab className="addEmp" color="success" aria-label="add"><AddIcon /></Fab></Link>
                </Tooltip>
                </h2>
            <EmployeeTable />
        </>
    )
}

export default EmployeeData;