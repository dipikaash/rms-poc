import {Link } from 'react-router-dom'
import { Button, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function getUser () {
    let user = localStorage.getItem('user');
    if(user)
     user = JSON.parse(user);
    else 
     user = null;
    return user;
}
const Header = () => {

    const [user, setUser] = useState(getUser());
    const navigate = useNavigate();
    const handleLogout = ()=>{
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    }
    return (
        <div className="header">
            <div className="logo">
                <Link to="/"><img alt="Happiest Minds" className="classLogo" src="https://www.bing.com/th?id=OIP.Cxwp2AvIVAXsGCHrmLX_VwHaC5&w=350&h=137&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2" /></Link>
                Resource Management Portal
            </div>
            <div className="nav-items">
                <ul>
                    <li><Link to="/"><Button>Home</Button></Link></li>
                    <li><Link to="aboutUs"><Button>About Us</Button></Link></li>
                    <li><Link to="https://www.happiestminds.com/location/"><Button>Contact Us</Button></Link></li>
                    {user && (<li><Tooltip title="Profile"><Link to={`employeeStatus?email=${user.email}`}><Button variant="text"><AccountCircleIcon />{user.name}</Button></Link></Tooltip></li>)}
                    {user && user.isAdmin ? (<li><Tooltip title="Log out">
                        <IconButton aria-label="logout" variant="contained" color="error" size="small"
                            onClick={handleLogout}>
                            <LogoutIcon />
                        </IconButton></Tooltip></li>) :
                        (<li><Tooltip title="Log In">
                            <IconButton aria-label="login" variant="contained" color="primary" size="small" onClick={(event)=>{ navigate('/login')}}>
                                <LoginIcon />
                            </IconButton></Tooltip>
                        </li>)}
                </ul>
            </div>
        </div>
    )
}

export default Header;