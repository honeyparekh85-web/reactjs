import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard.jsx';

function ProductDetail() {
  const { id } = useParams();
  const product = useSelector((state) => state.products.items.find((item) => item.id === Number(id)));
  if (!product) return <main className="page-shell"><h1>Product not found</h1><Link to="/products">Back to catalog</Link></main>;
  return <main className="page-shell"><ProductCard product={product} /></main>;
}
export default ProductDetail;

