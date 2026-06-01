import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const normalizeStorageBucket = (raw) => {
  if (!raw) return raw;
  const value = raw.replace(/^gs:\/\//, '').trim();
  // Use the bucket from Firebase Console as-is (firebasestorage.app or appspot.com).
  return value;
};

const storageBucket = normalizeStorageBucket(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Only initialize Firebase if enabled
const isFirebaseEnabled = import.meta.env.VITE_USE_FIREBASE === 'true';

let app, auth, storage, db, analytics;

if (isFirebaseEnabled) {
  app = initializeApp(firebaseConfig);
  analytics = null;
  
  auth = getAuth(app);
  storage = storageBucket ? getStorage(app, `gs://${storageBucket}`) : getStorage(app);
  db = getFirestore(app);

  const useEmulators = import.meta.env.DEV && import.meta.env.VITE_USE_FIREBASE_EMULATORS === 'true';

  if (useEmulators) {
    try {
      connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
      connectFirestoreEmulator(db, '127.0.0.1', 8080);
      connectStorageEmulator(storage, '127.0.0.1', 9199);
      console.info('[BookHaven] Using Firebase emulators (no Storage CORS issues on localhost).');
    } catch (error) {
      console.warn('[BookHaven] Firebase emulators already connected or unavailable:', error.message);
    }
  }
  console.info('[BookHaven] Firebase initialized successfully.');
} else {
  console.info('[BookHaven] Firebase is disabled - using local storage mode for PDFs.');
  // Create mock objects for non-Firebase mode
  app = null;
  auth = null;
  storage = null;
  db = null;
  analytics = null;
}

export { app, auth, storage, db, analytics, storageBucket, isFirebaseEnabled };
export default app;
