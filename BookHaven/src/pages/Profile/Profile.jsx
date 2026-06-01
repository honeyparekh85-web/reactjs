import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../store/userSlice';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LogOut,
  User,
  Mail,
  Shield,
  Clipboard,
  Check,
  BookOpen,
  Quote,
  ShoppingBag,
  ArrowRight,
  Bookmark,
  Sparkles,
  Award
} from 'lucide-react';
import ImageWithFallback from '../../components/ImageWithFallback';

const Profile = () => {
  const dispatch = useDispatch();
  const [copied, setCopied] = useState(false);
  
  // Select state from redux store
  const { user, loading } = useSelector((state) => state.user);
  const shelfBooks = useSelector((state) => state.shelf.books) || [];
  const savedQuotesCount = useSelector((state) => state.quotes.items?.length) || 0;
  const cartQty = useSelector((state) => state.cart.totalQty) || 0;

  // Calculate bookshelf subsets
  const readingCount = shelfBooks.filter(b => b.status === 'reading').length;
  const completedCount = shelfBooks.filter(b => b.status === 'completed').length;
  const wishlistCount = shelfBooks.filter(b => b.status === 'wishlist').length;

  const handleCopyUid = () => {
    if (user?.uid) {
      navigator.clipboard.writeText(user.uid);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'rwgn1.jayanti.rt@gmail.com';
  const isAdmin = user && (user.email === ADMIN_EMAIL || user.role === 'admin');

  // Handle case where user is not logged in
  if (!user) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-6 bg-book-cream/30">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl w-full bg-white rounded-3xl p-10 shadow-cozy border border-book-beige/40 text-center"
        >
          <div className="w-20 h-20 bg-book-beige/60 rounded-full flex items-center justify-center mx-auto mb-6 text-book-mocha">
            <User size={40} />
          </div>
          <h2 className="text-3xl font-playfair font-black text-book-mocha mb-4">Your BookHaven Profile</h2>
          <p className="text-book-mocha/70 leading-relaxed mb-8">
            Access your personalized digital sanctuary. Save your favorite quotes, monitor your reading progression, and build your literary universe.
          </p>
          <div className="rounded-2xl bg-book-cream border border-book-beige p-6 mb-8 text-left">
            <p className="text-xs font-bold text-book-mocha/50 uppercase tracking-widest mb-1">Preferred authentication email</p>
            <p className="text-lg font-semibold text-book-mocha font-poppins">{ADMIN_EMAIL}</p>
          </div>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-full bg-book-terracotta px-8 py-4 text-white font-semibold shadow-md hover:bg-book-orange transition-all duration-300 transform active:scale-95 hover:shadow-lg"
          >
            Start Your Journey <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    );
  }

  // Generate a beautiful initials avatar or use user photoURL
  const displayName = user.displayName || user.email?.split('@')[0] || 'Cozy Reader';
  const userInitials = displayName
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="container mx-auto py-12 px-6 max-w-6xl">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-8"
      >
        {/* Profile Card Header */}
        <motion.div
          variants={itemVariants}
          className="relative overflow-hidden bg-gradient-to-r from-book-beige/70 via-book-cream to-white rounded-[2.5rem] p-8 md:p-10 shadow-cozy border border-book-beige/60 flex flex-col md:flex-row items-center gap-8"
        >
          {/* Decorative background blurs */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-book-orange/15 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-book-terracotta/10 rounded-full blur-3xl" />

          {/* Avatar Area */}
          <div className="relative group">
            {user.photoURL ? (
              <ImageWithFallback
                src={user.photoURL}
                alt={displayName}
                className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white shadow-md object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white shadow-md bg-gradient-to-br from-book-terracotta to-book-orange flex items-center justify-center text-white text-3xl md:text-4xl font-playfair font-black tracking-wider transition-transform duration-300 group-hover:scale-105">
                {userInitials}
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 bg-white p-2 rounded-full shadow border border-book-beige/50">
              <Sparkles size={16} className="text-book-orange animate-pulse" />
            </div>
          </div>

          {/* User Meta Information */}
          <div className="flex-1 text-center md:text-left space-y-3">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <h1 className="text-3xl md:text-4xl font-playfair font-black text-book-mocha">
                Welcome back, {displayName}
              </h1>
              {isAdmin ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-book-terracotta/15 text-book-terracotta border border-book-terracotta/25 uppercase tracking-wider font-poppins">
                  <Shield size={12} /> Administrator
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-book-olive/15 text-book-olive border border-book-olive/25 uppercase tracking-wider font-poppins">
                  <Award size={12} /> Cozy Reader
                </span>
              )}
            </div>
            
            <p className="text-book-mocha/70 text-sm md:text-base leading-relaxed max-w-xl font-dm-sans">
              Welcome to your cozy dashboard. Manage your reading shelves, review saved quotes, and track your literary journey.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-2 text-sm text-book-mocha/65 font-poppins">
              <span className="flex items-center gap-2">
                <Mail size={16} className="text-book-orange" />
                {user.email}
              </span>
              <span className="hidden sm:inline text-book-beige">•</span>
              <span className="flex items-center gap-2 bg-book-cream px-3 py-1 rounded-full border border-book-beige/40">
                <span className="font-semibold text-xs text-book-mocha/40">UID:</span>
                <span className="font-mono text-xs max-w-[120px] truncate">{user.uid}</span>
                <button
                  onClick={handleCopyUid}
                  className="text-book-mocha/45 hover:text-book-mocha hover:scale-105 active:scale-95 transition-all"
                  title="Copy UID to clipboard"
                >
                  {copied ? <Check size={14} className="text-green-600" /> : <Clipboard size={14} />}
                </button>
              </span>
            </div>
          </div>
        </motion.div>

        {/* Dashboard Statistics Cards Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Bookshelf Card */}
          <div className="bg-white rounded-3xl p-6 shadow-cozy border border-book-beige/40 flex flex-col justify-between hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-book-beige/65 rounded-2xl text-book-mocha">
                <BookOpen size={24} />
              </div>
              <span className="text-3xl font-playfair font-black text-book-mocha">
                {shelfBooks.length}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-book-mocha mb-3">Your Bookshelf</h3>
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-poppins text-book-mocha/70">
                <div className="bg-book-cream p-2 rounded-xl border border-book-beige/35">
                  <div className="font-bold text-book-orange">{readingCount}</div>
                  <div className="text-[10px] text-book-mocha/50">Reading</div>
                </div>
                <div className="bg-book-cream p-2 rounded-xl border border-book-beige/35">
                  <div className="font-bold text-book-terracotta">{completedCount}</div>
                  <div className="text-[10px] text-book-mocha/50">Finished</div>
                </div>
                <div className="bg-book-cream p-2 rounded-xl border border-book-beige/35">
                  <div className="font-bold text-book-olive">{wishlistCount}</div>
                  <div className="text-[10px] text-book-mocha/50">Wishlist</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quotes Card */}
          <div className="bg-white rounded-3xl p-6 shadow-cozy border border-book-beige/40 flex flex-col justify-between hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-book-beige/65 rounded-2xl text-book-mocha">
                <Quote size={24} />
              </div>
              <span className="text-3xl font-playfair font-black text-book-mocha">
                {savedQuotesCount}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-book-mocha mb-1">Cozy Quotes</h3>
              <p className="text-sm text-book-mocha/60 leading-relaxed font-dm-sans mb-3">
                Literary snippets and beautiful phrases saved from your favorite stories.
              </p>
              <Link to="/quotes" className="text-xs font-bold text-book-terracotta hover:text-book-orange flex items-center gap-1.5 transition-colors font-poppins">
                View saved quotes <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Cart Card */}
          <div className="bg-white rounded-3xl p-6 shadow-cozy border border-book-beige/40 flex flex-col justify-between hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-book-beige/65 rounded-2xl text-book-mocha">
                <ShoppingBag size={24} />
              </div>
              <span className="text-3xl font-playfair font-black text-book-mocha">
                {cartQty}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-book-mocha mb-1">Shopping Bag</h3>
              <p className="text-sm text-book-mocha/60 leading-relaxed font-dm-sans mb-3">
                Items waiting in your bag. Complete checkout to add them to your bookshelves.
              </p>
              <Link to="/cart" className="text-xs font-bold text-book-terracotta hover:text-book-orange flex items-center gap-1.5 transition-colors font-poppins">
                Go to checkout <ArrowRight size={12} />
              </Link>
            </div>
          </div>

        </motion.div>

        {/* Dashboard Split Sections: Quote of the Day & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          
          {/* Reading Ritual Quote Area */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-3xl p-8 shadow-cozy border border-book-beige/40 flex flex-col justify-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-book-beige/20 rounded-full blur-2xl" />
            <div className="relative">
              <div className="flex items-center gap-2 text-book-terracotta font-bold text-xs uppercase tracking-widest mb-6 font-poppins">
                <Bookmark size={14} /> Reading Ritual Inspiration
              </div>
              
              <blockquote className="space-y-4">
                <p className="text-xl md:text-2xl font-playfair italic font-medium text-book-mocha leading-relaxed">
                  "A room without books is like a body without a soul."
                </p>
                <footer className="text-sm font-semibold text-book-mocha/70 font-poppins">
                  — Marcus Tullius Cicero
                </footer>
              </blockquote>
            </div>
          </motion.div>

          {/* Quick Actions Panel */}
          <motion.div
            variants={itemVariants}
            className="bg-book-beige/55 rounded-3xl p-8 shadow-cozy border border-book-beige/50 flex flex-col justify-between space-y-6"
          >
            <div>
              <h2 className="text-2xl font-playfair font-black text-book-mocha mb-4">Quick Shortcuts</h2>
              <div className="space-y-3 font-poppins text-sm font-medium">
                <Link
                  to="/books"
                  className="flex items-center justify-between p-3 bg-white hover:bg-book-cream rounded-2xl border border-book-beige/45 shadow-sm text-book-mocha transition-all duration-300 group hover:translate-x-1"
                >
                  <span className="flex items-center gap-3">
                    <BookOpen size={16} className="text-book-orange" /> Browse Library
                  </span>
                  <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-book-terracotta" />
                </Link>
                <Link
                  to="/bookshelf"
                  className="flex items-center justify-between p-3 bg-white hover:bg-book-cream rounded-2xl border border-book-beige/45 shadow-sm text-book-mocha transition-all duration-300 group hover:translate-x-1"
                >
                  <span className="flex items-center gap-3">
                    <Bookmark size={16} className="text-book-orange" /> My Shelf
                  </span>
                  <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-book-terracotta" />
                </Link>
                <Link
                  to="/stats"
                  className="flex items-center justify-between p-3 bg-white hover:bg-book-cream rounded-2xl border border-book-beige/45 shadow-sm text-book-mocha transition-all duration-300 group hover:translate-x-1"
                >
                  <span className="flex items-center gap-3">
                    <Sparkles size={16} className="text-book-orange" /> Reading Stats
                  </span>
                  <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-book-terracotta" />
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center justify-between p-3 bg-white hover:bg-book-cream rounded-2xl border border-book-beige/45 shadow-sm text-book-mocha transition-all duration-300 group hover:translate-x-1"
                  >
                    <span className="flex items-center gap-3">
                      <Shield size={16} className="text-book-terracotta" /> Admin panel
                    </span>
                    <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-book-terracotta" />
                  </Link>
                )}
              </div>
            </div>

            <button
              onClick={() => dispatch(logoutUser())}
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-book-mocha hover:bg-book-mocha/90 px-6 py-3.5 text-white font-semibold shadow-sm hover:shadow transition-all duration-300 transform active:scale-95 font-poppins"
            >
              <LogOut size={16} />
              {loading ? 'Signing out…' : 'Logout Account'}
            </button>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
