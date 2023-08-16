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
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../Store/UserSlice';
import Alert from '@mui/material/Alert/Alert';

const Login = ()=>{
 const defaultTheme = createTheme();
 const navigate = useNavigate();
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [showError, setShowError] = useState(false);

  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    let userCredentials = {
      email, password
    }
    dispatch(loginUser(userCredentials)).then((result)=>{
      let user = localStorage.getItem('user');
      if(user)
        user = JSON.parse(user);
      if(user.isAdmin){
        setEmail('');
        setPassword('');
        navigate('/');
      }
      else
        setShowError(true);
       
    })
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
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
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
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              { showError && <Alert severity="error" >Not an Admin, Try with different user</Alert>}
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