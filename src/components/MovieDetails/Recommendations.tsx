import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IMovieModel from "../../models/MovieModel/IMovieModel";
import tmdbService from "../../tmdbService";
import MovieModel from "../../models/MovieModel/Moviemodel";
import MovieHorizontal from "../Cards/MovieHorizontalCard";
import "../../styles/Movie.css";

function Recommendations() {
  const { id } = useParams();
  const [recommendations, setRecommendations] = useState<IMovieModel[] | null>(
    null
  );
  useEffect(() => {
    const fetchMovieRecommendations = async () => {
      const response = await tmdbService.get(`/movie/${id}/recommendations`);
      const recommendationData = response.data.results.map(
        (movieData: any) => new MovieModel(movieData)
      );
      setRecommendations(recommendationData);
    };

    fetchMovieRecommendations();
  }, [id]);

  return (
    <>
      <div className="movie-section">
        <h2 className="section-heading">Recommendations:</h2>
        <div className="horizontal-scroll-container">
          {recommendations?.map((recommendation) => (
            <MovieHorizontal
              key={recommendation.id}
              id={recommendation.id}
              posterPath={recommendation.posterPath}
              overview={recommendation.overview}
              title={recommendation.title}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Recommendations;