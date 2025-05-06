import { createSlice } from "@reduxjs/toolkit";

const navSlice = createSlice({
    name: 'nav',
    initialState: {
        data: {
            isOpen: false
        }
    },
    reducers: {
        toggle: (state) => {
            state.data.isOpen = !state.data.isOpen;
        }
    }
})

export const { toggle } = navSlice.actions;
export default navSlice.reducer;