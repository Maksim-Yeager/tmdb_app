import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IMovieModel from "../../models/MovieModel/IMovieModel";
import tmdbService from "../../tmdbService";
import MovieModel from "../../models/MovieModel/Moviemodel";
import MovieHorizontal from "../Cards/MovieHorizontalCard";
import "../../styles/Movie.css";

function Similar() {
  const { id } = useParams();
  const [similarMovies, setSimilarMovies] = useState<IMovieModel[] | null>(
    null
  );
  useEffect(() => {
    const fetchSimilarMovie = async () => {
      const response = await tmdbService.get(`/movie/${id}/similar`);
      const similarData = response.data.results.map(
        (movieData: any) => new MovieModel(movieData)
      );
      setSimilarMovies(similarData);
    };

    fetchSimilarMovie();
  }, [id]);

  return (
    <>
      <div className="movie-section">
        <h2 className="section-heading">Similar Movies:</h2>
        <div className="horizontal-scroll-container">
          {similarMovies?.map((similar) => (
            <MovieHorizontal
              key={similar.id}
              id={similar.id}
              posterPath={similar.posterPath}
              overview={similar.overview}
              title={similar.title}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Similar;