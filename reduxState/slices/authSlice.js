import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: "",
    isAdmin: false,
    username: "",
    id: 0,
    auth: false,
    email: "",
    skill: "",
};

export const authSlice = createSlice({
    name: "authState",
    initialState,
    reducers: {
        auth: (state, action) => {
            state.token = action.payload.token;
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.isAdmin = action.payload.isAdmin;
            state.auth = action.payload.auth;
            state.email = action.payload.email;
            state.skill = action.payload?.skill;
        },
    },
});

// Action creators are generated for each case reducer function
export const { auth } = authSlice.actions;

export default authSlice.reducer;
