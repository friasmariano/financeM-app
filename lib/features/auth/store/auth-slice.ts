import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        data: {
            loggedIn: false
        }
    },
    reducers: {
        setLoginStatus: (state) => {
            state.data.loggedIn = !state.data.loggedIn;
        }
    }
})

export const { setLoginStatus } = authSlice.actions;
export default authSlice.reducer;