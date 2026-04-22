import { useMemo, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import FilterSidebar from '../components/FilterSidebar';
import SortDropdown from '../components/SortDropdown';
import ProductList from '../components/ProductList';
import { filterOptions, perfumes } from '../data/perfumes';
import { useFilter } from '../hooks/useFilter';

function Home() {
  const searchInputRef = useRef(null);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterMessage, setNewsletterMessage] = useState('');

  const {
    filters,
    filteredProducts,
    resultsCount,
    activeFilters,
    activeFilterCount,
    updateFilter,
    resetFilters,
  } = useFilter(perfumes);

  const featuredProducts = perfumes.filter((item) => item.featured).slice(0, 3);
  const newArrivals = useMemo(
    () => [...perfumes].sort((a, b) => b.launchYear - a.launchYear).slice(0, 4),
    []
  );

  const handleFocusSearch = () => {
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => searchInputRef.current?.focus(), 250);
  };

  const handleToggleCart = (product) => {
    setCartItems((prev) =>
      prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    );
  };

  const handleToggleWishlist = (productId) => {
    setWishlistItems((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const handleNewsletterSubmit = (event) => {
    event.preventDefault();
    if (!newsletterEmail.trim()) {
      setNewsletterMessage('Please enter your email first.');
      return;
    }

    setNewsletterMessage(`Thanks! ${newsletterEmail} is now subscribed.`);
    setNewsletterEmail('');
  };

  return (
    <main className="page-shell" id="home">
      <div className="page-glow page-glow--left" />
      <div className="page-glow page-glow--right" />

      <Navbar
        cartCount={cartItems.length}
        wishlistCount={wishlistItems.length}
        onSearchClick={handleFocusSearch}
      />

      <section className="hero">
        <div className="hero__content">
          <p className="section-tag">Women's Dress Store</p>
          <h1>Perfume Collection</h1>
          <p className="hero__copy">
            Discover modern signature scents crafted with floral softness, amber warmth, and
            couture-inspired elegance.
          </p>

          <div className="hero__actions">
            <button type="button" className="button button--primary" onClick={handleFocusSearch}>
              Shop now
            </button>
            <a href="#featured" className="button button--ghost">
              New collection
            </a>
          </div>

          <div className="hero__stats">
            <div>
              <strong>12+</strong>
              <span>Luxury scents</span>
            </div>
            <div>
              <strong>4.8</strong>
              <span>Average rating</span>
            </div>
            <div>
              <strong>24h</strong>
              <span>Fast delivery</span>
            </div>
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="hero-card hero-card--large">
            <div className="hero-bottle hero-bottle--round" />
          </div>
          <div className="hero-card hero-card--tall">
            <div className="hero-bottle hero-bottle--tall" />
          </div>
          <div className="hero__dot" />
        </div>
      </section>

      <section className="featured-strip" id="featured">
        {featuredProducts.map((item) => (
          <article key={item.id} className="featured-strip__card">
            <div
              className="featured-strip__visual"
              style={{ '--accent-start': item.colors[0], '--accent-end': item.colors[1] }}
            >
              <div className="perfume-bottle perfume-bottle--mini">
                <div className="perfume-bottle__cap" />
                <div className="perfume-bottle__glass" />
              </div>
            </div>
            <div>
              <p>{item.brand}</p>
              <h3>{item.name}</h3>
              <span>${item.price}</span>
            </div>
          </article>
        ))}
      </section>

      <section className="collections" id="collections">
        <div className="collections__intro">
          <div>
            <p className="section-tag">Collections</p>
            <h2>Shop by mood and moment</h2>
          </div>
          <p>
            Explore polished day scents, warm night perfumes, and signature gifts curated for every
            season.
          </p>
        </div>

        <div className="collections__grid">
          <article className="collection-card collection-card--warm">
            <p>Day Edit</p>
            <h3>Fresh florals for everyday luxury</h3>
            <button type="button" className="button button--ghost" onClick={handleFocusSearch}>
              Browse now
            </button>
          </article>
          <article className="collection-card collection-card--dark">
            <p>Evening Edit</p>
            <h3>Amber, oud, and velvet spice for after dark</h3>
            <button type="button" className="button button--ghost" onClick={handleFocusSearch}>
              Discover more
            </button>
          </article>
        </div>
      </section>

      <section className="catalog" id="catalog">
        <div className="catalog__intro">
          <div>
            <p className="section-tag">New collection</p>
            <h2>Curated fragrance boutique</h2>
          </div>
          <p>
            Search by scent note, filter by family or category, and sort to find the perfume that
            fits your mood.
          </p>
        </div>

        <div className="catalog__toolbar">
          <SearchBar
            value={filters.search}
            onChange={(value) => updateFilter('search', value)}
            onClear={() => updateFilter('search', '')}
            inputRef={searchInputRef}
          />
          <div className="catalog__toolbar-right">
            <span className="results-pill">{resultsCount} products found</span>
            <SortDropdown
              value={filters.sortBy}
              options={filterOptions.sortOptions}
              onChange={(value) => updateFilter('sortBy', value)}
            />
          </div>
        </div>

        {activeFilterCount ? (
          <div className="active-filters">
            {activeFilters.map((filter) => (
              <span key={filter.key} className="active-filters__pill">
                {filter.label}
              </span>
            ))}
            <button type="button" className="active-filters__clear" onClick={resetFilters}>
              Clear all
            </button>
          </div>
        ) : null}

        <div className="catalog__layout">
          <FilterSidebar
            filters={filters}
            options={filterOptions}
            onChange={updateFilter}
            onReset={resetFilters}
          />
          <ProductList
            products={filteredProducts}
            cartItems={cartItems}
            wishlistItems={wishlistItems}
            onToggleCart={handleToggleCart}
            onToggleWishlist={handleToggleWishlist}
          />
        </div>
      </section>

      <section className="arrivals">
        <div className="catalog__intro">
          <div>
            <p className="section-tag">Latest drops</p>
            <h2>New arrivals this season</h2>
          </div>
          <p>Fresh launches with elevated notes, soft projection, and memorable dry-downs.</p>
        </div>

        <div className="arrivals__grid">
          {newArrivals.map((item) => (
            <article key={item.id} className="arrival-card">
              <div
                className="arrival-card__visual"
                style={{ '--accent-start': item.colors[0], '--accent-end': item.colors[1] }}
              >
                <div className="perfume-bottle perfume-bottle--mini">
                  <div className="perfume-bottle__cap" />
                  <div className="perfume-bottle__glass" />
                </div>
              </div>
              <h3>{item.name}</h3>
              <p>
                {item.brand} · {item.family}
              </p>
              <button type="button" className="button button--ghost" onClick={() => handleToggleCart(item)}>
                {cartItems.includes(item.id) ? 'Remove from bag' : 'Quick add'}
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="story-banner" id="about">
        <div>
          <p className="section-tag">Body spray collection</p>
          <h2>Layer your fragrance wardrobe</h2>
          <p>
            Build a scent ritual with radiant mists, evening perfumes, and fresh everyday colognes.
          </p>
        </div>
        <a href="#catalog" className="button button--primary">
          Explore the store
        </a>
      </section>

      <section className="newsletter">
        <div>
          <p className="section-tag">Stay in the loop</p>
          <h2>Get launches, offers, and scent styling notes</h2>
          <p>Join the list for exclusive drops and fragrance recommendations.</p>
        </div>

        <form className="newsletter__form" onSubmit={handleNewsletterSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={newsletterEmail}
            onChange={(event) => setNewsletterEmail(event.target.value)}
          />
          <button type="submit" className="button button--primary">
            Subscribe
          </button>
        </form>

        {newsletterMessage ? <p className="newsletter__message">{newsletterMessage}</p> : null}
      </section>
    </main>
  );
}

export default Home;
