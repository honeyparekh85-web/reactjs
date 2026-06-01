const AUTHORIZED_HOSTS = new Set(['localhost', '127.0.0.1']);

export const isFirebaseAuthHostAllowed = () => {
  if (typeof window === 'undefined') return true;
  return AUTHORIZED_HOSTS.has(window.location.hostname);
};

export const isEmbeddedBrowser = () => {
  if (typeof window === 'undefined') return false;
  return window.self !== window.top || navigator.userAgent.toLowerCase().includes('cursor');
};

export const getPreferredAppUrl = () => 'http://localhost:5173/login';

export const shouldPreferGoogleRedirect = () => (
  !isFirebaseAuthHostAllowed() || isEmbeddedBrowser()
);
