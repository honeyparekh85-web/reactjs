
import { useState, useEffect } from "react";

export default function DrinkForm({ addOrUpdateDrink, editItem }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("coffee");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState(""); // "success" or "error"

  useEffect(() => {
    if (editItem) {
      setName(editItem.name);
      setCategory(editItem.category);
      setPrice(String(editItem.price));
      setQuantity(editItem.quantity || 1);
      setStatusMessage("Editing drink: " + editItem.name);
      setStatusType("info");
    } else {
      setStatusMessage("");
      setStatusType("");
    }
  }, [editItem]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const parsedPrice = Number(price);

    if (!trimmedName || !price) {
      setStatusMessage("Please provide both drink name and price.");
      setStatusType("error");
      return;
    }

    if (Number.isNaN(parsedPrice) || parsedPrice <= 0) {
      setStatusMessage("Price must be a positive number.");
      setStatusType("error");
      return;
    }

    addOrUpdateDrink({
      name: trimmedName,
      category,
      price: parsedPrice,
      quantity: quantity,
    });

    setName("");
    setCategory("coffee");
    setPrice("");
    setQuantity(1);
    setStatusMessage(editItem ? "Updated drink successfully!" : "Drink added successfully!");
    setStatusType("success");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        placeholder="Drink name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="coffee">Coffee</option>
        <option value="juice">Juice</option>
        <option value="tea">Tea</option>
        <option value="smoothie">Smoothie</option>
        <option value="soda">Soda</option>
      </select>

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <div className="quantity-input">
        <label>Quantity:</label>
        <div className="quantity-controls">
          <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
          />
          <button type="button" onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>
      </div>

      <button type="submit">
        {editItem ? "Update" : "Add"}
      </button>
      {statusMessage && <p className={`status ${statusType}`}>{statusMessage}</p>}
    </form>
  );
}