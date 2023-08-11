import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import StringUtil from '../../utilities/StringUtil';
import IMovieModel from '../../models/MovieModel/IMovieModel';
import { Link } from 'react-router-dom';



function MovieVertical({ id, title, overview, posterPath }: IMovieModel) {
  const maxWords = 81;

  return (
    <Card style={{ minWidth: "300px", minHeight: "205px", maxWidth: "400px", maxHeight: "666px", }}>
      <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${posterPath}`} alt={title} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {StringUtil.shortenText(overview, maxWords)}
        </Card.Text>
        <Link to={`/movie-details/${id}`}>
          <Button variant="primary">Read more</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default MovieVertical;
