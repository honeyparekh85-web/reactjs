import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice.js';
import cartReducer from '../features/cart/cartSlice.js';
import authReducer from '../features/auth/authSlice.js';
import wishlistReducer from '../features/wishlist/wishlistSlice.js';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
    wishlist: wishlistReducer,
  },
});

