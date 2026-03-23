import React, { useState } from "react";
import "./App.css";

function App() {

  // state for form inputs
  const [name, setName] = useState("");
  const [item, setItem] = useState("Pen");
  const [quantity, setQuantity] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  // price list (basic object)
  const prices = {
    Pen: 10,
    Pencil: 5,
    Notebook: 50,
    Eraser: 3
  };

  // calculate total price
  const total = prices[item] * quantity;

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // increase quantity
  const increaseQty = () => {
    setQuantity(quantity + 1);
  };

  // decrease quantity
  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // clear form
  const clearForm = () => {
    setName("");
    setItem("Pen");
    setQuantity(1);
    setSubmitted(false);
  };

  return (
    <div className="container">
      <h2>Stationery Order Form</h2>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Name:</label><br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Select Item:</label><br />
          <select
            value={item}
            onChange={(e) => setItem(e.target.value)}
          >
            <option value="Pen">Pen</option>
            <option value="Pencil">Pencil</option>
            <option value="Notebook">Notebook</option>
            <option value="Eraser">Eraser</option>
          </select>
        </div>

        <div>
          <label>Quantity:</label><br />
          <button type="button" onClick={decreaseQty}>-</button>
          <span style={{ margin: "0 10px" }}>{quantity}</span>
          <button type="button" onClick={increaseQty}>+</button>
        </div>

        <h4>Total Price: ₹{total}</h4>

        <button type="submit">Place Order</button>
        <button type="button" onClick={clearForm} style={{ marginLeft: "10px" }}>
          Clear
        </button>

      </form>

      {submitted && (
        <div className="summary">
          <h3>Order Summary</h3>
          <p>Name: {name}</p>
          <p>Item: {item}</p>
          <p>Quantity: {quantity}</p>
          <p>Total: ₹{total}</p>
        </div>
      )}
    </div>
  );
}

export default App;