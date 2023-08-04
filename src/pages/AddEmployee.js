import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Input } from '@mui/material';
import { useState } from 'react';

const defaultTheme = createTheme();

export default function AddEmployee() {
    const data=require('../utils/data.json');
    const empRows = data.empsDetails; 
    const employee = data.empList;
    const [inputs, setInputs] = useState({});
    const handleInputsChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
    const [isActive, setIsActive] = React.useState(true);
    const handleActiveChange = (event)=>{
        setIsActive(event.target.checked);
    }
    const [isAdmin, setIsAdmin] = React.useState(false);
    const handleAdminChange = (event)=>{
        setIsAdmin(event.target.checked);
    }    
  const handleSubmit = (event) => {
    // console.log(event)
     event.preventDefault();
     inputs.isActive = isActive;
     inputs.isAdmin = isAdmin;
     console.log(inputs);
    // const data = new FormData(event.currentTarget);
    // const formInput = {
    //     firstName: data.get('firstName'),
    //     lastName: data.get('lastName'),
    //     email: data.get('email'),
    //     password: data.get('password'),
    //     isAdmin: data.get('isAdmin'),
    //     isActive: data.get('isActive'),
    //     poolJoinedDate: data.get('poolJoinedDate'),
    //     poolEndDate: data.get('poolEndDate')
    //   };
    if(!inputs.isAdmin)
      empRows.push(inputs);
    employee.push(inputs);

  };

  return (
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

          <Typography component="h1" variant="h5">
            Add Employee
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  required
                  id="firstName"
                  label="First Name"
                  type='text'
                  value={inputs.firstName || ""}
                  onChange={handleInputsChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  type='text'
                  value={inputs.lastName || ""}
                  onChange={handleInputsChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type='email'
                  value={inputs.email || ""}
                  onChange={handleInputsChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={inputs.password || ""}
                  onChange={handleInputsChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value={isAdmin}checked={isAdmin}
                  onChange={handleAdminChange}
                  inputProps={{ 'aria-label': 'controlled' }} color="primary" />}
                  label="Are you an admin?"
                  name='isAdmin'
                />
              </Grid>
         {!isAdmin && (<>
              <Grid item xs={12} sm={6}>
                <Input
                  name="poolJoinedDate"
                  type='date'
                  required
                  id="poolJoinedDate"
                  label="Pool Joined Date"
                  value={inputs.poolJoinedDate || ""}
                  onChange={handleInputsChange}
                />
              </Grid>      
              <Grid item xs={12} sm={6}>
                <Input
                  autoComplete="given-name"
                  name="poolEndDate"
                  label="Pool End Date"
                  type="date"
                  id="poolEndDate"
                  value={inputs.poolEndDate || ""}
                  onChange={handleInputsChange}
                />
              </Grid>    
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox 
                  value={isActive}    
                  checked={isActive}
                  onChange={handleActiveChange}
                  inputProps={{ 'aria-label': 'controlled' }} color="primary" />}
                  label="Are you an active?"
                  name = "isActive"
                />
              </Grid></> ) }                
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
            <Grid container justifyContent="flex-end">
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}