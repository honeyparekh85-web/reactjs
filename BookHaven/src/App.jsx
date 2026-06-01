import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home/Home';
import Books from './pages/Books/Books';
import BookDetails from './pages/BookDetails/BookDetails';
import Bookshelf from './pages/Bookshelf/Bookshelf';
import Journal from './pages/Journal/Journal';
import Quotes from './pages/Quotes/Quotes';
import Stats from './pages/Stats/Stats';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import AdminBooks from './pages/admin/AdminBooks';
import ProtectedRoute from './components/ProtectedRoute';

import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/bookshelf" element={<Bookshelf />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/quotes" element={<Quotes />} />
        <Route path="/stats" element={<Stats />} />

        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin>
              <AdminBooks />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
