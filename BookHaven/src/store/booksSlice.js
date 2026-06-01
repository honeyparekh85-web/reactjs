import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBooks } from '../services/bookApi';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const response = await getBooks();
  return response.data;
});

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setBooks: (state, action) => {
      state.items = action.payload;
      state.status = 'succeeded';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setBooks } = booksSlice.actions;
export default booksSlice.reducer;
