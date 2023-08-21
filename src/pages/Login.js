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
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../Store/UserSlice';
import Alert from '@mui/material/Alert/Alert';
import { getUser } from './Home';

const Login = () => {
  const defaultTheme = createTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [showError, setShowError] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const [user] = useState(getUser());

  const dispatch = useDispatch();
  const handleSubmit = (event) => {

    event.preventDefault();
    let userCredentials = {
      email
    }
    dispatch(loginUser(userCredentials)).then((result) => {
      let user = localStorage.getItem('user');
      if (user) {
        setUserNotFound(false);
        user = JSON.parse(user);
        if (user?.isAdmin) {
          setEmail('');
          navigate('/');
        }
        else setShowError(true);
      }
      else setUserNotFound(true);
    })
  };
  return (<>
    { user ? <Navigate to="/" /> : 
    (<ThemeProvider theme={defaultTheme}>
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
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {userNotFound && <Alert severity="error" >Not a Happiest minds employee! Try again</Alert>}
            {!userNotFound && showError && <Alert severity="error" >Not an Admin, Try with different user</Alert>}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>)}
    </>);

}
export default Login;