// alertSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showNegativeQuantityAlert: false,
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setShowNegativeQuantityAlert: (state, action) => {
      state.showNegativeQuantityAlert = action.payload;
    },
  },
});

export const { setShowNegativeQuantityAlert } = alertSlice.actions;

export default alertSlice.reducer;
