const fs = require('fs');
const path = require('path');

// Create store.js
const appDir = path.join(__dirname, 'src', 'app');
if (!fs.existsSync(appDir)) fs.mkdirSync(appDir, { recursive: true });

fs.writeFileSync(path.join(appDir, 'store.js'), `import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import productsReducer from '../features/products/productsSlice';
import authReducer from '../features/auth/authSlice';
import wishlistReducer from '../features/wishlist/wishlistSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    auth: authReducer,
    wishlist: wishlistReducer,
  },
});
`);

// Create cart slice
const cartDir = path.join(__dirname, 'src', 'features', 'cart');
if (!fs.existsSync(cartDir)) fs.mkdirSync(cartDir, { recursive: true });

fs.writeFileSync(path.join(cartDir, 'cartSlice.js'), `import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    updateQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        state.totalPrice = state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
`);

// Create products slice
const productsDir = path.join(__dirname, 'src', 'features', 'products');
if (!fs.existsSync(productsDir)) fs.mkdirSync(productsDir, { recursive: true });

fs.writeFileSync(path.join(productsDir, 'productsSlice.js'), `import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setProducts, setLoading, setError } = productsSlice.actions;
export default productsSlice.reducer;
`);

// Create auth slice
const authDir = path.join(__dirname, 'src', 'features', 'auth');
if (!fs.existsSync(authDir)) fs.mkdirSync(authDir, { recursive: true });

fs.writeFileSync(path.join(authDir, 'authSlice.js'), `import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, logout, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
`);

// Create wishlist slice
const wishlistDir = path.join(__dirname, 'src', 'features', 'wishlist');
if (!fs.existsSync(wishlistDir)) fs.mkdirSync(wishlistDir, { recursive: true });

fs.writeFileSync(path.join(wishlistDir, 'wishlistSlice.js'), `import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (!item) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
`);

// Create pages
const pagesDir = path.join(__dirname, 'src', 'pages');
if (!fs.existsSync(pagesDir)) fs.mkdirSync(pagesDir, { recursive: true });

fs.writeFileSync(path.join(pagesDir, 'Home.jsx'), `import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Home = () => {
  return (
    <Container className="py-5">
      <Row>
        <Col md={12} className="text-center">
          <h1>Welcome to Velvet House</h1>
          <p className="lead">Luxury Fragrances for Your Lifestyle</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
`);

fs.writeFileSync(path.join(pagesDir, 'Products.jsx'), `import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Products = () => {
  return (
    <Container className="py-5">
      <Row>
        <Col md={12}>
          <h1>Our Products</h1>
          <p>Browse our exclusive collection of fragrances</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Products;
`);

fs.writeFileSync(path.join(pagesDir, 'Cart.jsx'), `import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Cart = () => {
  return (
    <Container className="py-5">
      <Row>
        <Col md={12}>
          <h1>Shopping Cart</h1>
          <p>Your items are here</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
`);

// Create components
const componentsDir = path.join(__dirname, 'src', 'components');
if (!fs.existsSync(componentsDir)) fs.mkdirSync(componentsDir, { recursive: true });

fs.writeFileSync(path.join(componentsDir, 'Header.jsx'), `import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

const Header = () => {
  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Velvet House
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/products">
              Products
            </Nav.Link>
            <Nav.Link as={Link} to="/cart">
              <FaShoppingCart /> Cart
            </Nav.Link>
            <Nav.Link href="#wishlist">
              <FaHeart /> Wishlist
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
`);

fs.writeFileSync(path.join(componentsDir, 'Footer.jsx'), `import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5 mt-5">
      <Container>
        <Row>
          <Col md={4} className="mb-4">
            <h5>About Us</h5>
            <p>Velvet House is your destination for luxury fragrances.</p>
          </Col>
          <Col md={4} className="mb-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#home" className="text-light">Home</a></li>
              <li><a href="#products" className="text-light">Products</a></li>
              <li><a href="#contact" className="text-light">Contact</a></li>
            </ul>
          </Col>
          <Col md={4} className="mb-4">
            <h5>Contact</h5>
            <p>Email: info@velvetehouse.com</p>
            <p>Phone: +1 (555) 123-4567</p>
          </Col>
        </Row>
        <Row className="text-center border-top pt-4">
          <Col>
            <p>&copy; 2024 Velvet House. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
`);

console.log('Project structure created successfully!');
