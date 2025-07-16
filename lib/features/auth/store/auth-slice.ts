import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import AuthState from '@/types/AuthState';
import User from '@/types/User';
import HttpStatus from '@/types/HttpStatus';

const initialState: AuthState = {
    data: {
        loggedIn: false,
        user: null,
        httpStatus: {
            statusCode: 0,
            errorMessage: ''
        }
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<User>) => {
            state.data.loggedIn = true;
            state.data.user = action.payload;
        },
        logout: (state) => {
            state.data.loggedIn = false;
            state.data.user = null;
        },
        setHttpStatus: (state, action: PayloadAction<HttpStatus>) => {
            state.data.httpStatus = action.payload;
        },
    }
})

export const { login, logout, setHttpStatus } = authSlice.actions;
export default authSlice.reducer;