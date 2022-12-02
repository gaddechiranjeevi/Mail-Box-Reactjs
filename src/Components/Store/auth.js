import { createSlice } from "@reduxjs/toolkit";

const initValue = { isAuth: false }

const authSlice = createSlice({
    name: 'Authentication',
    initialState: initValue,
    reducers:{
        setAuth(state,action){
            state.isAuth=action.payload;
        },
        checker(state){
            const localIsLogin = localStorage.getItem('JWTTOKEN');
        if(localIsLogin ===null){
            state.isAuth = false;
        }else if(localIsLogin === ''){
            state.isAuth =false;
        }else if(localIsLogin.trim().length > 0){
            state.isAuth = true;
        }
        }
    }
})

export const authActions = authSlice.actions;

export default authSlice.reducer;