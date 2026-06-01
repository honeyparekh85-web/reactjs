import { db, isFirebaseEnabled } from './config';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';

const throwFirebaseDisabledError = () => {
  throw new Error('Firebase is disabled. Configure VITE_USE_FIREBASE=true to use Firestore.');
};

const getCollections = () => {
  if (!isFirebaseEnabled || !db) {
    return { booksCollection: null };
  }
  return {
    booksCollection: collection(db, 'books'),
  };
};

const mapDoc = (docSnap) => ({ id: docSnap.id, ...docSnap.data() });

const removeUndefinedFields = (value) => (
  Object.fromEntries(Object.entries(value).filter(([, fieldValue]) => fieldValue !== undefined))
);

export const getBooksFirestore = async () => {
  if (!isFirebaseEnabled) throwFirebaseDisabledError();
  
  const { booksCollection } = getCollections();
  const q = query(booksCollection, orderBy('title', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(mapDoc);
};

export const subscribeBooksFirestore = (callback, errorCallback) => {
  if (!isFirebaseEnabled) {
    errorCallback?.(new Error('Firebase is disabled'));
    return () => {};
  }
  
  const { booksCollection } = getCollections();
  const q = query(booksCollection, orderBy('title', 'asc'));
  return onSnapshot(
    q,
    (snapshot) => callback(snapshot.docs.map(mapDoc)),
    errorCallback,
  );
};

export const getBookFirestore = async (id) => {
  if (!isFirebaseEnabled) throwFirebaseDisabledError();
  
  const docRef = doc(db, 'books', id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) {
    throw new Error('Book not found');
  }
  return { id: snapshot.id, ...snapshot.data() };
};

export const addBookFirestore = async (book) => {
  if (!isFirebaseEnabled) throwFirebaseDisabledError();
  
  const { booksCollection } = getCollections();
  const docRef = await addDoc(booksCollection, {
    ...book,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  const snapshot = await getDoc(docRef);
  return { id: docRef.id, ...snapshot.data() };
};

export const updateBookFirestore = async (id, book) => {
  if (!isFirebaseEnabled) throwFirebaseDisabledError();
  
  const docRef = doc(db, 'books', id);
  await updateDoc(docRef, {
    ...book,
    updatedAt: serverTimestamp(),
  });
  const snapshot = await getDoc(docRef);
  return { id: snapshot.id, ...snapshot.data() };
};

export const deleteBookFirestore = async (id) => {
  if (!isFirebaseEnabled) throwFirebaseDisabledError();
  
  const docRef = doc(db, 'books', id);
  await deleteDoc(docRef);
};

export const getQuotesFirestore = async () => {
  if (!isFirebaseEnabled) throwFirebaseDisabledError();
  
  const quotesCollection = collection(db, 'quotes');
  const q = query(quotesCollection, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(mapDoc);
};

export const addQuoteFirestore = async (quote) => {
  if (!isFirebaseEnabled) throwFirebaseDisabledError();
  
  const quotesCollection = collection(db, 'quotes');
  const docRef = await addDoc(quotesCollection, {
    ...quote,
    createdAt: serverTimestamp(),
  });
  const snapshot = await getDoc(docRef);
  return { id: docRef.id, ...snapshot.data() };
};

export const getBookshelfFirestore = async (userId) => {
  if (!isFirebaseEnabled || !userId || userId === 'guest') return [];
  try {
    const docRef = doc(db, 'bookshelves', userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().books || [];
    }
  } catch (error) {
    console.error('Error fetching bookshelf from Firestore:', error);
  }
  return [];
};

export const saveBookshelfFirestore = async (userId, books) => {
  if (!isFirebaseEnabled || !userId || userId === 'guest') return;
  try {
    const docRef = doc(db, 'bookshelves', userId);
    await setDoc(docRef, {
      books,
      updatedAt: serverTimestamp(),
    }, { merge: true });
  } catch (error) {
    console.error('Error saving bookshelf to Firestore:', error);
  }
};

export const createOrUpdateUserProfile = async ({ uid, email, displayName, photoURL, role }) => {
  if (!isFirebaseEnabled) {
    // Return a mock user profile when Firebase is disabled
    return {
      id: uid,
      uid,
      email,
      displayName,
      photoURL,
      role: role || 'user',
      lastSeen: new Date(),
      createdAt: new Date(),
    };
  }
  
  const userRef = doc(db, 'users', uid);
  const snapshot = await getDoc(userRef);
  const payload = removeUndefinedFields({
    uid,
    email,
    displayName,
    photoURL,
    role: snapshot.data()?.role || role || 'user',
    lastSeen: serverTimestamp(),
  });

  if (!snapshot.exists()) {
    payload.createdAt = serverTimestamp();
  }

  await setDoc(userRef, payload, { merge: true });
  const updatedSnapshot = await getDoc(userRef);
  return { id: updatedSnapshot.id, ...updatedSnapshot.data() };
};
