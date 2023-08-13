import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import cartReducer from './features/cart/cartSlice';
const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
}); // configureStore() is a function that takes an object with a reducer property, and returns a Redux store. We pass it an object with a user property, and we assign it the userReducer that we imported

export default store;
