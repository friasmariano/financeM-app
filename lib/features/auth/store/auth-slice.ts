import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import AuthState from '@/types/AuthState';
import User from '@/types/User';

const initialState: AuthState = {
    data: {
        loggedIn: false,
        user: null
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
        }
    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;