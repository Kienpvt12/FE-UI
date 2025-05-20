import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isFirstLoad: true,
};

export const statusSlice = createSlice({
  name: 'status',
  initialState: initialState,
  reducers: {
    updateStatus: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetStatus: () => {
      return initialState;
    },
  },
});

export const { updateStatus, resetStatus } = statusSlice.actions;

export default statusSlice.reducer;
