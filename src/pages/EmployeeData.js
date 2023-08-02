import { Button, Tooltip } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EmployeeTable from './EmployeeTable';
import Fab from "@mui/material/Fab";

const EmployeeData = () => {
    return (
        <>
            <h2 className="detailHead">Detailes of Employees in Pool
                <Tooltip title="Add Employee">
                <Fab className="addEmp" color="primary" aria-label="add"><AddIcon /></Fab>
                </Tooltip>
                </h2>
            <EmployeeTable />
        </>
    )
}

export default EmployeeData;