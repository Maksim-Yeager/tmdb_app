import React, { useState, useRef, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import axios from "axios";
import MovieModel from "../models/MovieModel/Moviemodel";
import "../styles/headerStyle.css";

function Header() {
  const [movies, setMovies] = useState<MovieModel[] | null>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const [movieClicked, setMovieClicked] = useState(false);

  function debounce(callback: (query: string) => void, delay: number = 500) {
    let timer: NodeJS.Timeout;
    return (query: string) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback(query);
      }, delay);
    };
  }

  const debouncedSearch = debounce(handleSearchResults);

  async function handleSearchResults(query: string) {
    const response = await axios.get(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: {
          api_key: process.env.REACT_APP_KEY,
          query: query,
        },
      }
    );

    const results = response.data.results.map(
      (movieData: any) => new MovieModel(movieData)
    );

    setMovies(results);
  }

  useEffect(() => {
    if (movieClicked) {
      setMovies(null);
      setMovieClicked(false);
    }
  }, [movieClicked]);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setMovies(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [suggestionsRef]);

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Navbar.Brand>Movie World</Navbar.Brand>
          </Link>
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            <SearchBar onSearch={debouncedSearch} />
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <div className="suggestions" ref={suggestionsRef}>
          {
            <div className="movie-suggestion-container">
              {movies?.map((movie) => (
                <Link
                  to={`/movie-details/${movie.id}`}
                  className="movie-suggestion-link"
                  key={movie.id}
                  onClick={() => setMovieClicked(true)}
                >
                  <div className="movie-suggestion">
                    <img
                      style={{ width: "40px", marginRight: "10px" }}
                      src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                      alt={movie.title}
                    />
                    {movie.title}
                  </div>
                </Link>
              ))}
            </div>
          }
        </div>
      </Container>
    </>
  );
}

export default Header;