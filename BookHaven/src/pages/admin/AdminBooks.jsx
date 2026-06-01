import React, { useEffect, useMemo, useState } from 'react';
import { addBook, updateBook, deleteBook, subscribeBooks } from '../../services/bookApi';
import { uploadFileToStorage } from '../../firebase/storageService';

const defaultForm = {
  title: '',
  author: '',
  genre: 'Fantasy',
  description: '',
  image: '',
  pages: '',
  mood: '',
  rating: 4.5,
  price: 19.99,
  stock: 10,
};

const AdminBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(defaultForm);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeBooks(
      (nextBooks) => {
        setBooks(nextBooks);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const [coverFile, setCoverFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let imageUrl = form.image;
      if (coverFile) {
        const uploadResult = await uploadFileToStorage(coverFile, 'book-covers');
        imageUrl = uploadResult.fileUrl;
      }
      const payload = {
        ...form,
        image: imageUrl,
        pages: Number(form.pages),
        rating: Number(form.rating),
        price: Number(form.price),
        stock: Number(form.stock),
        mood: form.mood.split(',').map((item) => item.trim()),
      };

      if (editId) {
        await updateBook(editId, payload);
      } else {
        await addBook(payload);
      }

      setForm(defaultForm);
      setCoverFile(null);
      setEditId(null);
      alert(editId ? 'Book updated successfully.' : 'Book added successfully.');
    } catch (err) {
      console.error(err);
      alert('Book save failed. Please check Firebase configuration and permissions.');
    }
  };

  const handleEdit = (book) => {
    setEditId(book.id);
    setForm({
      title: book.title,
      author: book.author,
      genre: book.genre,
      description: book.description,
      image: book.image,
      pages: book.pages,
      mood: book.mood?.join(', ') || '',
      rating: book.rating,
      price: book.price || 19.99,
      stock: book.stock || 10,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this book?')) return;
    await deleteBook(id);
    alert('Book deleted successfully.');
  };

  const moodPreview = useMemo(() => form.mood.split(',').map((m) => m.trim()).filter(Boolean), [form.mood]);

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid gap-10 xl:grid-cols-[1fr_420px]">
        <div>
          <div className="mb-8">
            <h1 className="text-4xl font-playfair font-bold text-book-mocha">Admin Book Management</h1>
            <p className="text-book-mocha/70">Add, edit, or remove books for the BookHaven library.</p>
          </div>
          <div className="rounded-[2rem] bg-white p-8 shadow-cozy">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 lg:grid-cols-2">
                {['title', 'author', 'genre', 'image'].map((field) => (
                  <label key={field} className="block text-sm text-book-mocha/80">
                    <span className="capitalize">{field}</span>
                    <input
                      name={field}
                      value={form[field]}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-3xl border border-book-beige/70 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-book-terracotta"
                      required
                    />
                  </label>
                ))}
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                <label className="block text-sm text-book-mocha/80">
                  <span>Pages</span>
                  <input
                    name="pages"
                    type="number"
                    min="1"
                    value={form.pages}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-3xl border border-book-beige/70 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-book-terracotta"
                    required
                  />
                </label>
                <label className="block text-sm text-book-mocha/80">
                  <span>Rating</span>
                  <input
                    name="rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={form.rating}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-3xl border border-book-beige/70 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-book-terracotta"
                    required
                  />
                </label>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                <label className="block text-sm text-book-mocha/80">
                  <span>Price ($)</span>
                  <input
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-3xl border border-book-beige/70 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-book-terracotta"
                    required
                  />
                </label>
                <label className="block text-sm text-book-mocha/80">
                  <span>Stock</span>
                  <input
                    name="stock"
                    type="number"
                    min="0"
                    value={form.stock}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-3xl border border-book-beige/70 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-book-terracotta"
                    required
                  />
                </label>
              </div>
              <label className="block text-sm text-book-mocha/80">
                <span>Description</span>
                <textarea
                  name="description"
                  rows="4"
                  value={form.description}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-[1.5rem] border border-book-beige/70 px-4 py-4 focus:outline-none focus:ring-2 focus:ring-book-terracotta"
                  required
                />
              </label>
              <label className="block text-sm text-book-mocha/80">
                <span>Mood tags (comma separated)</span>
                <input
                  name="mood"
                  value={form.mood}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-3xl border border-book-beige/70 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-book-terracotta"
                />
              </label>
              <label className="block text-sm text-book-mocha/80">
                <span>Cover image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
                  className="mt-2 w-full text-sm text-book-mocha"
                />
                {coverFile && <p className="mt-2 text-xs text-book-mocha/70">Selected file: {coverFile.name}</p>}
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button type="submit" className="rounded-full bg-book-mocha px-6 py-3 text-white font-semibold hover:bg-book-terracotta transition">{editId ? 'Update Book' : 'Add Book'}</button>
                {editId && (
                  <button type="button" onClick={() => { setEditId(null); setForm(defaultForm); }} className="rounded-full border border-book-beige px-6 py-3 text-book-mocha hover:bg-book-beige transition">Cancel edit</button>
                )}
              </div>
            </form>
            {moodPreview.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {moodPreview.map((tag) => (
                  <span key={tag} className="rounded-full bg-book-beige px-3 py-2 text-xs text-book-mocha">{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>
        <aside className="space-y-6">
          <div className="rounded-[2rem] bg-book-beige/80 p-8 shadow-cozy">
            <h2 className="text-2xl font-playfair text-book-mocha mb-4">Library updates</h2>
            <p className="text-book-mocha/70">Use this panel to keep the BookHaven collection fresh, curated, and ready for cozy reading.</p>
          </div>
          <div className="rounded-[2rem] bg-white p-8 shadow-cozy">
            <h2 className="text-2xl font-playfair text-book-mocha mb-4">Recently managed books</h2>
            {loading ? (
              <p className="text-book-mocha/70">Loading...</p>
            ) : (
              <div className="space-y-4">
                {books.slice(0, 4).map((book) => (
                  <div key={book.id} className="rounded-3xl border border-book-beige/60 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-book-mocha">{book.title}</h3>
                        <p className="text-xs text-book-mocha/60">{book.author}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(book)} className="text-sm text-book-terracotta hover:text-book-orange">Edit</button>
                        <button onClick={() => handleDelete(book.id)} className="text-sm text-book-mocha/60 hover:text-book-terracotta">Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AdminBooks;
