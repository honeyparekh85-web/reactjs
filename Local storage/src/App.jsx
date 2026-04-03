import { useState, useEffect, useMemo } from "react";
import DrinkForm from "./components/DrinkForm.jsx";
import DrinkList from "./components/DrinkList.jsx";

export default function App() {
  const [drinks, setDrinks] = useState([]);
  const [editItem, setEditItem] = useState(null);

  // Load from localStorage on startup
  useEffect(() => {
    try {
      const raw = localStorage.getItem("drinks");
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) setDrinks(parsed);
    } catch (error) {
      console.warn("Error reading from localStorage:", error);
      localStorage.removeItem("drinks");
    }
  }, []);

  // Save to localStorage whenever drinks change
  useEffect(() => {
    localStorage.setItem("drinks", JSON.stringify(drinks));
  }, [drinks]);

  const totalValue = useMemo(
    () => drinks.reduce((sum, d) => sum + (Number(d.price) || 0) * (Number(d.quantity) || 1), 0),
    [drinks]
  );

  const addOrUpdateDrink = (drink) => {
    const normalizedDrink = {
      ...drink,
      name: drink.name.trim(),
      category: drink.category.trim(),
      price: Number(drink.price),
      quantity: Number(drink.quantity) || 1,
    };

    if (editItem) {
      setDrinks((current) =>
        current.map((item) =>
          item.id === editItem.id ? { ...item, ...normalizedDrink, id: editItem.id } : item
        )
      );
      setEditItem(null);
    } else {
      setDrinks((current) => [{ ...normalizedDrink, id: Date.now() }, ...current]);
    }
  };

  const deleteDrink = (id) => setDrinks((current) => current.filter((drink) => drink.id !== id));

  const handleEdit = (drink) => setEditItem(drink);

  const clearAll = () => {
    if (!drinks.length) return;
    if (!window.confirm("Clear all drinks? This cannot be undone.")) return;

    setDrinks([]);
    setEditItem(null);
    localStorage.removeItem("drinks");
  };

  return (
    <div className="site">
      <main className="main-card">
        <header className="hero">
          <div className="hero-content">
            <h1>Coffee Shop Manager</h1>
            <p>Manage your coffee inventory with ease</p>
          </div>
        </header>

        <section className="summary">
          <h2>Coffee Inventory</h2>
          <div className="stat-row">
            <span>Drinks: <strong>{drinks.length}</strong></span>
            <span>Total: <strong>₹{totalValue.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</strong></span>
            <button className="secondary" onClick={clearAll} disabled={!drinks.length}>Clear All</button>
          </div>
        </section>

        <section className="panels">
          <aside className="form-card">
            <h3>Add Coffee Item</h3>
            <DrinkForm addOrUpdateDrink={addOrUpdateDrink} editItem={editItem} />
          </aside>

          <aside className="list-card">
            <h3>Coffee Menu</h3>
            <DrinkList drinks={drinks} deleteDrink={deleteDrink} editDrink={handleEdit} />
          </aside>
        </section>
      </main>
    </div>
  );
}