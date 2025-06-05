import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        data: {
            loggedIn: false
        }
    },
    reducers: {
        login: (state) => {
            state.data.loggedIn = true;
        },
        logout: (state) => {
            state.data.loggedIn = false;
        }
    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;