import { useState } from "react";

export default function ReviewSection() {
  const [reviews, setReviews] = useState([]);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);

  const addReview = () => {
    if (!text.trim()) return;

    setReviews([
      { id: Date.now(), text: text.trim(), rating: Number(rating) },
      ...reviews,
    ]);

    setText("");
    setRating(5);
  };

  return (
    <section className="reviews">
      <h2>Customer Reviews</h2>

      <div className="review-form">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your review..."
        />

        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value={5}>5 stars</option>
          <option value={4}>4 stars</option>
          <option value={3}>3 stars</option>
          <option value={2}>2 stars</option>
          <option value={1}>1 star</option>
        </select>

        <button onClick={addReview}>Submit</button>
      </div>

      <div className="review-list">
        {reviews.length === 0 ? (
          <p>No reviews yet. </p>
        ) : (
          reviews.map((r) => (
            <div className="review-card" key={r.id}>
              <p className="rating">Rating: {r.rating}/5</p>
              <p>{r.text}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}