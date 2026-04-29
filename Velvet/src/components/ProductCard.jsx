import { useDispatch, useSelector } from 'react-redux';
import { FiHeart } from 'react-icons/fi';
import { addToCart, decreaseQuantity } from '../features/cart/cartSlice.js';
import { toggleWishlist } from '../features/wishlist/wishlistSlice.js';

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.cart.items.find((item) => item.id === product.id)?.quantity || 0);
  const liked = useSelector((state) => state.wishlist.items.some((item) => item.id === product.id));

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img src={product.image} alt={product.name} />
        <button className={`heart-btn ${liked ? 'active' : ''}`} onClick={() => dispatch(toggleWishlist(product))}><FiHeart /></button>
      </div>
      <h3>{product.name}</h3>
      <p>{product.subtitle}</p>
      <small>{product.size}</small>
      <div className="product-bottom">
        <strong>₹{product.price}</strong>
        <div className="qty-control">
          <button onClick={() => dispatch(decreaseQuantity(product.id))}>-</button>
          <span>{quantity}</span>
          <button onClick={() => dispatch(addToCart(product))}>+</button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;


