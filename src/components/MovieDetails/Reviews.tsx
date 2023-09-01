import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tmdbService from "../../tmdbService";
import "../../styles/Movie.css";

interface Review {
  id: string;
  author: string;
  content: string;
}

export default function Review() {
  const { id } = useParams();

  const [reviews, setReviews] = useState<Review[]>([]);
  useEffect(() => {
    const fetchReviews = async () => {
      const response = await tmdbService.get(`/movie/${id}/reviews`);
      setReviews(response.data.results);
    };

    fetchReviews();
  }, [id]);

  return (
    <>
      <div className="movie-section">
        <h2 className="section-heading">Reviews:</h2>
        <div className="reviews-container">
          <ul>
            {reviews.map((review) => (
              <li key={review.id}>
                <strong>{review.author}</strong>
                <p>{review.content}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
