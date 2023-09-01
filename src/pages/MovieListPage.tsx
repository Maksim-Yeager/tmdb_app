import React, { useState } from "react";
import MoviesList from "../components/MovieList";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import MovieCardTypes from "../types/MovieCardTypes";

const Home: React.FC = () => {
  const preferredView = localStorage.getItem("view");
  const [currentVisibility, setVisibility] = useState(
    preferredView === "horizontal"
      ? MovieCardTypes.HORIZONTAL
      : MovieCardTypes.VERTICAL
  );

  function hendleOnClickHorizontal() {
    setVisibility(MovieCardTypes.HORIZONTAL);

    localStorage.setItem("view", "horizontal");
  }

  function hendleOnClickVertical() {
    setVisibility(MovieCardTypes.VERTICAL);

    localStorage.setItem("view", "vertical");
  }
  return (
    <div>
      <ButtonGroup style={{margin: "10px"}} aria-label="Basic example">
        <Button variant="warning" onClick={hendleOnClickVertical}>
          <img style={{width: "30px"}} src="/images/view-1.png" alt="View 1" />
        </Button>
        <Button variant="warning" onClick={hendleOnClickHorizontal}>
          <img style={{width: "40px"}} src="/images/view-2.png" alt="View 2" />
        </Button>
      </ButtonGroup>

      <MoviesList category="popular" cardShowType={currentVisibility} />
      <MoviesList category="upcoming" cardShowType={currentVisibility} />
      <MoviesList category="top_rated" cardShowType={currentVisibility} />
      <MoviesList category="now_playing" cardShowType={currentVisibility} />
    </div>
  );
};

export default Home;
