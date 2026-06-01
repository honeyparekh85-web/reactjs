import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginUser, signupUser, clearError, googleSignIn } from '../../store/userSlice';
import { getPreferredAppUrl, isEmbeddedBrowser, isFirebaseAuthHostAllowed } from '../../utils/authEnvironment';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading, error } = useSelector((state) => state.user);
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  useEffect(() => {
    return () => dispatch(clearError());
  }, [dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSignUp) {
      dispatch(signupUser(form));
    } else {
      dispatch(loginUser(form));
    }
  };

  const handleGoogleSignIn = () => {
    dispatch(googleSignIn());
  };

  const isRedirecting = loading && !error;
  const authHostAllowed = isFirebaseAuthHostAllowed();
  const embeddedBrowser = isEmbeddedBrowser();
  const showGoogleHelp = !authHostAllowed || embeddedBrowser;

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center py-12">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-[2rem] p-8 border border-book-beige/40">
        {showGoogleHelp && (
          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            <p className="font-semibold mb-1">Google sign-in needs a normal browser</p>
            <p className="mb-2">
              {embeddedBrowser
                ? 'Cursor preview browser blocks Google auth. Open this app in Chrome or Edge instead.'
                : `This domain (${window.location.hostname}) is not authorized for Firebase Auth.`}
            </p>
            <a
              href={getPreferredAppUrl()}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-book-terracotta underline"
            >
              Open http://localhost:5173/login
            </a>
          </div>
        )}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-playfair font-bold text-book-mocha mb-2">{isSignUp ? 'Create an Account' : 'Welcome Back'}</h1>
          <p className="text-sm text-book-mocha/60">{isSignUp ? 'Join BookHaven and save your reading moments.' : 'Sign in to continue your cozy reading journey.'}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <label className="block text-book-mocha/80 text-sm">
              <span>Name</span>
              <input
                required
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="mt-2 w-full rounded-3xl border border-book-beige/70 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-book-terracotta"
              />
            </label>
          )}
          <label className="block text-book-mocha/80 text-sm">
            <span>Email</span>
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-2 w-full rounded-3xl border border-book-beige/70 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-book-terracotta"
            />
          </label>
          <label className="block text-book-mocha/80 text-sm">
            <span>Password</span>
            <input
              required
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="mt-2 w-full rounded-3xl border border-book-beige/70 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-book-terracotta"
            />
          </label>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-3xl bg-book-terracotta px-5 py-3 text-white font-semibold transition hover:bg-book-orange"
          >
            {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full rounded-3xl border border-book-beige px-5 py-3 text-book-mocha font-semibold transition hover:bg-book-beige disabled:opacity-60"
          >
            {isRedirecting ? 'Opening Google sign-in...' : 'Continue with Google'}
          </button>
        </div>
        <div className="mt-6 text-center text-sm text-book-mocha/70">
          <button
            type="button"
            onClick={() => setIsSignUp((prev) => !prev)}
            className="font-semibold text-book-terracotta hover:text-book-orange"
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
