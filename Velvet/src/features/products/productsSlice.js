import { createSlice } from '@reduxjs/toolkit';
import { products } from '../../data/products.js';

const productsSlice = createSlice({
  name: 'products',
  initialState: { items: products, searchTerm: '' },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setSearchTerm } = productsSlice.actions;
export default productsSlice.reducer;

