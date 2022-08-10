import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
};

export const usersSlice = createSlice({
    name: "usersState",
    initialState,
    reducers: {
        usersState: (state, action) => {
            state.users = action.payload.users;
        },
    },
});

// Action creators are generated for each case reducer function
export const { usersState } = usersSlice.actions;

export default usersSlice.reducer;
