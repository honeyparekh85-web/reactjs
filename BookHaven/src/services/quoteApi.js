import api from './bookApi';
import { getQuotesFirestore, addQuoteFirestore } from '../firebase/firestoreService';

const useFirebase = import.meta.env.VITE_USE_FIREBASE === 'true';
const normalize = async (value) => ({ data: value });

export const getQuotes = async () => {
  if (!useFirebase) {
    return api.get('/quotes');
  }
  try {
    const quotes = await getQuotesFirestore();
    return normalize(quotes);
  } catch (error) {
    console.error('Firebase getQuotes failed, falling back to local json-server:', error);
    return api.get('/quotes');
  }
};

export const addQuote = async (q) => {
  if (!useFirebase) {
    return api.post('/quotes', q);
  }
  try {
    const newQuote = await addQuoteFirestore(q);
    return normalize(newQuote);
  } catch (error) {
    console.error('Firebase addQuote failed, falling back to local json-server:', error);
    return api.post('/quotes', q);
  }
};
