import { createSlice } from '@reduxjs/toolkit'

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        data: {
            isOpened: false
        },
    },
    reducers: {
        changeSidebarStatus: (state) => {
            state.data.isOpened = !state.data.isOpened
        }
    }
})

export const { changeSidebarStatus } = sidebarSlice.actions
export default sidebarSlice.reducer