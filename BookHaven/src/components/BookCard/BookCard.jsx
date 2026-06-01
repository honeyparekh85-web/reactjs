import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Star, BookmarkPlus, BookmarkCheck, ShoppingCart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToShelf } from '../../store/shelfSlice';
import { addToCart } from '../../store/cartSlice';
import ImageWithFallback from '../ImageWithFallback';
import { parseMood, parseNumber } from '../../utils/dataHelpers';
import { resolveBookImageSrc } from '../../utils/bookImage';

const BookCard = ({ book }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shelfBooks = useSelector((state) => state.shelf.books);
  const onShelf = shelfBooks.some((item) => item.id === book.id);
  const moodTags = parseMood(book.mood);
  const price = parseNumber(book.price, 19.99);
  const rating = parseNumber(book.rating, 0);
  const imageSrc = resolveBookImageSrc(book.image, book.title);
  const categoryLabel = book.genre || moodTags[0] || null;

  const handleAddToCart = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(addToCart({ ...book, price }));
  };

  const handleBuyNow = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(addToCart({ ...book, price }));
    navigate('/checkout');
  };

  const handleCardClick = () => {
    navigate(`/book/${book.id}`);
  };

  return (
    <motion.article
      whileHover={{ y: -6 }}
      className="cozy-card group relative mx-auto flex h-full w-full max-w-[280px] cursor-pointer flex-col"
      onClick={handleCardClick}
    >
      <div className="relative h-52 shrink-0 overflow-hidden bg-book-beige/30 sm:h-56">
        <ImageWithFallback
          src={imageSrc}
          alt={book.title}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        {categoryLabel && (
          <span className="absolute left-3 top-3 max-w-[85%] truncate rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-book-mocha shadow-sm backdrop-blur-sm">
            {categoryLabel}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-0.5 line-clamp-2 text-base font-playfair font-bold leading-snug text-book-mocha transition-colors group-hover:text-book-terracotta">
          {book.title}
        </h3>
        <p className="mb-3 line-clamp-1 text-sm text-book-mocha/60">{book.author}</p>

        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 text-book-gold">
            <Star size={14} fill="currentColor" />
            <span className="text-sm font-bold">{rating.toFixed(1)}</span>
          </div>
          <span className="text-lg font-bold text-book-terracotta">${price.toFixed(2)}</span>
        </div>

        {moodTags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {moodTags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-book-beige/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-book-mocha/55"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto space-y-2">
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-book-terracotta py-2.5 text-sm font-bold text-white transition-colors hover:bg-book-mocha"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>
          <button
            type="button"
            onClick={handleBuyNow}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-book-beige bg-white py-2.5 text-sm font-bold text-book-mocha transition-colors hover:bg-book-beige"
          >
            Buy Now
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              if (!onShelf) dispatch(addToShelf(book));
            }}
            disabled={onShelf}
            className={`flex w-full items-center justify-center gap-2 rounded-xl py-2 text-sm font-semibold transition-colors ${
              onShelf
                ? 'cursor-default bg-book-beige/50 text-book-terracotta'
                : 'text-book-mocha/70 hover:bg-book-beige hover:text-book-terracotta'
            }`}
          >
            {onShelf ? <BookmarkCheck size={17} /> : <BookmarkPlus size={17} />}
            {onShelf ? 'On Shelf' : 'Add to Shelf'}
          </button>
        </div>
      </div>
    </motion.article>
  );
};

export default BookCard;
