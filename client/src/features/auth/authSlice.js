import { createSlice } from '@reduxjs/toolkit';
export const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null },
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.accessToken;
    },
    logout: (state) => {
      state.token = null;
    },
  },
});

export default authSlice.reducer;
export const { setCredentials, logout } = authSlice.actions;
export const selectToken = (state) => state.auth.token;
