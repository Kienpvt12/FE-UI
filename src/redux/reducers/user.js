import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: 0,
    username: '',
    email: '',
    avatar: '',
  },
  reducers: {
    add: (state, action) => {
      state = [...state, action.payload];
    },
    update: (state, action) => {
      state = [...state, action.payload];
    },
    remove: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { add, update, remove } = userSlice.actions;

export default userSlice.reducer;
