export interface IMovie {
  adult: boolean;
  key: string | number;
  backdrop_path: string;
  genre_ids: number[];
  genres: IGenre[];
  production_companies: ICompany[];
  id: number;
  imdb_id: string | undefined;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export interface ICompany {
  id: number;
  name: string;
  origin_country: string;
}
export interface IGenre {
  id: number;
  name: string;
}
