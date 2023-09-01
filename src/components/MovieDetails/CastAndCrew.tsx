import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IMovieModel from "../../models/MovieModel/IMovieModel";
import tmdbService from "../../tmdbService";
import MovieModel from "../../models/MovieModel/Moviemodel";
import MovieHorizontal from "../Cards/MovieHorizontalCard";
import { Col, Container, Row } from "react-bootstrap";
import "../../styles/Movie.css";

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

export default function CastAndCrew() {
  const { id } = useParams();

  const [cast, setCast] = useState<CastMember[]>([]);
  const [crew, setCrew] = useState<CrewMember[]>([]);
  useEffect(() => {
    const fetchCastAndCrew = async () => {
        const response = await tmdbService.get(
          `https://api.themoviedb.org/3/movie/${id}/credits`
        );
  
        setCast(response.data.cast);
        setCrew(response.data.crew);
      };
  
      fetchCastAndCrew();
  }, [id]);

  return (
    <>
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
    </>
  );
}
