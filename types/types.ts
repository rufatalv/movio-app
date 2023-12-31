import { User } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
export interface IUser {
  currentUser?: SafeUser | null;
}
export interface IMovie {
  adult: boolean;
  key: string | number;
  name: string;
  backdrop_path: string;
  genre_ids: number[];
  genres: IGenre[];
  production_companies: ICompany[];
  id: number;
  imdb_id: string | undefined;
  media_type: "tv" | "movie";
  first_air_date: string;
  original_language: string;
  number_of_seasons: number;
  original_name: string;
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
