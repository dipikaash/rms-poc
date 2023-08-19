import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { hostname } from '../utils/config';
import { GET_ALL_EMPLOYEES_DATA } from './userType';
const initialState = {
  employeesData: [],
};
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userCredentials) => {
    await fetch(`${hostname}/empList/`, { method: 'GET' })
      .then((response) => {
        return response?.json();
      })
      .then((response) => {
        let user = response.find((el) => el.email === userCredentials.email);
        if (user) localStorage.setItem('user', JSON.stringify(user));
        else {
          localStorage.removeItem('user');
          user = null;
        }
        return user;
      });
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        // console.log('action', action);
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        // console.log(action.error.message);
        if (action.error.message === 'Request failed with status code 401')
          state.error = 'Access Denied';
        else state.error = action.error.message;
      });
  },
});

export const fetchEmployeesData = createAsyncThunk(
  'counter/fetchCount',
  async (state, action) => {
    const res = await fetch(`${hostname}/empsDetails/`, { method: 'GET' });
    const data = res.json();
    return data;
  }
);
export const employees = createSlice({
  name: GET_ALL_EMPLOYEES_DATA,
  initialState,
  reducers: {
    handleDelete: (state, email) => {
      state.employeesData = state.employeesData.filter(
        (el) => el.email !== email.payload
      );
    },
    AddEditEmployees: (state, inputs) => {
      let list = state.employeesData;
      const existingData = list.find((el) => el.email === inputs.payload.email);
      if (existingData) {
        list = list.map((el) => {
          if (el.email === inputs.payload.email) {
            let obj = { ...el, ...inputs.payload };
            return obj;
          } else return el;
        });
        state.employeesData = list;
      } else {
        const newList = [...list, inputs.payload];
        state.employeesData = newList;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEmployeesData.fulfilled, (state, action) => {
      state.employeesData = action.payload;
    });
  },
});
export const { handleDelete, AddEditEmployees } = employees.actions;
export default userSlice.reducer;
