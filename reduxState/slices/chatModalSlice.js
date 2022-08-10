import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    show: false,
};

export const chatScreenSlice = createSlice({
    name: "chatScreenState",
    initialState,
    reducers: {
        toggleState: (state, action) => {
            state.show = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { toggleState } = chatScreenSlice.actions;

export default chatScreenSlice.reducer;
