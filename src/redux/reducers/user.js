import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    addUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    updateUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    removeUser: () => {
      return {};
    },
  },
});

export const { addUser, updateUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
