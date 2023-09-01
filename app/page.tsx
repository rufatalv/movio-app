import Slider from "@/components/Slider";
import { IMovie } from "@/types/types";
import { Suspense } from "react";

async function getMovieData(query: string): Promise<{ results: IMovie[] }> {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGIyN2QzN2ExYmM1MDI4MGNlNmJlNDJkNjdhZTJiMiIsInN1YiI6IjYyOWM5N2VhOTkyZmU2MDA2NjgzMTE2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.i8SRfI-RxH1iiHMU2Bya4iPUUyezP-uqAqNYBvqiLwI",
    },
  };

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${query}?language=en-US&page=1`,
    options
  );

  return res.json();
}

export default async function Home() {
  const [
    { results: nowPlaying },
    { results: popularMovies },
    { results: topRatedMovies },
  ] = await Promise.all([
    getMovieData("now_playing"),
    getMovieData("popular"),
    getMovieData("top_rated"),
  ]);

  return (
    <>
        <section id="hero">
          <Slider title="Now Playing" data={nowPlaying} />
          <Slider title="Top Rated Movies" data={topRatedMovies} />
          <Slider title="Popular Movies" data={popularMovies} />
        </section>
    </>
  );
}
