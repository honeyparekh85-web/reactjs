import { createSlice } from '@reduxjs/toolkit';
import { loadShelfFromStorage } from '../utils/shelfStorage';

const shelfSlice = createSlice({
  name: 'shelf',
  initialState: {
    books: loadShelfFromStorage('guest'),
  },
  reducers: {
    hydrateShelf: (state, action) => {
      state.books = action.payload;
    },
    addToShelf: (state, action) => {
      const exists = state.books.find((b) => b.id === action.payload.id);
      if (!exists) {
        state.books.push({
          ...action.payload,
          status: action.payload.status || 'wishlist',
          progress: action.payload.progress ?? 0,
        });
      }
    },
    removeFromShelf: (state, action) => {
      state.books = state.books.filter((b) => b.id !== action.payload);
    },
    updateProgress: (state, action) => {
      const book = state.books.find((b) => b.id === action.payload.id);
      if (book) {
        book.progress = action.payload.progress;
        if (book.progress === 100) book.status = 'completed';
      }
    },
    updateStatus: (state, action) => {
      const book = state.books.find((b) => b.id === action.payload.id);
      if (book) {
        book.status = action.payload.status;
      }
    },
  },
});

export const { hydrateShelf, addToShelf, removeFromShelf, updateProgress, updateStatus } = shelfSlice.actions;
export default shelfSlice.reducer;
