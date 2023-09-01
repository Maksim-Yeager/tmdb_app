import Genre from "./Genre";

export default interface IMovieModel {
    id: number;
    title: string;
    overview: string;
    posterPath: string;
    releaseDate?: string;
    originalLanguage?: string;
    popularity?: number;
    voteAverage?: number;
    voteCount?: number;
    runtime?: number;
    budget?: number;
    genres?: Genre[];
}
