import DrinkItem from "./DrinkItem.jsx";

export default function DrinkList({ drinks, deleteDrink, editDrink }) {
  if (!drinks.length) {
    return <p className="empty-list">No coffee items added yet. Add your first coffee!</p>;
  }

  return (
    <div>
      <h2 className="list-heading">Your coffees ({drinks.length})</h2>
      <div className="list">
        {drinks.map((drink) => (
          <DrinkItem
            key={drink.id}
            drink={drink}
            deleteDrink={deleteDrink}
            editDrink={editDrink}
          />
        ))}
      </div>
    </div>
  );
}