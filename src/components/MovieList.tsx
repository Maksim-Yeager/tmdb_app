import React, { useEffect, useState, useRef } from "react";
import tmdbService from "../tmdbService";
import IMovieModel from "../models/MovieModel/IMovieModel";
import MovieCardTypes from "../types/MovieCardTypes";
import MovieHorizontal from "./Cards/MovieHorizontalCard";
import MovieVertical from "./Cards/MovieVerticalCard";
import MovieModel from "../models/MovieModel/Moviemodel";
import Container from "react-bootstrap/Container";

type CategoryProps = {
  category: string;
  cardShowType?: MovieCardTypes;
};

let categoryName: string;

function MovieList({
  category,
  cardShowType = MovieCardTypes.VERTICAL,
}: CategoryProps) {
  const [movies, setMovies] = useState<IMovieModel[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const response = await tmdbService.get(`/movie/${category}`, {
        params: { page: currentPage },
      });
      const newMovies = response.data.results.map(
        (v: IMovieModel) => new MovieModel(v)
      );
      if (currentPage === 1) {
        setMovies(newMovies);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...newMovies]);
      }
      setTotalPages(response.data.total_pages);
      setLoading(false);
    };

    fetchMovies();
  }, [category, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    setMovies([]);
  }, [category]);

  function handleScroll() {
    if (
      containerRef?.current &&
      containerRef.current.scrollLeft + containerRef.current.clientWidth >=
        containerRef.current.scrollWidth - 3
    ) {
      setCurrentPage((prevPage) => prevPage + 1);
    } 
  }

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
      return () => {
        containerRef.current?.removeEventListener("scroll", handleScroll);
      };
    }
  }, [currentPage]);

  category === "top_rated"
    ? (categoryName = "Top Rated")
    : category === "popular"
    ? (categoryName = "Popular")
    : category === "now_playing"
    ? (categoryName = "Now Playing")
    : category === "upcoming"
    ? (categoryName = "Upcoming")
    : (categoryName = category);

  return (
    <Container>
      <h1 className="mb-4">{categoryName} Movies</h1>
      <div
        ref={containerRef}
        style={{
          display: "flex",
          overflowX: "scroll",
          overflowY: "hidden",
          scrollSnapType: "x mandatory",
          border: "solid 3px black",
          borderRadius: "10px",
        }}
      >
        {movies.map((movie) => (
          <div key={movie.id}>
            {cardShowType === MovieCardTypes.VERTICAL && (
              <MovieVertical
                key={movie.id}
                id={movie.id}
                title={movie.title}
                overview={movie.overview}
                posterPath={movie.posterPath}
              />
            )}
            {cardShowType === MovieCardTypes.HORIZONTAL && (
              <MovieHorizontal
                key={movie.id}
                id={movie.id}
                title={movie.title}
                overview={movie.overview}
                posterPath={movie.posterPath}
              />
            )}
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
    </Container>
  );
}

export default MovieList;
