import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard.jsx';
import heroBottle from '../assets/velvet-hero-perfume.png';
import floralBottle from '../assets/velvet-floral-bottle.png';

function Home() {
  const products = useSelector((state) => state.products.items);

  return (
    <main>
      <section className="hero-section">
        <div className="hero-portrait">
          <img src={heroBottle} alt="Luxury perfume editorial" />
        </div>
        <div className="hero-copy">
          <p className="eyebrow">Natural perfume house</p>
          <h1>SCENT<br />OF EARTH</h1>
          <p className="hero-text">Perfumes created by nature, not a laboratory. Feel the strength of flowers, wood and warm amber captured in glass.</p>
          <a className="outline-btn" href="#bestsellers">Explore more</a>
        </div>
        <div className="hero-side">
          <div className="flower-branch"></div>
          <img src={floralBottle} alt="Velvet House perfume bottle" />
        </div>
      </section>

      <section className="bestsellers" id="bestsellers">
        <h2>Bestsellers</h2>
        <div className="products-grid">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
        <a className="outline-btn center" href="#promo">More details</a>
      </section>

      <section className="promo-section" id="promo">
        <div>
          <p className="promo-small">With autumn nature falling asleep, its aromas become deeper and richer.</p>
          <h2>“Warm Amber” — vanilla, incense and cinnamon for your cozy escape.</h2>
          <button className="outline-btn light">Find your autumn scent</button>
        </div>
        <strong>SALE 10%</strong>
      </section>
    </main>
  );
}

export default Home;

