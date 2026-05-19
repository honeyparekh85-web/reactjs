import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Menu, X, Sparkles } from 'lucide-react';

const MotionLink = motion(Link);

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/quiz', label: 'Discover' },
  { path: '/mood-board', label: 'Mood Board' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 flex h-16 items-center justify-between rounded-2xl glass px-6 pointer-events-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group cursor-pointer">
            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
              <Compass className="w-7 h-7 text-orange-400 group-hover:text-orange-300 transition-colors" />
            </motion.div>
            <span className="font-display text-xl font-bold tracking-tight">
              <span className="text-white">Wander</span>
              <span className="text-gradient-sunset">Soul</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-colors cursor-pointer ${
                  location.pathname === link.path ? 'text-white' : 'text-white/60 hover:text-white/90'
                }`}
              >
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-white/10 rounded-xl"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <MotionLink
              to="/quiz"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-orange-500/20 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              Start Journey
            </MotionLink>
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white/80 cursor-pointer">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mx-4 mt-2 glass rounded-2xl overflow-hidden pointer-events-auto"
          >
            <div className="p-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                    location.pathname === link.path ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/quiz"
                onClick={() => setIsOpen(false)}
                className="w-full mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm font-semibold px-5 py-3 rounded-xl cursor-pointer text-center"
              >
                <Sparkles className="w-4 h-4" />
                Start Journey
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
