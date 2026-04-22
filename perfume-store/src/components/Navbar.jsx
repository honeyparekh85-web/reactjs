function Navbar({ cartCount, wishlistCount, onSearchClick }) {
  return (
    <header className="navbar">
      <div>
        <p className="navbar__eyebrow">Luxury fragrance house</p>
        <a href="#home" className="navbar__brand">
          sign
        </a>
      </div>

      <nav className="navbar__links" aria-label="Main navigation">
        <a href="#collections">Collections</a>
        <a href="#catalog">Shop</a>
        <a href="#featured">Featured</a>
        <a href="#about">Story</a>
      </nav>

      <div className="navbar__actions">
        <button type="button" className="navbar__icon" aria-label="Focus search" onClick={onSearchClick}>
          Search
        </button>
        <div className="navbar__pill" aria-label={`Wishlist items: ${wishlistCount}`}>
          Wishlist <strong>{wishlistCount}</strong>
        </div>
        <div className="navbar__pill navbar__pill--accent" aria-label={`Cart items: ${cartCount}`}>
          Bag <strong>{cartCount}</strong>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
