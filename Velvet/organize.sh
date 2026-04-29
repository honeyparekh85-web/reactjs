#!/bin/bash

# This script organizes the project files into the proper folder structure
# Run this after npm install completes

echo "🚀 Organizing Velvet House project structure..."

# Create directories
mkdir -p src/app
mkdir -p src/features/cart
mkdir -p src/features/products
mkdir -p src/features/auth
mkdir -p src/features/wishlist
mkdir -p src/pages
mkdir -p src/components

# Move Redux store
mv src/store.js src/app/store.js 2>/dev/null

# Move Redux slices
mv src/cartSlice.js src/features/cart/cartSlice.js 2>/dev/null
mv src/productsSlice.js src/features/products/productsSlice.js 2>/dev/null
mv src/authSlice.js src/features/auth/authSlice.js 2>/dev/null
mv src/wishlistSlice.js src/features/wishlist/wishlistSlice.js 2>/dev/null

# Move page components
mv src/Home.jsx src/pages/Home.jsx 2>/dev/null
mv src/Products.jsx src/pages/Products.jsx 2>/dev/null
mv src/Cart.jsx src/pages/Cart.jsx 2>/dev/null

# Move layout components
mv src/Header.jsx src/components/Header.jsx 2>/dev/null
mv src/Footer.jsx src/components/Footer.jsx 2>/dev/null

echo "✅ Files organized!"

# Update imports in App.jsx
sed -i "s|import { store } from './store.js'|import { store } from './app/store.js'|g" src/App.jsx
sed -i "s|import Header from './Header.jsx'|import Header from './components/Header.jsx'|g" src/App.jsx
sed -i "s|import Footer from './Footer.jsx'|import Footer from './components/Footer.jsx'|g" src/App.jsx
sed -i "s|import Home from './Home.jsx'|import Home from './pages/Home.jsx'|g" src/App.jsx
sed -i "s|import Products from './Products.jsx'|import Products from './pages/Products.jsx'|g" src/App.jsx
sed -i "s|import Cart from './Cart.jsx'|import Cart from './pages/Cart.jsx'|g" src/App.jsx

echo "✅ App.jsx imports updated!"
echo ""
echo "🎉 Project setup complete! Run: npm run dev"
