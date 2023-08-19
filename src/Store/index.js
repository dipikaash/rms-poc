import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice';
import { employees } from './UserSlice';
const store = configureStore({
  reducer: {
    user: userReducer,
    employees: employees.reducer,
  },
});

export default store;
