import { auth, isFirebaseEnabled } from './config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth';
import { shouldPreferGoogleRedirect } from '../utils/authEnvironment';

export const googleProvider = isFirebaseEnabled ? new GoogleAuthProvider() : null;
if (googleProvider) {
  googleProvider.setCustomParameters({ prompt: 'select_account' });
}

const throwFirebaseDisabledError = () => {
  throw new Error('Firebase is disabled. Configure VITE_USE_FIREBASE=true to use authentication.');
};

const getReadableAuthError = (error) => {
  if (error?.code === 'auth/configuration-not-found') {
    return (
      'Firebase Authentication is not configured for this project. ' +
      'Enable Authentication and the Google sign-in provider in the Firebase Console, ' +
      'then verify your .env Firebase project values match the same project.'
    );
  }

  if (error?.code === 'auth/popup-closed-by-user') {
    return 'Google sign-in was cancelled before completion.';
  }

  if (error?.code === 'auth/popup-blocked') {
    return 'The browser blocked the Google sign-in popup. Please allow popups and try again.';
  }

  if (error?.code === 'auth/unauthorized-domain') {
    const host = typeof window !== 'undefined' ? window.location.hostname : 'this domain';
    return (
      `Domain "${host}" is not authorized for Firebase Auth. ` +
      'Open the app at http://localhost:5173 (not 127.0.0.1), or add this domain in ' +
      'Firebase Console → Authentication → Settings → Authorized domains.'
    );
  }

  if (error?.message?.includes('App domain is unauthorized')) {
    return (
      'This browser domain is not authorized for Google sign-in. ' +
      'Use Chrome/Edge at http://localhost:5173, or add the domain in Firebase Console → Authentication → Authorized domains.'
    );
  }

  return error?.message || 'Authentication failed. Please try again.';
};

const throwReadableAuthError = (error) => {
  const readableError = new Error(getReadableAuthError(error));
  readableError.code = error?.code;
  throw readableError;
};

export const registerWithEmailPassword = async ({ name, email, password }) => {
  if (!isFirebaseEnabled) throwFirebaseDisabledError();
  
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  if (name) {
    await updateProfile(userCredential.user, { displayName: name });
  }
  return userCredential.user;
};

export const loginWithEmailPassword = async ({ email, password }) => {
  if (!isFirebaseEnabled) throwFirebaseDisabledError();
  
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

const shouldUseRedirect = () => shouldPreferGoogleRedirect();

export const loginWithGoogle = async () => {
  if (!isFirebaseEnabled) throwFirebaseDisabledError();
  
  try {
    if (shouldUseRedirect()) {
      await signInWithRedirect(auth, googleProvider);
      return null;
    }
    const userCredential = await signInWithPopup(auth, googleProvider);
    return userCredential.user;
  } catch (error) {
    if (
      error?.code === 'auth/popup-blocked'
      || error?.code === 'auth/cancelled-popup-request'
      || error?.code === 'auth/unauthorized-domain'
    ) {
      await signInWithRedirect(auth, googleProvider);
      return null;
    }
    throwReadableAuthError(error);
  }
};

export const completeGoogleRedirectSignIn = async () => {
  if (!isFirebaseEnabled) return null;
  
  try {
    const result = await getRedirectResult(auth);
    return result?.user || null;
  } catch (error) {
    throwReadableAuthError(error);
  }
};

export const logoutAuth = async () => {
  if (!isFirebaseEnabled) return;
  await signOut(auth);
};

export const subscribeToAuthState = (callback) => {
  if (!isFirebaseEnabled) {
    // Return a no-op unsubscribe function when Firebase is disabled
    callback(null);
    return () => {};
  }
  
  return onAuthStateChanged(auth, callback);
};
