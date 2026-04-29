import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiHeart, FiSearch, FiShoppingBag, FiUser, FiLogOut } from 'react-icons/fi';
import { setSearchTerm } from '../features/products/productsSlice.js';
import { signOut } from '../features/auth/authSlice.js';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchTerm } = useSelector((state) => state.products);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const cartCount = useSelector((state) => state.cart.items.reduce((total, item) => total + item.quantity, 0));
  const wishCount = useSelector((state) => state.wishlist.items.length);

  const handleSearch = (event) => {
    dispatch(setSearchTerm(event.target.value));
    if (event.target.value.trim()) navigate('/products');
  };

  return (
    <header className="site-header">
      <Link className="logo" to="/">VH</Link>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Catalog</Link>
        <a href="#bestsellers">Bestsellers</a>
        <a href="#promo">Sale</a>
      </nav>
      <div className="header-actions">
        <label className="search-box" aria-label="Search products">
          <FiSearch />
          <input value={searchTerm} onChange={handleSearch} placeholder="Search scent..." />
        </label>
        <Link className="icon-link" to="/wishlist"><FiHeart /><span>{wishCount}</span></Link>
        <Link className="icon-link" to="/cart"><FiShoppingBag /><span>{cartCount}</span></Link>
        {isAuthenticated ? (
          <>
            <Link className="profile-pill" to="/profile"><FiUser />{user.firstName}</Link>
            <button className="plain-icon" onClick={() => dispatch(signOut())}><FiLogOut /></button>
          </>
        ) : (
          <Link className="profile-pill" to="/login"><FiUser />Sign in</Link>
        )}
      </div>
    </header>
  );
}

export default Header;

