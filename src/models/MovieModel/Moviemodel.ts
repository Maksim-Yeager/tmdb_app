import Genre from "./Genre";
import IMovieModel from "./IMovieModel";

export default class MovieModel implements IMovieModel { 
  id: number;
  title: string;
  overview: string;
  posterPath: string;
  releaseDate: string;
  originalLanguage: string;
  popularity: number;
  voteAverage: number;
  voteCount: number;
  runtime: number;
  budget: number;
  genres: Genre[];

  constructor();
  constructor(obj?: IMovieModel);
  constructor(obj?: any) {
    this.id = obj && obj.id;
    this.title = obj && obj.title;
    this.overview = obj && obj.overview;
    this.posterPath = obj && (obj.posterPath || obj.poster_path);
    this.releaseDate = obj && (obj.releaseDate || obj.release_date);
    this.originalLanguage = obj && (obj.originalLanguage || obj.original_language);
    this.popularity = obj && obj.popularity;
    this.voteAverage = obj && (obj.voteAverage || obj.vote_average);
    this.voteCount = obj && (obj.voteCount || obj.vote_count);
    this.runtime = obj && obj.runtime;
    this.budget = obj && obj.budget;
    this.genres = obj && obj.genres;
  }
}