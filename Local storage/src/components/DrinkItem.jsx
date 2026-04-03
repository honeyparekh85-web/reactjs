export default function DrinkItem({ drink, deleteDrink, editDrink }) {
  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(drink.price);

  const imageMap = {
    coffee: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=750&q=80",
    juice: "https://images.unsplash.com/photo-1571689933275-0e2b7240b8f1?auto=format&fit=crop&w=750&q=80",
    tea: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=750&q=80",
    smoothie: "https://images.unsplash.com/photo-1553909489-cd47e9adb3d6?auto=format&fit=crop&w=750&q=80",
    soda: "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?auto=format&fit=crop&w=750&q=80",
  };

  const imageUrl = imageMap[drink.category?.toLowerCase()] || "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=750&q=80";

  return (
    <article className="item-card">
      <img className="item-image" src={imageUrl} alt={`${drink.category} drink`} />
      <div className="item-details">
        <h3>{drink.name}</h3>
        <p className="item-category">{drink.category}</p>
        <p className="item-price">{formattedPrice}</p>
        <p className="item-quantity">Qty: {drink.quantity || 1}</p>
        <div className="actions">
          <button onClick={() => editDrink(drink)}>Edit</button>
          <button onClick={() => {
            if (window.confirm(`Delete "${drink.name}"?`)) {
              deleteDrink(drink.id);
            }
          }}>Delete</button>
        </div>
      </div>
    </article>
  );
}