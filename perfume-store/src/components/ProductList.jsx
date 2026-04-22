import ProductCard from './ProductCard';

function ProductList({ products, cartItems, wishlistItems, onToggleCart, onToggleWishlist }) {
  if (!products.length) {
    return (
      <div className="empty-state">
        <p className="section-tag">No results</p>
        <h3>No fragrance matches your search</h3>
        <p>Try another note, raise the price range, or clear one of the filters.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onToggleCart={onToggleCart}
          onToggleWishlist={onToggleWishlist}
          inCart={cartItems.includes(product.id)}
          isWishlisted={wishlistItems.includes(product.id)}
        />
      ))}
    </div>
  );
}

export default ProductList;
