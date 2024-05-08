import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    requestStart(state) {
      state.loading = true;
    },
    requestSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.currentUser = action.payload;
    },
    requestFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
      state.loading = false;
    },
  },
});

export const { requestStart, requestSuccess, requestFailure, clearError } =
  userSlice.actions;

export default userSlice.reducer;
