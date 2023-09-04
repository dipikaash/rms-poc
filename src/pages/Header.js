import { Link } from 'react-router-dom'
import { Button, IconButton, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Tooltip from '@mui/material/Tooltip';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from './Home';
import { primaryColor } from '../utils/theme';

const defaultTheme = createTheme();

const Header = () => {

    const [user, setUser] = useState(getUser());
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    }
    return (
        <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <AppBar position="sticky" sx={{background: primaryColor}}>
          <Toolbar>
            <Typography  variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link to="/"><img alt="Happiest Minds" className="classLogo" src="https://www.bing.com/th?id=OIP.Cxwp2AvIVAXsGCHrmLX_VwHaC5&w=350&h=137&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2" /></Link>
                Resource Management Portal
            </Typography>
            <Link to="/"><Button sx={{color: 'white'}}>Home</Button></Link>
            <Link to="aboutUs"><Button sx={{color: 'white'}}>About Us</Button></Link>
            <Link to="https://www.happiestminds.com/location/" ><Button sx={{color: 'white'}}>Contact Us</Button></Link>
            {user && (<Tooltip title="Profile"><Link to={`employeeStatus?email=${user.email}`}><Button variant="text" sx={{color: 'white'}}><AccountCircleIcon sx={{color: 'yellow', marginRight: 0.5}} />{user.name}</Button></Link></Tooltip>)}
            {user && user.isAdmin ? (<Tooltip title="Log out">
                        <IconButton aria-label="logout" variant="contained" color="error" size="small"
                            onClick={handleLogout}>
                            <LogoutIcon />
                        </IconButton></Tooltip>) :
                        (<Tooltip title="Log In">
                            <IconButton aria-label="login" variant="contained" color="primary" size="small" onClick={(event) => { navigate('/login') }}>
                                <LoginIcon />
                            </IconButton></Tooltip>
                        )}
          </Toolbar>
        </AppBar>
        </ThemeProvider>
    )
}

export default Header;