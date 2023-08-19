import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { AddEditEmployees } from '../../Store/UserSlice';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Input } from '@mui/material';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const defaultTheme = createTheme();

export default function AddEmployee(props) {
  const { email, addOrEdit } = props;
  const [inputs, setInputs] = useState({});
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [isActive, setIsActive] = React.useState(true);
  const dispatch = useDispatch();
  const { employeesData: list } = useSelector((state) => state.employees);
  const handleInputsChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleActiveChange = (event) => {
    setIsActive(event.target.checked);
  };

  const handleAdminChange = (event) => {
    setIsAdmin(event.target.checked);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    inputs.isActive = isActive;
    inputs.isAdmin = isAdmin;
    dispatch(AddEditEmployees(inputs));
    addOrEdit();
    setInputs({});
  };

  React.useEffect(() => {
    if (email) {
      const myData = list.find((el) => el.email === email);
      if (myData) {
        setInputs({
          firstName: myData.firstName,
          email,
          lastName: myData.lastName,
          isAdmin: myData.isAdmin,
          // password: myData.password,
          poolJoinedDate: myData.poolJoinedDate,
          poolEndDate: myData.poolEndDate,
        });
      }
    }
  }, [email]);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component='form' onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name='firstName'
                  required
                  id='firstName'
                  label='First Name'
                  type='text'
                  value={inputs.firstName || ''}
                  onChange={handleInputsChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id='lastName'
                  label='Last Name'
                  name='lastName'
                  type='text'
                  value={inputs.lastName || ''}
                  onChange={handleInputsChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  type='email'
                  value={inputs.email || ''}
                  onChange={handleInputsChange}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  value={inputs.password || ''}
                  onChange={handleInputsChange}
                />
              </Grid> */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={isAdmin}
                      checked={isAdmin}
                      onChange={handleAdminChange}
                      inputProps={{ 'aria-label': 'controlled' }}
                      color='primary'
                    />
                  }
                  label='Are you an admin?'
                  name='isAdmin'
                />
              </Grid>
              {!isAdmin && (
                <>
                  <Grid item xs={12} sm={6}>
                    <label>pool Joined Date</label>
                    <Input
                      name='poolJoinedDate'
                      type='date'
                      required
                      id='poolJoinedDate'
                      label='Pool Joined Date'
                      value={inputs.poolJoinedDate || ''}
                      onChange={handleInputsChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <label>pool End Date</label>
                    <Input
                      autoComplete='given-name'
                      name='poolEndDate'
                      label='Pool End Date'
                      type='date'
                      id='poolEndDate'
                      value={inputs.poolEndDate || ''}
                      onChange={handleInputsChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={isActive}
                          checked={isActive}
                          onChange={handleActiveChange}
                          inputProps={{ 'aria-label': 'controlled' }}
                          color='primary'
                        />
                      }
                      label='Are you an active?'
                      name='isActive'
                    />
                  </Grid>
                </>
              )}
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
            <Grid container justifyContent='flex-end'></Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
