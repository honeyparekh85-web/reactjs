import React from 'react';
import { Book, Heart, Globe, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-book-mocha text-book-beige pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Book size={24} />
              <span className="text-2xl font-playfair font-bold tracking-tight">BookHaven</span>
            </div>
            <p className="text-book-beige/70 max-w-sm mb-6 font-dm-sans leading-relaxed">
              Your cozy digital reading sanctuary. Track books, save emotions, collect quotes, and build your own beautiful reading universe.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-book-orange transition-colors"><Globe size={20} /></a>
              <a href="#" className="hover:text-book-orange transition-colors"><Mail size={20} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-playfair text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-book-beige/70 text-sm">
              <li><a href="/books" className="hover:text-book-orange transition-colors">Browse Books</a></li>
              <li><a href="/bookshelf" className="hover:text-book-orange transition-colors">My Bookshelf</a></li>
              <li><a href="/journal" className="hover:text-book-orange transition-colors">Reading Journal</a></li>
              <li><a href="/quotes" className="hover:text-book-orange transition-colors">Favorite Quotes</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-playfair text-lg font-bold mb-6">Community</h4>
            <ul className="space-y-4 text-book-beige/70 text-sm">
              <li><a href="#" className="hover:text-book-orange transition-colors">Reading Challenges</a></li>
              <li><a href="#" className="hover:text-book-orange transition-colors">Book Clubs</a></li>
              <li><a href="#" className="hover:text-book-orange transition-colors">Mood Recommendations</a></li>
              <li><a href="#" className="hover:text-book-orange transition-colors">Support</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-book-beige/10 pt-8 flex flex-col md:row justify-between items-center gap-4 text-xs text-book-beige/40">
          <p>© 2024 BookHaven. Handcrafted for book lovers.</p>
          <div className="flex items-center gap-1">
            Made with <Heart size={12} className="text-book-terracotta fill-book-terracotta" /> by Reading Enthusiasts
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
