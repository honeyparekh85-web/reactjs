import { createSlice } from '@reduxjs/toolkit';

const savedUser = JSON.parse(localStorage.getItem('velvetUser') || 'null');

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: savedUser, isAuthenticated: Boolean(savedUser) },
  reducers: {
    signIn: (state, action) => {
      const fullName = action.payload.fullName?.trim() || 'Velvet Guest';
      const firstName = fullName.split(' ')[0];
      state.user = { fullName, firstName, email: action.payload.email };
      state.isAuthenticated = true;
      localStorage.setItem('velvetUser', JSON.stringify(state.user));
    },
    signOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('velvetUser');
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;

