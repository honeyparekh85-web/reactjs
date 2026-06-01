import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQuotes, addQuote } from '../../services/quoteApi';
import { saveQuote } from '../../store/quoteSlice';

const Quotes = () => {
  const dispatch = useDispatch();
  const savedQuotes = useSelector((state) => state.quotes.items);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState({ text: '', mood: 'cozy' });

  useEffect(() => {
    const loadQuotes = async () => {
      setLoading(true);
      try {
        const response = await getQuotes();
        setQuotes(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadQuotes();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await addQuote({ text: draft.text, mood: draft.mood });
      if (response && response.data) {
        setQuotes((prev) => [response.data, ...prev]);
        dispatch(saveQuote(response.data));
      }
      setDraft({ text: '', mood: 'cozy' });
    } catch (error) {
      console.error('Failed to save quote:', error);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid gap-10 xl:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="mb-8">
            <h1 className="text-4xl font-playfair font-bold text-book-mocha mb-3">Favorite Quotes</h1>
            <p className="text-book-mocha/70">Collect journal-worthy lines and pin your most emotional reading moments.</p>
          </div>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((placeholder) => (
                <div key={placeholder} className="h-24 rounded-[2rem] bg-book-beige/70 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {quotes.map((quote) => (
                <div key={quote.id} className="rounded-[2rem] bg-white p-6 shadow-cozy border border-book-beige/60">
                  <p className="text-book-mocha/80 text-lg">“{quote.text}”</p>
                  <p className="mt-4 text-sm text-book-mocha/60">Mood: {quote.mood || 'inspired'}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="space-y-6">
          <div className="rounded-[2rem] bg-book-beige/80 p-8 shadow-cozy">
            <h2 className="text-2xl font-playfair text-book-mocha mb-4">Save a new quote</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                value={draft.text}
                onChange={(e) => setDraft((prev) => ({ ...prev, text: e.target.value }))}
                rows="5"
                placeholder="Write a quote or memorable line..."
                className="w-full rounded-[1.5rem] border border-book-beige/70 bg-white px-4 py-4 text-book-mocha focus:outline-none focus:ring-2 focus:ring-book-terracotta"
                required
              />
              <select
                value={draft.mood}
                onChange={(e) => setDraft((prev) => ({ ...prev, mood: e.target.value }))}
                className="w-full rounded-full border border-book-beige/70 bg-white px-4 py-3 text-book-mocha focus:outline-none focus:ring-2 focus:ring-book-terracotta"
              >
                {['cozy', 'inspiring', 'melancholic', 'magical', 'heartbreaking'].map((mood) => (
                  <option key={mood} value={mood}>{mood}</option>
                ))}
              </select>
              <button type="submit" className="w-full rounded-full bg-book-mocha px-6 py-3 text-white font-semibold hover:bg-book-terracotta transition">Save Quote</button>
            </form>
          </div>
          <div className="rounded-[2rem] bg-white p-8 shadow-cozy">
            <h2 className="text-2xl font-playfair text-book-mocha mb-4">Pinned quotes</h2>
            {savedQuotes.length ? (
              <ul className="space-y-4">
                {savedQuotes.map((quote) => (
                  <li key={quote.id} className="rounded-3xl border border-book-beige/60 bg-book-cream p-4 text-book-mocha/80">“{quote.text}” <span className="block text-xs text-book-mocha/50 mt-2">Mood: {quote.mood}</span></li>
                ))}
              </ul>
            ) : (
              <p className="text-book-mocha/70">Your pinned quotes will show here.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quotes;
