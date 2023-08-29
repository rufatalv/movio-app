import Slider from "@/components/Slider";
import Preloader from "@/components/ui/loadingUI";
import { IMovie } from "@/types/types";
import { Suspense } from "react";
async function getMovieData(query: string) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGIyN2QzN2ExYmM1MDI4MGNlNmJlNDJkNjdhZTJiMiIsInN1YiI6IjYyOWM5N2VhOTkyZmU2MDA2NjgzMTE2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.i8SRfI-RxH1iiHMU2Bya4iPUUyezP-uqAqNYBvqiLwI",
    },
  };
  const res = fetch(
    `https://api.themoviedb.org/3/movie/${query}?language=en-US&page=1`,
    options
  );
  return (await res).json();
}
export default async function Home() {
const {results: nowPlaying }: {results: IMovie[]} =  await getMovieData('now_playing')
const {results: popularMovies }: {results: IMovie[]} =  await getMovieData('popular')
const {results: topRatedMovies }: {results: IMovie[]} =  await getMovieData('top_rated')

  return (
    <>
      <section id="hero">
        <Suspense fallback={<Preloader />}>
          <Slider title="Now Playing" data={nowPlaying} />
          <Slider title="Top Rated Movies" data={topRatedMovies} />
          <Slider title="Popular Movies" data={popularMovies} />
        </Suspense>
      </section>
    </>
  );
}
