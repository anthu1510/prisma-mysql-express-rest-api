import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errors: [],
  userData: {},
  pending: false,
  success: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {},
});

export const {} = userSlice.actions;

export default userSlice.reducer;
