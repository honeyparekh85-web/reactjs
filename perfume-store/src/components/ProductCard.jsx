function ProductCard({ product, onToggleCart, onToggleWishlist, inCart, isWishlisted }) {
  const bottleStyle = {
    '--accent-start': product.colors[0],
    '--accent-end': product.colors[1],
  };

  return (
    <article className="product-card">
      <div className="product-card__visual" style={bottleStyle}>
        <span className="product-card__badge">{product.category}</span>
        <button
          type="button"
          className={`product-card__favorite ${isWishlisted ? 'is-active' : ''}`}
          onClick={() => onToggleWishlist(product.id)}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {isWishlisted ? 'Saved' : 'Save'}
        </button>
        <div className="perfume-bottle">
          <div className="perfume-bottle__cap" />
          <div className="perfume-bottle__glass" />
        </div>
      </div>

      <div className="product-card__content">
        <div className="product-card__meta">
          <p>{product.brand}</p>
          <span>Rated {product.rating}</span>
        </div>

        <h3>{product.name}</h3>
        <p className="product-card__description">{product.description}</p>

        <div className="product-card__details">
          <span>{product.gender}</span>
          <span>{product.family}</span>
          <span>{product.launchYear}</span>
        </div>

        <div className="product-card__notes">
          {product.notes.map((note) => (
            <span key={note}>{note}</span>
          ))}
        </div>

        <div className="product-card__footer">
          <div>
            <strong>${product.price}</strong>
            <p>{product.volume}</p>
          </div>
          <button type="button" onClick={() => onToggleCart(product)}>
            {inCart ? 'Remove' : 'Add to cart'}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
