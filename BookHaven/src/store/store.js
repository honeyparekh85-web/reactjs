import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './booksSlice';
import shelfReducer from './shelfSlice';
import quoteReducer from './quoteSlice';
import userReducer from './userSlice';
import cartReducer from './cartSlice';
import { hydrateShelf } from './shelfSlice';
import { saveShelfToStorage, loadShelfFromStorage } from '../utils/shelfStorage';
import { getBookshelfFirestore, saveBookshelfFirestore } from '../firebase/firestoreService';

const useFirebase = import.meta.env.VITE_USE_FIREBASE === 'true';

const SHELF_PERSIST_ACTIONS = [
  'shelf/addToShelf',
  'shelf/removeFromShelf',
  'shelf/updateProgress',
  'shelf/updateStatus',
  'shelf/hydrateShelf',
];

const USER_SHELF_ACTIONS = [
  'user/setUser',
  'user/loginUser/fulfilled',
  'user/signupUser/fulfilled',
  'user/googleSignIn/fulfilled',
  'user/logoutUser/fulfilled',
];

const shelfPersistMiddleware = (storeApi) => (next) => (action) => {
  const result = next(action);

  if (USER_SHELF_ACTIONS.includes(action.type)) {
    const uid = action.type === 'user/logoutUser/fulfilled'
      ? 'guest'
      : action.payload?.redirecting
        ? null
        : action.payload?.uid || 'guest';
    if (uid) {
      if (uid === 'guest' || !useFirebase) {
        storeApi.dispatch(hydrateShelf(loadShelfFromStorage(uid)));
      } else {
        // Load from Firestore first
        getBookshelfFirestore(uid)
          .then((firebaseBooks) => {
            if (firebaseBooks && firebaseBooks.length > 0) {
              storeApi.dispatch(hydrateShelf(firebaseBooks));
              saveShelfToStorage(uid, firebaseBooks);
            } else {
              // Fallback to localStorage if Firestore is empty
              const localBooks = loadShelfFromStorage(uid);
              storeApi.dispatch(hydrateShelf(localBooks));
              if (localBooks && localBooks.length > 0) {
                saveBookshelfFirestore(uid, localBooks);
              }
            }
          })
          .catch((err) => {
            console.error('Failed to load bookshelf from Firestore:', err);
            storeApi.dispatch(hydrateShelf(loadShelfFromStorage(uid)));
          });
      }
    }
  }

  if (SHELF_PERSIST_ACTIONS.includes(action.type)) {
    const { user, shelf } = storeApi.getState();
    const uid = user.user?.uid;
    saveShelfToStorage(uid, shelf.books);
    if (uid && uid !== 'guest' && useFirebase) {
      saveBookshelfFirestore(uid, shelf.books);
    }
  }

  return result;
};

export const store = configureStore({
  reducer: {
    books: booksReducer,
    shelf: shelfReducer,
    quotes: quoteReducer,
    user: userReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shelfPersistMiddleware),
});
