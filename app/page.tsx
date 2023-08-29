import NowPlaying from "@/components/Homepage/NowPlaying";
import { IMovie } from "@/types/types";
async function getData() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGIyN2QzN2ExYmM1MDI4MGNlNmJlNDJkNjdhZTJiMiIsInN1YiI6IjYyOWM5N2VhOTkyZmU2MDA2NjgzMTE2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.i8SRfI-RxH1iiHMU2Bya4iPUUyezP-uqAqNYBvqiLwI",
    },
  };

  const res = fetch(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
    options
  );
  return (await res).json();
}
export default async function Home() {
  const { results } = await getData();
  const data: IMovie[] = results;
  return (
    <>
      <section id="hero">
        <NowPlaying data={data} />
      </section>
    </>
  );
}
