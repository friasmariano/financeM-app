import { createSlice } from "@reduxjs/toolkit";

const navSlice = createSlice({
    name: 'nav',
    initialState: {
        data: {
            isOpen: false
        }
    },
    reducers: {
        setNavbarStatus: (state) => {
            state.data.isOpen = !state.data.isOpen;
        }
    }
})

export const { setNavbarStatus } = navSlice.actions;
export default navSlice.reducer;