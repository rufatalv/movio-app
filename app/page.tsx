import Slider from "@/components/Slider";
import { IMovie } from "@/types/types";
import { Suspense } from "react";

async function getMovieData(
  query: string,
  type: string
): Promise<{ results: IMovie[] }> {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGIyN2QzN2ExYmM1MDI4MGNlNmJlNDJkNjdhZTJiMiIsInN1YiI6IjYyOWM5N2VhOTkyZmU2MDA2NjgzMTE2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.i8SRfI-RxH1iiHMU2Bya4iPUUyezP-uqAqNYBvqiLwI",
    },
  };

  const res = await fetch(
    `https://api.themoviedb.org/3/${type}/${query}?language=en-US&page=1`,
    options
  );

  return res.json();
}

export default async function Home() {
  const [
    { results: nowPlayingMovies },
    { results: popularMovies },
    { results: topRatedMovies },
    { results: topRatedSeries },
  ] = await Promise.all([
    getMovieData("now_playing", "movie"),
    getMovieData("popular", "movie"),
    getMovieData("top_rated", "movie"),
    getMovieData("top_rated", "tv"),
  ]);

  return (
    <>
      <section id="hero" className="container overflow-hidden px-6 lg:px-0">
        <Slider
          className="md:w-full"
          title="Now Playing Movies"
          data={nowPlayingMovies}
        />
        <div className="flex flex-row md:flex-row gap-6">
          <Slider
            size="sm"
            className="w-full md:w-1/4"
            title="Top Rated Movies"
            data={topRatedMovies}
          />
          <Slider
            size="sm"
            className="w-full md:w-1/4"
            title="Popular Movies"
            data={popularMovies}
          />
        </div>
        <Slider
          className="md:w-full mb-20"
          title="Top Rated TV Shows"
          data={topRatedSeries}
        />
      </section>
    </>
  );
}
