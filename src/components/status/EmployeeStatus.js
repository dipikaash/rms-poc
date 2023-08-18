import { useSearchParams } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import StatusList from './StatusList';
import { getStatusData } from '../../api';

const EmployeeStatus = () =>{
    let [searchParams] = useSearchParams();
    const email = searchParams.get('email');
    const defaultTheme = createTheme();
   
    const [loader, setLoader] = useState(true);
    const [myData, setMyData] = useState({});
  
    useEffect(() => {
        let asyncFunction = async () => {
            await getStatusData();
            const empStatusData = await JSON.parse(localStorage.getItem('status'));
            setMyData(empStatusData.find((el) => el.email === email));
            setLoader(false);
        };
        asyncFunction();
      });
      
    return (
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'green', width: 100, height: 100 }}>
                <AccountCircleIcon style={{ width: 100, height: 100 }} />
              </Avatar>
              <Typography component="h1" variant="h5">
                {myData?.firstName || ""} {myData?.lastName}
              </Typography >
              <Typography component="h1" variant="h5">
                {myData?.email}
              </Typography>
              <Typography component="h2" variant="h5">{myData?.primarySkills ? myData?.primarySkills.join('|'): ''}</Typography>
              <Box component="form"  sx={{ mt: 10}}>
              { loader ? (
          <h1 style={{ marginTop: '100px', textAlign: 'center' }}>
           <CircularProgress color='success' />
          </h1>
        ) : (<StatusList empStatus= {myData?.empStatus} />)}

              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      )
}

export default EmployeeStatus;