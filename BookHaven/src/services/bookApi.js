import axios from 'axios';
import localData from '../../db.json';
import {
  getBooksFirestore,
  getBookFirestore,
  addBookFirestore,
  updateBookFirestore,
  deleteBookFirestore,
  subscribeBooksFirestore,
} from '../firebase/firestoreService';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 5000,
});

const useFirebase = import.meta.env.VITE_USE_FIREBASE === 'true';
const normalize = async (value) => ({ data: value });

export const getBooks = async () => {
  if (!useFirebase) {
    return api.get('/books');
  }

  try {
    const books = await getBooksFirestore();
    if (!books || books.length === 0) {
      const fallback = localData.books || [];
      if (fallback.length > 0) {
        console.warn('Firebase returned no books; falling back to local JSON sample books.');
        return normalize(fallback);
      }
    }
    return normalize(books);
  } catch (error) {
    console.error('Firebase getBooks failed, falling back to local JSON:', error);
    return normalize(localData.books || []);
  }
};

export const getBook = async (id) => {
  if (!useFirebase) {
    return api.get(`/books/${id}`);
  }

  try {
    return normalize(await getBookFirestore(id));
  } catch (error) {
    console.error(`Firebase getBook(${id}) failed, falling back to local JSON:`, error);
    const fallbackBook = (localData.books || []).find((book) => String(book.id) === String(id));
    if (!fallbackBook) {
      throw error;
    }
    return normalize(fallbackBook);
  }
};

export const addBook = async (book) => {
  return useFirebase ? normalize(await addBookFirestore(book)) : api.post('/books', book);
};

export const updateBook = async (id, book) => {
  return useFirebase ? normalize(await updateBookFirestore(id, book)) : api.put(`/books/${id}`, book);
};

export const deleteBook = async (id) => {
  return useFirebase ? normalize(await deleteBookFirestore(id)) : api.delete(`/books/${id}`);
};

export const subscribeBooks = (callback, errorCallback) => {
  if (useFirebase) {
    try {
      return subscribeBooksFirestore(callback, errorCallback);
    } catch (error) {
      console.error('Firebase subscribeBooks failed, falling back to local JSON:', error);
      callback(localData.books || []);
      return () => {};
    }
  }

  let cancelled = false;
  getBooks()
    .then((response) => {
      if (!cancelled) callback(response.data);
    })
    .catch(errorCallback);

  return () => {
    cancelled = true;
  };
};

export default api;
