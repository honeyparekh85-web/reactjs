import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromShelf, updateProgress, updateStatus } from '../../store/shelfSlice';

const statusLabels = {
  reading: 'Currently Reading',
  completed: 'Completed',
  wishlist: 'Wishlist',
};

const Bookshelf = () => {
  const dispatch = useDispatch();
  const shelfBooks = useSelector((state) => state.shelf.books);

  const handleProgressChange = (id, value) => {
    dispatch(updateProgress({ id, progress: Number(value) }));
  };

  const handleStatusChange = (id, status) => {
    dispatch(updateStatus({ id, status }));
  };

  if (!shelfBooks.length) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="rounded-[2rem] bg-book-beige/80 p-12 text-center shadow-cozy">
          <h1 className="text-4xl font-playfair font-bold text-book-mocha mb-4">Your cozy shelf is waiting.</h1>
          <p className="text-book-mocha/70 mb-6">Add a book from the library to start tracking your reading progress and mood notes.</p>
          <Link to="/books" className="inline-block rounded-full bg-book-terracotta px-8 py-3 text-white font-semibold hover:bg-book-mocha transition-colors">
            Browse Books
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-playfair font-bold text-book-mocha mb-8">My Bookshelf</h1>
      <div className="grid gap-8">
        {Object.keys(statusLabels).map((statusKey) => {
          const booksByStatus = shelfBooks.filter((book) => book.status === statusKey);
          return (
            <div key={statusKey} className="rounded-[2rem] bg-white shadow-cozy p-6">
              <h2 className="text-2xl font-playfair text-book-mocha mb-4">{statusLabels[statusKey]}</h2>
              {booksByStatus.length ? (
                <div className="space-y-5">
                  {booksByStatus.map((book) => (
                    <div key={book.id} className="rounded-3xl border border-book-beige/60 p-5 bg-book-cream">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-book-mocha">{book.title}</h3>
                          <p className="text-book-mocha/70">{book.author}</p>
                        </div>
                        <button
                          onClick={() => dispatch(removeFromShelf(book.id))}
                          className="text-sm text-book-terracotta hover:text-book-orange"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="mt-4 space-y-4">
                        <label className="block text-sm text-book-mocha/70">Progress: {book.progress}%</label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={book.progress}
                          onChange={(e) => handleProgressChange(book.id, e.target.value)}
                          className="w-full"
                        />
                        <select
                          value={book.status}
                          onChange={(e) => handleStatusChange(book.id, e.target.value)}
                          className="rounded-full border border-book-beige/70 bg-white px-4 py-2 text-sm text-book-mocha focus:outline-none focus:ring-2 focus:ring-book-terracotta"
                        >
                          {Object.entries(statusLabels).map(([key, label]) => (
                            <option key={key} value={key}>{label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-book-mocha/70">No books added here yet.</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Bookshelf;
