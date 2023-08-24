import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


export function getUser() {
    let user = localStorage.getItem('user');
    if (user)
        user = JSON.parse(user);
    else
        user = null;
    return user;
}
const Home = () => {
    const [user] = useState(getUser());
    return (<>
        {user ?
            (<div className="container">
                <Header />
                <div className="body">
                    <Outlet />
                </div>
            </div>) : (<div>
                <Box
                    sx={{
                        marginTop: 35,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">Welcome to Happiest Minds RMS Portal</Typography>
                    <Link to="/login"><Button variant="contained" color="primary">Login</Button></Link>
                </Box></div>)}
    </>
    )
}

export default Home;