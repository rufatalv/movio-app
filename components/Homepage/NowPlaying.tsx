import * as React from "react";
import { Card, CardHeader } from "../ui/card";
import NowPlayingSlider from "./NowPlayingSlider";
interface INowPlayingProps {}

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
const NowPlaying: React.FC<INowPlayingProps> = async (props) => {
  const { results } = await getData();
  const data = results;
  return (
    <Card className="container mt-12 border-slate-400/50">
      <CardHeader>
        <h1 className="text-4xl font-medium">Now Playing</h1>
      </CardHeader>
      <NowPlayingSlider data={data} />
    </Card>
  );
};

export default NowPlaying;
