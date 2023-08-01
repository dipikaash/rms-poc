import { Outlet, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Home = () => {
    const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();
    return (
        <div className="container">
            <div className="header">
                <div className="logo">
                    <Link to="/"><img alt="Happiest Minds" className="classLogo" src="https://www.bing.com/th?id=OIP.Cxwp2AvIVAXsGCHrmLX_VwHaC5&w=350&h=137&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2" /></Link>
                    Resource Management Portal
                </div>
                <div className="nav-items">
                    <ul>
                        <li><Link to="/"><Button>Home</Button></Link></li>
                        <li><Link to="aboutUs"><Button>About Us</Button></Link></li>
                        {isAuthenticated && (<li><Button variant="text"><AccountCircleIcon />{user.name}</Button></li>)}
                        {isAuthenticated ? (<li>
                            <IconButton aria-label="logout" variant="contained" color="error" size="small"
                                onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                                <LogoutIcon />
                            </IconButton></li>) :
                            (<li>
                                <IconButton aria-label="login" variant="contained" color="primary" size="small" onClick={() => loginWithRedirect()}>
                                    <LoginIcon />
                                </IconButton>
                            </li>)}
                    </ul>
                </div>
            </div>
            <div className="body">
                <Outlet />
            </div>
        </div>
    )
}

export default Home;