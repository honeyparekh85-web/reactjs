import React, { useState } from 'react';

const moodTags = ['comforting', 'heartbreaking', 'magical', 'healing', 'melancholic', 'inspiring', 'chaotic', 'cozy'];

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [journal, setJournal] = useState({ book: '', mood: 'cozy', note: '' });

  const handleSubmit = (event) => {
    event.preventDefault();
    setEntries((prev) => [{ ...journal, id: Date.now() }, ...prev]);
    setJournal({ book: '', mood: 'cozy', note: '' });
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid gap-10 xl:grid-cols-[1fr_420px]">
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-playfair font-bold text-book-mocha mb-3">Mood Review Journal</h1>
            <p className="text-book-mocha/70">Capture the emotional pulse of your reading journey with cozy, handwritten-style entries.</p>
          </div>
          <div className="rounded-[2rem] bg-book-beige/80 p-8 shadow-cozy">
            <h2 className="text-2xl font-playfair text-book-mocha mb-5">Write a new review</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                value={journal.book}
                onChange={(e) => setJournal((prev) => ({ ...prev, book: e.target.value }))}
                placeholder="Book title"
                className="w-full rounded-3xl border border-book-beige/70 bg-white px-4 py-3 text-book-mocha focus:outline-none focus:ring-2 focus:ring-book-terracotta"
                required
              />
              <select
                value={journal.mood}
                onChange={(e) => setJournal((prev) => ({ ...prev, mood: e.target.value }))}
                className="w-full rounded-full border border-book-beige/70 bg-white px-4 py-3 text-book-mocha focus:outline-none focus:ring-2 focus:ring-book-terracotta"
              >
                {moodTags.map((mood) => (
                  <option key={mood} value={mood}>{mood}</option>
                ))}
              </select>
              <textarea
                value={journal.note}
                onChange={(e) => setJournal((prev) => ({ ...prev, note: e.target.value }))}
                rows="5"
                placeholder="Write your emotional review..."
                className="w-full rounded-[1.5rem] border border-book-beige/70 bg-white px-4 py-4 text-book-mocha focus:outline-none focus:ring-2 focus:ring-book-terracotta"
                required
              />
              <button type="submit" className="rounded-full bg-book-mocha px-6 py-3 text-white font-semibold hover:bg-book-terracotta transition">Save Review</button>
            </form>
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-[2rem] bg-white shadow-cozy p-8">
            <h2 className="text-2xl font-playfair text-book-mocha mb-5">Your latest notes</h2>
            {entries.length ? (
              <div className="space-y-4">
                {entries.map((entry) => (
                  <div key={entry.id} className="rounded-3xl border border-book-beige/60 bg-book-cream p-5">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-semibold text-book-mocha">{entry.book}</h3>
                        <p className="text-sm text-book-mocha/60">Mood: {entry.mood}</p>
                      </div>
                      <span className="rounded-full bg-book-beige px-3 py-1 text-xs uppercase tracking-[0.16em] text-book-mocha">Journal</span>
                    </div>
                    <p className="text-book-mocha/70 leading-relaxed">{entry.note}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-book-mocha/70">Your journal will appear here once you add an entry.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;
