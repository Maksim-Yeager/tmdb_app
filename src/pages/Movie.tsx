import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IMovieModel from "../models/MovieModel/IMovieModel";
import tmdbService from "../tmdbService";
import MovieModel from "../models/MovieModel/Moviemodel";
import MovieHorizontal from "../components/Cards/MovieHorizontalCard";
import "../styles/Movie.css";
import { Col, Container, Row } from "react-bootstrap";

interface Video {
  id: string;
  key: string;
  name: string;
}

interface Review {
  id: string;
  author: string;
  content: string;
}

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string;
}

export default function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState<IMovieModel | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [recommendations, setRecommendations] = useState<IMovieModel[] | null>(
    null
  );
  const [similarMovies, setSimilarMovies] = useState<IMovieModel[] | null>(
    null
  );
  const [cast, setCast] = useState<CastMember[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [crew, setCrew] = useState<CrewMember[]>([]);
  let hours: number | undefined;
  let minutes: number | undefined;
  if (movie?.runtime !== undefined) {
    hours = Math.floor(movie?.runtime / 60);
    minutes = movie?.runtime % 60;
  }
  let roundedVoteAverage: number | undefined;

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await tmdbService.get(`/movie/${id}`);
      const movieData = new MovieModel(response.data);
      setMovie(movieData);
    };

    const fetchMovieImages = async () => {
      const response = await tmdbService.get(`/movie/${id}/images`);
      const imagePaths = response.data.backdrops.map(
        (image: any) => image.file_path
      );
      setImages(imagePaths);
    };

    const fetchMovieVideos = async () => {
      const response = await tmdbService.get(`/movie/${id}/videos`);
      const videoData = response.data.results;
      setVideos(videoData);
    };

    const fetchMovieRecommendations = async () => {
      const response = await tmdbService.get(`/movie/${id}/recommendations`);
      const recommendationData = response.data.results.map(
        (movieData: any) => new MovieModel(movieData)
      );
      setRecommendations(recommendationData);
    };

    const fetchSimilarMovie = async () => {
      const response = await tmdbService.get(`/movie/${id}/similar`);
      const similarData = response.data.results.map(
        (movieData: any) => new MovieModel(movieData)
      );
      setSimilarMovies(similarData);
    };

    const fetchReviews = async () => {
      const response = await tmdbService.get(`/movie/${id}/reviews`);
      setReviews(response.data.results);
    };

    const fetchCast = async () => {
      const response = await tmdbService.get(
        `https://api.themoviedb.org/3/movie/${id}/credits`
      );

      setCast(response.data.cast);
      setCrew(response.data.crew);
    };

    fetchCast();
    fetchReviews();
    fetchSimilarMovie();
    fetchMovieRecommendations();
    fetchMovieVideos();
    fetchMovieImages();
    fetchMovie();
  }, [id]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  if (movie.voteAverage !== undefined) {
    roundedVoteAverage = parseFloat(movie.voteAverage.toFixed(1));
  }

  return (
    <div className="movie-container">
      <Container>
        <Row>
          <Col>
            <h1>{movie.title}</h1>
          </Col>
          <Col>
            <Row style={{ marginTop: "20px" }}>
              <p>IMDb rating</p>
            </Row>
            <Row>
              <p style={{ margin: "auto" }}>{roundedVoteAverage}/10</p>
            </Row>
          </Col>
          <Col></Col>
          <Col>
            <Row style={{ marginTop: "20px" }}>
              <p>Popularity</p>
            </Row>
            <Row>
              {movie.popularity !== undefined && (
                <p>{movie.popularity.toFixed(1)}</p>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
      <div className="grid-container">
        <div className="movie-details" style={{ margin: "10px" }}>
          <img
            style={{ width: "100%", height: "100%" }}
            src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
            alt={movie.title}
          />
        </div>
        <div className="video-container-grid">
          <iframe
            style={{ width: "100%", height: "100%" }}
            key={videos[0].key}
            src={`https://www.youtube.com/embed/${videos[0].key}`}
          >
            <p>{videos[0].name}</p>
          </iframe>
        </div>
        <div className="video-container-grid-2" style={{ margin: "10px" }}>
          {videos.map((video) => (
            <iframe
              key={video.key}
              src={`https://www.youtube.com/embed/${video.key}`}
            >
              <p>{video.name}</p>
            </iframe>
          ))}
        </div>
        <div className="picture-container-grid" style={{ margin: "10px" }}>
          {images.map((image) => (
            <img key={image} src={`https://image.tmdb.org/t/p/w500${image}`} />
          ))}
        </div>
      </div>
      <div className="movie-info">
        <h2 className="section-heading">Details:</h2>
        <p>{movie.overview}</p>
        <p>Release Date - {movie.releaseDate}</p>
        <p>Language - {movie.originalLanguage}</p>
        <p>Vote Count - {movie.voteCount}</p>
        <p>
          Runtime - {hours} hours {minutes} minutes
        </p>
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
        <div className="movie-section">
          <Container>
            <h2 className="section-heading">Top Cast:</h2>
            <Row>
              {cast.map((person) => (
                <Col sm={6} md={4} lg={3} className="mb-4" key={person.id}>
                  <div className="cast-member">
                    <img
                      className="cast-image"
                      src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                      alt={person.name}
                    />
                    <div className="cast-details">
                      <strong>{person.name}</strong>
                      <p className="character">Character: {person.character}</p>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
        <div className="movie-section">
          <Container>
            <h2 className="section-heading">Crew:</h2>
            <Row>
              {crew.map((person) => (
                <Col sm={6} md={4} lg={3} className="mb-4" key={person.id}>
                  <div className="cast-member">
                    <img
                      className="cast-image"
                      src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                      alt={person.name}
                    />
                    <div className="cast-details">
                      <strong>{person.name}</strong>
                      <p className="character">Job: {person.job}</p>
                      <p className="character">
                        Department: {person.department}
                      </p>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}
