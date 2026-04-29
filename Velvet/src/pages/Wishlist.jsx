import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard.jsx';

function Wishlist() {
  const items = useSelector((state) => state.wishlist.items);
  return (
    <main className="page-shell">
      <h1>Wishlist</h1>
      {items.length === 0 ? <p className="empty-state">No favorites yet.</p> : <div className="products-grid catalog-grid">{items.map((product) => <ProductCard key={product.id} product={product} />)}</div>}
    </main>
  );
}
export default Wishlist;

