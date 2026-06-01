import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { subscribeToAuthState, completeGoogleRedirectSignIn } from '../firebase/auth';
import { createOrUpdateUserProfile } from '../firebase/firestoreService';
import { setUser } from '../store/userSlice';

const useFirebaseAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (import.meta.env.VITE_USE_FIREBASE !== 'true') {
      return;
    }

    let active = true;

    const handleAuthState = async (user) => {
      if (!active) return;

      if (user) {
        const normalizedDisplayName = user.displayName || user.email?.split('@')[0] || 'Reader';

        try {
          const profile = await createOrUpdateUserProfile({
            uid: user.uid,
            email: user.email,
            displayName: normalizedDisplayName,
            photoURL: user.photoURL,
          });

          const normalizedUser = {
            uid: user.uid,
            email: profile.email || user.email,
            displayName: profile.displayName || normalizedDisplayName,
            photoURL: profile.photoURL || user.photoURL || null,
            role: profile.role || 'user',
          };
          localStorage.setItem('auth-user', JSON.stringify(normalizedUser));
          dispatch(setUser(normalizedUser));
        } catch (error) {
          console.error('Failed to sync Firebase profile:', error);
          const fallbackUser = {
            uid: user.uid,
            email: user.email,
            displayName: normalizedDisplayName,
            photoURL: user.photoURL || null,
            role: 'user',
          };
          localStorage.setItem('auth-user', JSON.stringify(fallbackUser));
          dispatch(setUser(fallbackUser));
        }
      } else {
        localStorage.removeItem('auth-user');
        dispatch(setUser(null));
      }
    };

    completeGoogleRedirectSignIn().catch((error) => {
      console.error('Google redirect sign-in failed:', error);
    });

    const unsubscribe = subscribeToAuthState(handleAuthState);
    return () => {
      active = false;
      unsubscribe();
    };
  }, [dispatch]);
};

export default useFirebaseAuth;
