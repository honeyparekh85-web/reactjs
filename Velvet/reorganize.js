const fs = require('fs');
const path = require('path');

const basePath = '.';

// Define the file movements
const moves = [
  { from: 'src/store.js', to: 'src/app/store.js' },
  { from: 'src/cartSlice.js', to: 'src/features/cart/cartSlice.js' },
  { from: 'src/productsSlice.js', to: 'src/features/products/productsSlice.js' },
  { from: 'src/authSlice.js', to: 'src/features/auth/authSlice.js' },
  { from: 'src/wishlistSlice.js', to: 'src/features/wishlist/wishlistSlice.js' },
  { from: 'src/Home.jsx', to: 'src/pages/Home.jsx' },
  { from: 'src/Products.jsx', to: 'src/pages/Products.jsx' },
  { from: 'src/Cart.jsx', to: 'src/pages/Cart.jsx' },
  { from: 'src/Header.jsx', to: 'src/components/Header.jsx' },
  { from: 'src/Footer.jsx', to: 'src/components/Footer.jsx' },
];

// Create directories
const dirs = [
  'src/app',
  'src/features/cart',
  'src/features/products',
  'src/features/auth',
  'src/features/wishlist',
  'src/pages',
  'src/components'
];

dirs.forEach(dir => {
  const fullPath = path.join(basePath, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Move files
moves.forEach(move => {
  const fromPath = path.join(basePath, move.from);
  const toPath = path.join(basePath, move.to);

  if (fs.existsSync(fromPath)) {
    fs.renameSync(fromPath, toPath);
    console.log(`Moved: ${move.from} -> ${move.to}`);
  } else {
    console.log(`File not found: ${move.from}`);
  }
});

// Update imports in App.jsx
const appJsxPath = path.join(basePath, 'src/App.jsx');
let appContent = fs.readFileSync(appJsxPath, 'utf8');

appContent = appContent.replace("import { store } from './store.js';", "import { store } from './app/store.js';");
appContent = appContent.replace("import Header from './Header.jsx';", "import Header from './components/Header.jsx';");
appContent = appContent.replace("import Footer from './Footer.jsx';", "import Footer from './components/Footer.jsx';");
appContent = appContent.replace("import Home from './Home.jsx';", "import Home from './pages/Home.jsx';");
appContent = appContent.replace("import Products from './Products.jsx';", "import Products from './pages/Products.jsx';");
appContent = appContent.replace("import Cart from './Cart.jsx';", "import Cart from './pages/Cart.jsx';");

fs.writeFileSync(appJsxPath, appContent);
console.log('Updated imports in App.jsx');

// Update imports in store.js
const storeJsPath = path.join(basePath, 'src/app/store.js');
let storeContent = fs.readFileSync(storeJsPath, 'utf8');

storeContent = storeContent.replace("import cartReducer from '../features/cart/cartSlice';", "import cartReducer from '../features/cart/cartSlice';");
storeContent = storeContent.replace("import productsReducer from '../features/products/productsSlice';", "import productsReducer from '../features/products/productsSlice';");
storeContent = storeContent.replace("import authReducer from '../features/auth/authSlice';", "import authReducer from '../features/auth/authSlice';");
storeContent = storeContent.replace("import wishlistReducer from '../features/wishlist/wishlistSlice';", "import wishlistReducer from '../features/wishlist/wishlistSlice';");

fs.writeFileSync(storeJsPath, storeContent);
console.log('Verified imports in store.js');

console.log('\nProject structure organized successfully!');
