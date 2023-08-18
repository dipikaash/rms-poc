import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { hostname } from "../utils/config";

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async(userCredentials)=>{
     await fetch(`${hostname}/empList/`, {method: "GET"})
       .then(response=>{ return response?.json()})
       .then(response => {
        let user = response.find((el) => el.email === userCredentials.email);
        if(user)
        localStorage.setItem('user',JSON.stringify(user));
        else {
        localStorage.removeItem('user');
        user = null;
        }
        return user;
    });
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        user: null,
        error: null
    },
    extraReducers: (builder)=> {
        builder
        .addCase(loginUser.pending,(state) =>{
            state.loading = true;
            state.user = null;
            state.error = null;
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            // console.log('action', action);
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading = false;
            state.user = null;
           // console.log(action.error.message);
            if(action.error.message === 'Request failed with status code 401')
            state.error = 'Access Denied';
            else
            state.error = action.error.message;
        })
    }
});

export default userSlice.reducer;