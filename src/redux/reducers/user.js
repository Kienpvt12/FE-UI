import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    updateUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    removeUser: () => {
      return {};
    },
  },
});

export const { updateUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
