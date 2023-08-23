import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    SetUser : (state) => {
      state.user = state.payload;
    }
  }
});

export const { SetUser } = userSlice.actions;
