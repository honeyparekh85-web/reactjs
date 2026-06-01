import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BookCard from '../../components/BookCard/BookCard';
import { fetchBooks } from '../../store/booksSlice';
import { Search } from 'lucide-react';
import { parseNumber } from '../../utils/dataHelpers';

const Books = () => {
  const dispatch = useDispatch();
  const { items: books, status } = useSelector((state) => state.books);
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('All');

  const [priceRange, setPriceRange] = useState(100);
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBooks());
    }
  }, [status, dispatch]);

  const maxBookPrice = useMemo(() => {
    if (!books || books.length === 0) return 100;
    return Math.max(100, ...books.map((book) => parseNumber(book.price, 0)));
  }, [books]);

  useEffect(() => {
    if (books.length && priceRange > maxBookPrice) {
      setPriceRange(maxBookPrice);
    }
  }, [books.length, maxBookPrice, priceRange]);

  const genres = useMemo(() => ['All', ...new Set(books.map((book) => book.genre))], [books]);
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch = [book.title, book.author, book.genre].join(' ').toLowerCase().includes(search.toLowerCase());
      const matchesGenre = genre === 'All' || book.genre === genre;
      const priceValue = parseNumber(book.price, 0);
      const ratingValue = parseNumber(book.rating, 0);
      const matchesPrice = priceValue <= priceRange;
      const matchesRating = ratingValue >= minRating;
      return matchesSearch && matchesGenre && matchesPrice && matchesRating;
    });
  }, [books, search, genre, priceRange, minRating]);

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-10">
        <div>
          <h1 className="text-4xl font-playfair font-bold text-book-mocha mb-3">Discover your next book.</h1>
          <p className="text-book-mocha/70 max-w-2xl">Browse the BookHaven library with cozy editorial cards, mood filters, and shelf-friendly recommendations.</p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-80">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-book-mocha/50" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search books, authors, moods"
              className="w-full rounded-full border border-book-beige/80 bg-white pl-12 pr-4 py-3 text-sm text-book-mocha focus:outline-none focus:ring-2 focus:ring-book-terracotta"
            />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[250px_1fr] gap-8">
        {/* Sidebar Filters */}
        <aside className="space-y-8 bg-book-beige/30 p-6 rounded-3xl h-fit">
          <div>
            <h3 className="font-bold text-book-mocha mb-3">Category</h3>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full rounded-xl border border-book-beige/80 bg-white px-4 py-2 text-sm text-book-mocha focus:outline-none focus:ring-2 focus:ring-book-terracotta"
            >
              {genres.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-book-mocha">Max Price</h3>
              <span className="text-sm font-medium text-book-mocha/70">${priceRange}</span>
            </div>
            <input
              type="range"
              min="0"
              max={maxBookPrice}
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-book-terracotta"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-book-mocha">Min Rating</h3>
              <span className="text-sm font-medium text-book-mocha/70">{minRating} ★</span>
            </div>
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-full accent-book-terracotta"
            />
          </div>
        </aside>

        {/* Product Grid */}
        <div>
          {status === 'loading' ? (
            <div className="grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(240px,1fr))]">
              {[1, 2, 3, 4, 5, 6].map((placeholder) => (
                <div
                  key={placeholder}
                  className="mx-auto h-[420px] w-full max-w-[280px] animate-pulse rounded-3xl bg-book-beige/60"
                />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(240px,1fr))]">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
              {filteredBooks.length === 0 && (
                <div className="col-span-full rounded-[2rem] p-12 bg-book-beige text-book-mocha/70 text-center">No books found matching your filters.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Books;
