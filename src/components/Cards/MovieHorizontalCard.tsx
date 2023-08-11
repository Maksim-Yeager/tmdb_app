import React from 'react';
import Card from 'react-bootstrap/Card';
import StringUtil from '../../utilities/StringUtil';
import IMovieModel from '../../models/MovieModel/IMovieModel';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';


function MovieHorizontal({ id, title, overview, posterPath }: IMovieModel) {
  const maxWords = 60;

  return (
    <Card style={{
      minWidth: "300px", minHeight: "205px", maxWidth: "300px", maxHeight: "210px",
    }}>
      <Row>
        <Col>
          <Card.Img
            src={`https://image.tmdb.org/t/p/w500${posterPath}`}
            className="card-img"
            alt={title}
          />
        </Col>
        <Col>
          <Card.Body>
            <Card.Title style={{ fontSize: 12 }}>{title}</Card.Title>
            <Card.Text className="card-text" style={{ fontSize: 12 }}>{StringUtil.shortenText(overview, maxWords)}</Card.Text>
            <Link to={`/movie-details/${id}`}>
              <Button variant="primary">Read more</Button>
            </Link>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default MovieHorizontal;
