// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import alertReducer from './alertSlice'; // Agregar el nuevo slice de alertas

const store = configureStore({
  reducer: {
    user: userReducer,
    alert: alertReducer, // Agregar el slice de alertas al store
  },
});

export default store;
