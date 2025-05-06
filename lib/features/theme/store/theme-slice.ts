import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        data: {
            isDark: false
        }
    },
    reducers: {
        toggle: (state) => {
            state.data.isDark = !state.data.isDark;
        }
    }
})

export const { toggle } = themeSlice.actions;
export default themeSlice.reducer;