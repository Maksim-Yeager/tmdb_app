import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IMovieModel from "../models/MovieModel/IMovieModel";
import tmdbService from "../tmdbService";
import MovieModel from "../models/MovieModel/Moviemodel";
import MovieHorizontal from "../components/Cards/MovieHorizontalCard";
import "../styles/Movie.css";
import { Col, Container, Row } from "react-bootstrap";
import Recommendations from "../components/MovieDetails/Recommendations";
import Similar from "../components/MovieDetails/Similar";
import Review from "../components/MovieDetails/Reviews";
import CastAndCrew from "../components/MovieDetails/CastAndCrew";

interface Video {
  id: string;
  key: string;
  name: string;
}

export default function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState<IMovieModel | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);

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
        <Row style={{ background: "#555", color: "white" }}>
          <Col sm={9}>
            <h1>{movie.title}</h1>
          </Col>
          <Col sm={1}>
            <Row style={{ marginTop: "20px" }}>
              <p>IMDb rating</p>
            </Row>
            <Row>
              <p style={{ margin: "auto" }}>{roundedVoteAverage}/10</p>
            </Row>
          </Col>
          <Col sm={1}>
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
      {/*
      <Container style={{ margin: "auto", backgroundColor: "#555" }}>
        <Row xs="auto">
          <Col style={{ margin: "10px" }} xs={2}>
            <img
              style={{ width: "100%", height: "100%" }}
              src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
              alt={movie.title}
            />
          </Col>
          <Col xs={6} style={{ margin: "10px" }}>
            <iframe
              style={{ width: "100%", height: "100%" }}
              key={videos[0].key}
              src={`https://www.youtube.com/embed/${videos[0].key}`}
            >
              <p>{videos[0].name}</p>
            </iframe>
          </Col>
          <Col xs lg="2">
            <Row
              style={{
                margin: "10px",
                display: "flex",
                overflowX: "scroll",
                scrollSnapType: "x mandatory",
                marginBottom: "10px",
                height: "180px",
                width: "280px",
              }}
            >
              {videos.map((video) => (
                <iframe
                  key={video.key}
                  src={`https://www.youtube.com/embed/${video.key}`}
                >
                  <p>{video.name}</p>
                </iframe>
              ))}
            </Row>
            <Row
              style={{
                margin: "10px",
                display: "flex",
                overflowX: "scroll",
                scrollSnapType: "x mandatory",
                height: "180px",
                width: "280px",
              }}
            >
              {images.map((image) => (
                <img
                  key={image}
                  src={`https://image.tmdb.org/t/p/w500${image}`}
                />
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
*/}
      <div className="movie-info">
        <h2 className="section-heading">Details:</h2>
        <p>{movie.overview}</p>
        <p>Release Date - {movie.releaseDate}</p>
        <p>Language - {movie.originalLanguage}</p>
        <p>Vote Count - {movie.voteCount}</p>
        <p>
          Runtime - {hours} hours {minutes} minutes
        </p>
        <p>Budget - {movie.budget}$</p>
        <p>
          Genres -{" "}
          {movie.genres?.map((genre, index) => (
            <span key={genre.id}>
              {genre.name}
              {index !== (movie.genres?.length ?? 0) - 1 ? ", " : ""}
            </span>
          ))}
        </p>
        <Recommendations />
        <Similar />
        <Review />
        <CastAndCrew />
      </div>
    </div>
  );
}
