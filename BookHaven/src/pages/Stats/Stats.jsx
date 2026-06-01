import React from 'react';
import { useSelector } from 'react-redux';

const Stats = () => {
  const books = useSelector((state) => state.books.items);
  const shelfBooks = useSelector((state) => state.shelf.books);

  const totalBooks = books.length;
  const shelfCount = shelfBooks.length;
  const completedCount = shelfBooks.filter((book) => book.status === 'completed').length;
  const averageRating = (books.reduce((sum, book) => sum + Number(book.rating || 0), 0) / Math.max(1, books.length)).toFixed(1);

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-playfair font-bold text-book-mocha">Reading statistics</h1>
        <p className="text-book-mocha/70 mt-3">Track your progress with warm visuals and cozy metrics that feel editorial, not clinical.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[2rem] bg-book-beige/90 p-8 shadow-cozy">
          <p className="text-sm uppercase tracking-[0.28em] text-book-terracotta font-bold mb-3">Books in library</p>
          <p className="text-5xl font-playfair text-book-mocha">{totalBooks}</p>
        </div>
        <div className="rounded-[2rem] bg-white p-8 shadow-cozy">
          <p className="text-sm uppercase tracking-[0.28em] text-book-terracotta font-bold mb-3">Shelved reads</p>
          <p className="text-5xl font-playfair text-book-mocha">{shelfCount}</p>
        </div>
        <div className="rounded-[2rem] bg-book-beige/90 p-8 shadow-cozy">
          <p className="text-sm uppercase tracking-[0.28em] text-book-terracotta font-bold mb-3">Completed books</p>
          <p className="text-5xl font-playfair text-book-mocha">{completedCount}</p>
        </div>
        <div className="rounded-[2rem] bg-white p-8 shadow-cozy">
          <p className="text-sm uppercase tracking-[0.28em] text-book-terracotta font-bold mb-3">Average rating</p>
          <p className="text-5xl font-playfair text-book-mocha">{averageRating}</p>
        </div>
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] bg-book-beige/90 p-8 shadow-cozy">
          <h2 className="text-2xl font-playfair text-book-mocha mb-4">Mood map</h2>
          <p className="text-book-mocha/70">Explore your collected feelings across genres and moods with each visit.</p>
          <div className="mt-6 grid grid-cols-2 gap-4">
            {['cozy', 'magical', 'heartbreaking', 'inspiring'].map((item) => (
              <div key={item} className="rounded-3xl bg-white p-4 text-book-mocha/80">{item}</div>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] bg-white p-8 shadow-cozy">
          <h2 className="text-2xl font-playfair text-book-mocha mb-4">Reading habit</h2>
          <p className="text-book-mocha/70">Keep a warm reading pace by adding more books to your Currently Reading shelf.</p>
          <div className="mt-6 space-y-4">
            <div className="rounded-3xl border border-book-beige/60 p-4">Build a cozy nightly reading routine.</div>
            <div className="rounded-3xl border border-book-beige/60 p-4">Save quotes from books that move you.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
