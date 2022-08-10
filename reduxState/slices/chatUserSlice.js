import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: "",
    id: 0,
    email: "",
    status: false,
    skill: "",
};

export const chatUserSlice = createSlice({
    name: "chatUserState",
    initialState,
    reducers: {
        chatUser: (state, action) => {
            state.email = action.payload.email;
            state.id = action.payload.id;
            state.status = action.payload.status;
            state.username = action.payload.username;
            state.skill = action.payload.skill;
        },
    },
});

// Action creators are generated for each case reducer function
export const { chatUser } = chatUserSlice.actions;

export default chatUserSlice.reducer;
