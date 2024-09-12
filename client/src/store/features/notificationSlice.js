import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers:{
        errorGlobal: (state, action) => {
            state.error = true;
            state.msg = action.payload;

        },
        successGlobal: (state,action) => {
            state.success = true;
            state.msg = action.payload;

        },
        clearNotification: () => {
            return initialState; // Resets the state to the initial state
        }

    }
})

export const { errorGlobal, successGlobal, clearNotification } = notificationSlice.actions;

export const selectNotification = (state) => state.notification;
export default notificationSlice.reducer