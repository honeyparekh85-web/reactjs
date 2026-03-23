import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

export default function Navbar({ cart }) {
  return (
   
    <nav className="nav">
      <h2 className="logo">LeafyCart 🌿</h2>

      <ul className="menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/product/1">Shop</Link></li>
        <li><Link to="/reviews">Reviews</Link></li>
      </ul>

      <div className="cart-icon">
        <FontAwesomeIcon icon={faCartShopping} /> {cart.length}
      </div>
    </nav>
  );
}
