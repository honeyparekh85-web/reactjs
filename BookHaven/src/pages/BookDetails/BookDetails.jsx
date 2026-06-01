import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBook } from '../../services/bookApi';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { ShoppingCart } from 'lucide-react';
import BookCard from '../../components/BookCard/BookCard';
import ImageWithFallback from '../../components/ImageWithFallback';
import { parseMood, parseNumber } from '../../utils/dataHelpers';
import { resolveBookImageSrc } from '../../utils/bookImage';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const books = useSelector((state) => state.books.items);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadBook = async () => {
      setLoading(true);
      try {
        const response = await getBook(id);
        setBook(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadBook();
  }, [id]);

  const related = books.filter((item) => item.genre === book?.genre && item.id !== book?.id).slice(0, 3);

  if (loading) {
    return <div className="container mx-auto p-6">Loading book details…</div>;
  }

  if (!book) {
    return <div className="container mx-auto p-6">Book not found.</div>;
  }

  const moodTags = parseMood(book.mood);
  const price = parseNumber(book.price, 19.99);
  const imageSrc = resolveBookImageSrc(book.image, book.title);

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid gap-10 lg:grid-cols-[360px_1fr]">
        <div className="rounded-[2rem] overflow-hidden bg-book-beige/80 shadow-cozy p-6">
          <div className="relative aspect-[2/3] mb-6 overflow-hidden rounded-[1.5rem] bg-book-beige/30">
            <ImageWithFallback
              src={imageSrc}
              alt={book.title}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </div>
          <div className="space-y-3 text-book-mocha/70 text-sm">
            <p><span className="font-semibold">Author:</span> {book.author}</p>
            <p><span className="font-semibold">Genre:</span> {book.genre}</p>
            <p><span className="font-semibold">Pages:</span> {book.pages}</p>
            <p><span className="font-semibold">Rating:</span> {book.rating}</p>
            <p><span className="font-semibold">Stock:</span> {book.stock > 0 ? `${book.stock} available` : 'Out of stock'}</p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-book-terracotta font-bold">Mood & details</p>
              <h1 className="text-4xl font-playfair font-bold text-book-mocha mt-3">{book.title}</h1>
              <p className="text-2xl font-bold text-book-mocha mt-2">${book.price?.toFixed(2) || '19.99'}</p>
            </div>
            <Link to="/books" className="text-sm text-book-mocha/70 hover:text-book-terracotta">Back to library</Link>
          </div>
          <div className="space-y-6 text-book-mocha/80 leading-relaxed">
            <p>{book.description}</p>
            <div className="flex flex-wrap gap-2">
              {moodTags.map((mood) => (
                <span key={mood} className="rounded-full bg-book-beige px-4 py-2 text-sm text-book-mocha">{mood}</span>
              ))}
            </div>
            <button
              onClick={() => dispatch(addToCart(book))}
              className="mt-6 flex items-center justify-center gap-2 bg-book-terracotta text-white px-8 py-3 rounded-full hover:bg-book-mocha transition-colors"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
          </div>
          <div className="mt-10">
            <h2 className="text-2xl font-playfair text-book-mocha mb-4">Related stories</h2>
            <div className="grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(240px,1fr))]">
              {related.length ? related.map((item) => <BookCard key={item.id} book={item} />) : <p className="text-book-mocha/70">No related books available yet.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
