import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import {fetchEmployeesData, filterEmployees} from '../../Store/EmployeeSlice'

const SearchBar =(props)=>{
    const {setSearchText, searchText}=props;
    const { allEmployees: allEmpRows } = useSelector((state) => state.employees);
    const dispatch = useDispatch();
    const requestSearch = (searchValue) => {
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        const filteredRows = allEmpRows.filter((row) => {
            return Object.keys(row)?.some((field) => {
                return searchRegex.test(row[field]?.toString());
            });
        });
        dispatch(filterEmployees(filteredRows));
    };
    function escapeRegExp(value) {
        return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }
  return (
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
                    onClick={(e) => {setSearchText(''); dispatch(fetchEmployeesData())} }
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
  )
}

export default SearchBar;