// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { idUser: localStorage.getItem('idUser') },
  reducers: {
    setIdUser: (state, action) => {
      state.idUser = action.payload;
    },
  },
});

export const { setIdUser } = userSlice.actions;

export default userSlice.reducer;