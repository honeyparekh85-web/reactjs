import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../features/auth/authSlice.js';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: '', email: '' });

  const submit = (event) => {
    event.preventDefault();
    dispatch(signIn(form));
    navigate('/profile');
  };

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <p className="eyebrow">Welcome back</p>
        <h1>Sign in</h1>
        <input required placeholder="Full name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
        <input required type="email" placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <button className="solid-btn" type="submit">Sign in</button>
      </form>
    </main>
  );
}

export default Login;

