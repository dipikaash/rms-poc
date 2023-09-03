import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { hostname } from '../utils/config';

const GET_ALL_EMPLOYEES_DATA = 'GET_ALL_EMPLOYEES_DATA';
const initialState = {
  employeesData: [],
};
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
      AddEmployees: (state, inputs) => {   
        let list = state.employeesData;
        const existingData = list.find((el) => el.email === inputs.payload.email);
        if (existingData) {
          window.alert('Email already exists, try using different email');
        } else {
          const newList = [...list, inputs.payload];
          state.employeesData = newList;
        }
      },
      EditEmployees: (state, inputs) => {
        let list = state.employeesData;
          list = list.map((el) => {
            if (el.email === inputs.payload.email) {
              let obj = { ...el, ...inputs.payload };
              return obj;
            } else return el;
          });
          state.employeesData = list;
      },
      filterEmployees: (state, inputs) => {
        state.employeesData = inputs.payload;
        console.log(state.employeesData);
      }
    },
    extraReducers: (builder) => {
      builder.addCase(fetchEmployeesData.fulfilled, (state, action) => {
        state.employeesData = action.payload;
      });
    },
  });
  export const { handleDelete, AddEmployees, EditEmployees, filterEmployees } = employees.actions;