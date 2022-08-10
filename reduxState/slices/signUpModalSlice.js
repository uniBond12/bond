import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false
};

export const signUpScreenSlice = createSlice({
  name: "signUpScreenState",
  initialState,
  reducers: {
    toggleState: (state, action) => {
      state.show = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { toggleState } = signUpScreenSlice.actions;

export default signUpScreenSlice.reducer;
