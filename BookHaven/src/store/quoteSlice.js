import { createSlice } from '@reduxjs/toolkit';

const quoteSlice = createSlice({
  name: 'quotes',
  initialState: {
    items: [],
  },
  reducers: {
    saveQuote: (state, action) => {
      state.items.push({ id: Date.now(), ...action.payload });
    },
    removeQuote: (state, action) => {
      state.items = state.items.filter(q => q.id !== action.payload);
    },
  },
});

export const { saveQuote, removeQuote } = quoteSlice.actions;
export default quoteSlice.reducer;
