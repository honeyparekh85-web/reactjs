import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard.jsx';

function Products() {
  const { items, searchTerm } = useSelector((state) => state.products);
  const normalized = searchTerm.trim().toLowerCase();
  const filtered = normalized
    ? items.filter((product) => `${product.name} ${product.subtitle} ${product.size}`.toLowerCase().includes(normalized))
    : items;

  return (
    <main className="page-shell">
      <h1>Catalog</h1>
      <p>{normalized ? `Search results for “${searchTerm}”` : 'Discover every Velvet House fragrance.'}</p>
      <div className="products-grid catalog-grid">
        {filtered.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
      {filtered.length === 0 && <p className="empty-state">No perfumes found. Try amber, sea, forest, or sandal.</p>}
    </main>
  );
}

export default Products;

