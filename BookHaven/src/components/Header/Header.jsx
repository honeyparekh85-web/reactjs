import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Book, Bookmark, Quote, BarChart2, User, Search, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

const Header = () => {
  const location = useLocation();
  const totalQty = useSelector(state => state.cart.totalQty);
  const { user } = useSelector(state => state.user);

  // Profile display helpers
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'User';
  const firstName = displayName.split(' ')[0];
  const firstLetter = displayName[0]?.toUpperCase() || 'U';

  const navItems = [
    { name: 'Books', path: '/books', icon: Book },
    { name: 'Shelf', path: '/bookshelf', icon: Bookmark },
    { name: 'Journal', path: '/journal', icon: Search },
    { name: 'Quotes', path: '/quotes', icon: Quote },
    { name: 'Stats', path: '/stats', icon: BarChart2 },
  ];

  return (
    <header className="sticky top-0 z-50 bg-book-cream/80 backdrop-blur-md border-b border-book-beige/50">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: -10 }}
            className="w-10 h-10 bg-book-mocha rounded-xl flex items-center justify-center text-white"
          >
            <Book size={24} />
          </motion.div>
          <span className="text-2xl font-playfair font-bold text-book-mocha tracking-tight">BookHaven</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-book-orange ${
                  isActive ? 'text-book-terracotta' : 'text-book-mocha/70'
                }`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative w-10 h-10 rounded-full bg-book-beige flex items-center justify-center text-book-mocha hover:bg-book-orange/20 transition-all">
            <ShoppingCart size={20} />
            {totalQty > 0 && (
              <span className="absolute -top-1 -right-1 bg-book-terracotta text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {totalQty}
              </span>
            )}
          </Link>
          {user ? (
            <Link to="/profile" className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-book-orange/15 transition-all">
              <div className="w-8 h-8 rounded-full bg-book-terracotta text-white flex items-center justify-center font-bold text-sm font-poppins">
                {firstLetter}
              </div>
              <span className="hidden sm:inline-block text-sm font-semibold text-book-mocha font-poppins max-w-[120px] truncate">
                {firstName}
              </span>
            </Link>
          ) : (
            <Link to="/login" className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-book-orange/15 transition-all">
              <div className="w-8 h-8 rounded-full bg-book-beige text-book-mocha flex items-center justify-center">
                <User size={16} />
              </div>
              <span className="hidden sm:inline-block text-sm font-semibold text-book-mocha font-poppins">
                Sign In
              </span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
