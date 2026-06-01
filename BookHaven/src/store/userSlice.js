import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginWithEmailPassword, registerWithEmailPassword, loginWithGoogle as loginWithGoogleAuth, logoutAuth } from '../firebase/auth';
import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3001' });
const useFirebase = import.meta.env.VITE_USE_FIREBASE === 'true';

const normalizeUser = (user) => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName || user.email?.split('@')[0] || 'Reader',
  photoURL: user.photoURL || null,
});

const saveAuthUser = (userData) => {
  try {
    localStorage.setItem('auth-user', JSON.stringify(userData));
  } catch (error) {
    console.warn('Unable to persist auth user to localStorage:', error);
  }
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }, thunkAPI) => {
    try {
      if (useFirebase) {
        const user = await loginWithEmailPassword({ email, password });
        const userData = normalizeUser(user);
        saveAuthUser(userData);
        return userData;
      } else {
        const res = await api.get('/users?email=' + email);
        if (res.data.length > 0 && res.data[0].password === password) {
          const userData = { uid: res.data[0].id, email: res.data[0].email, displayName: res.data[0].name };
          saveAuthUser(userData);
          return userData;
        } else {
          throw new Error('Invalid email or password');
        }
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const signupUser = createAsyncThunk(
  'user/signupUser',
  async ({ name, email, password }, thunkAPI) => {
    try {
      if (useFirebase) {
        const user = await registerWithEmailPassword({ name, email, password });
        const userData = normalizeUser(user);
        saveAuthUser(userData);
        return userData;
      } else {
        const res = await api.post('/users', { name, email, password });
        const userData = { uid: res.data.id, email: res.data.email, displayName: res.data.name };
        saveAuthUser(userData);
        return userData;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const googleSignIn = createAsyncThunk('user/googleSignIn', async (_, thunkAPI) => {
  try {
    if (useFirebase) {
      const user = await loginWithGoogleAuth();
      if (!user) {
        return { redirecting: true };
      }
      const userData = normalizeUser(user);
      saveAuthUser(userData);
      return userData;
    } else {
      const mockEmail = 'demo.google@example.com';
      let res = await api.get('/users?email=' + mockEmail);
      let userData;
      if (res.data.length === 0) {
        res = await api.post('/users', { name: 'Google Demo User', email: mockEmail, password: 'google_mock_password' });
        userData = { uid: res.data.id, email: res.data.email, displayName: res.data.name };
      } else {
        userData = { uid: res.data[0].id, email: res.data[0].email, displayName: res.data[0].name };
      }
      saveAuthUser(userData);
      return userData;
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logoutUser = createAsyncThunk('user/logoutUser', async (_, thunkAPI) => {
  try {
    if (useFirebase) {
      await logoutAuth();
    }
    localStorage.removeItem('auth-user');
    return null;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: (() => {
      try {
        return JSON.parse(localStorage.getItem('auth-user'));
      } catch (error) {
        return null;
      }
    })(),
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(googleSignIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleSignIn.fulfilled, (state, action) => {
        if (action.payload?.redirecting) {
          state.loading = true;
          return;
        }
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(googleSignIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
      });
  },
});

export const { setUser, clearError } = userSlice.actions;
export default userSlice.reducer;
