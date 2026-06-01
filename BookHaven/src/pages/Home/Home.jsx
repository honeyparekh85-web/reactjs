import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../../store/booksSlice';
import BookCard from '../../components/BookCard/BookCard';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const { items: books, status } = useSelector((state) => state.books);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBooks());
    }
  }, [status, dispatch]);

  return (
    <div className="bg-book-cream">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-book-terracotta font-bold uppercase tracking-widest text-sm mb-6"
            >
              <Sparkles size={16} />
              Your cozy digital reading sanctuary
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-playfair font-black text-book-mocha leading-[1.1] mb-8"
            >
              Track books, save emotions, and build your <span className="italic text-book-terracotta">universe</span>.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-book-mocha/70 font-dm-sans leading-relaxed mb-10 max-w-xl"
            >
              Join a community of readers who celebrate the emotional journey of every story. Beautifully organize your library and capture every quote that touches your soul.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/books" className="btn-primary flex items-center gap-2 px-8 py-4">
                Explore Library <ArrowRight size={18} />
              </Link>
              <Link to="/login" className="btn-secondary px-8 py-4">
                Start Your Journal
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/3 h-2/3 bg-book-beige/30 blur-3xl rounded-full -mr-20" />
      </section>

      {/* Trending Section */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-playfair font-bold text-book-mocha mb-2">Trending on BookHaven</h2>
              <p className="text-book-mocha/60 font-dm-sans">What everyone is reading tonight</p>
            </div>
            <Link to="/books" className="text-book-terracotta font-bold flex items-center gap-1 hover:gap-2 transition-all">
              View All <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid gap-8 [grid-template-columns:repeat(auto-fill,minmax(240px,1fr))]">
            {status === 'loading' ? (
              [1, 2, 3, 4, 5].map((n) => (
                <div
                  key={n}
                  className="cozy-card mx-auto h-[420px] w-full max-w-[280px] animate-pulse bg-book-beige/20"
                />
              ))
            ) : (
              books.slice(0, 5).map((book) => (
                <BookCard key={book.id} book={book} />
              ))
            )}
          </div>
        </div>
      </section>
      
      {/* Mood Categories */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-playfair font-bold text-book-mocha mb-12 text-center">Browse by Mood</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Comforting', 'Heartbreaking', 'Magical', 'Cozy'].map((mood) => (
              <div key={mood} className="cozy-card p-8 flex flex-col items-center justify-center gap-4 hover:bg-book-beige cursor-pointer transition-colors group">
                <div className="w-12 h-12 rounded-full bg-book-cream flex items-center justify-center text-book-mocha group-hover:bg-white transition-colors">
                  <Sparkles size={24} />
                </div>
                <span className="font-playfair font-bold text-xl">{mood}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
