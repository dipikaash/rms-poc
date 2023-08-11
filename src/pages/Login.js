import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ()=>{
 const defaultTheme = createTheme();
 const navigate = useNavigate();
 const [showError, setShowError] = useState(false);
 const getData = async () => {
    await fetch('http://localhost:4000/empList/')
    .then(response=>{ return response?.json()}).then(
      response =>{
      localStorage.setItem('admins', JSON.stringify(response));
    });  
  };
  useEffect(() => {
    let asyncFunction = async () => {
        await getData();
   // const adminData = await JSON.parse(localStorage.getItem('list'));
    asyncFunction();
  }} );
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    const email = data.get('email');
    const adminData = JSON.parse(localStorage.getItem('list'));
    const user = adminData.filter((item)=>item.email === email);
    if(user?.isAdmin) {
        localStorage.setItem('user', JSON.stringify(user));
        navigate(`/`);
    }
     
    else 
      setShowError(true);
  };
    return(
        <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              { showError && <div >Try with different user</div>}
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
//         <FormControl>
//   <InputLabel htmlFor="my-input">Email address</InputLabel>
//   <Input id="my-input" aria-describedby="my-helper-text" />
//   <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
// </FormControl>
    
}
export default Login;