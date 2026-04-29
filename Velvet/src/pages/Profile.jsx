import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOut } from '../features/auth/authSlice.js';

function Profile() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <main className="page-shell"><h1>Please sign in</h1><Link className="solid-btn" to="/login">Go to sign in</Link></main>;
  }

  return (
    <main className="page-shell profile-page">
      <div className="profile-avatar">{user.firstName[0]}</div>
      <h1>Hello, {user.firstName}</h1>
      <p>{user.email}</p>
      <button className="solid-btn" onClick={() => dispatch(signOut())}>Sign out</button>
    </main>
  );
}

export default Profile;

