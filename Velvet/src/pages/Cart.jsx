import { useSelector, useDispatch } from 'react-redux';
import { addToCart, decreaseQuantity, removeFromCart } from '../features/cart/cartSlice.js';

function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="page-shell">
      <h1>Your Bag</h1>
      {items.length === 0 ? <p className="empty-state">Your cart is empty.</p> : items.map((item) => (
        <div className="list-row" key={item.id}>
          <img src={item.image} alt={item.name} />
          <div><h3>{item.name}</h3><p>?{item.price}</p></div>
          <div className="qty-control"><button onClick={() => dispatch(decreaseQuantity(item.id))}>-</button><span>{item.quantity}</span><button onClick={() => dispatch(addToCart(item))}>+</button></div>
          <button className="plain-link" onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
        </div>
      ))}
      {items.length > 0 && <h2>Total: ?{total}</h2>}
    </main>
  );
}
export default Cart;


