import { useState } from 'react';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const items = [
    { id: 1, name: 'Notebook', price: 50 },
    { id: 2, name: 'Pen', price: 20 },
    { id: 3, name: 'Pencil', price: 10 },
    { id: 4, name: 'Eraser', price: 5 }
  ];

  const addToCart = (item) => {
    const newItem = { ...item, quantity: quantity };
    setCart([...cart, newItem]);
    setQuantity(1);
  };

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value));
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="app">
      <header className="header">
        <h1>Stationery Shop</h1>
     
     
      </header>

      <div className="main">
        <div className="section">
          <h2>Products</h2>
          <div className="quantity-input">
            <label>Quantity: </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </div>
          <div className="items">
            {items.map((item) => (
              <div key={item.id} className="item">
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
                <button onClick={() => addToCart(item)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <h2>Cart ({cart.length} items)</h2>
          {cart.length > 0 ? (
            <div>
              <div className="cart-items">
                {cart.map((item, index) => (
                  <div key={index} className="cart-item">
                    <span>{item.name} (x{item.quantity})</span>
                    <span>₹{item.price * item.quantity}</span>
                    <button onClick={() => removeFromCart(index)}>
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div className="total">
                <strong>Total: ₹{total}</strong>
              </div>
              <button className="clear-btn" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          ) : (
            <p>Cart is empty</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
