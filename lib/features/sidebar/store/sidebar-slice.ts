import { createSlice } from '@reduxjs/toolkit'

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        data: {
            isOpened: false
        },
    },
    reducers: {
        toggle: (state) => {
            state.data.isOpened = !state.data.isOpened
        }
    }
})

export const { toggle } = sidebarSlice.actions
export default sidebarSlice.reducer