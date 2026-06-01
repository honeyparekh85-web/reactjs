import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], totalQty: 0, totalPrice: 0 },
  reducers: {
    addToCart: (state, action) => {
      const price = Number(action.payload.price) || 0;
      const itemInCart = state.items.find(item => item.id === action.payload.id);
      if (itemInCart) {
        itemInCart.qty++;
      } else {
        state.items.push({ ...action.payload, price, qty: 1 });
      }
      state.totalQty++;
      state.totalPrice += price;
    },
    removeFromCart: (state, action) => {
      const itemToRemove = state.items.find(item => item.id === action.payload);
      if (itemToRemove) {
        state.totalQty -= itemToRemove.qty;
        state.totalPrice -= itemToRemove.price * itemToRemove.qty;
        state.items = state.items.filter(item => item.id !== action.payload);
      }
    },
    updateQuantity: (state, action) => {
      const { id, qty } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        const diff = qty - item.qty;
        item.qty = qty;
        state.totalQty += diff;
        state.totalPrice += item.price * diff;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQty = 0;
      state.totalPrice = 0;
    }
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
