"use client";
import { Card } from "@/components/ui/card";
import Preloader from "@/components/ui/loadingUI";
import { IMovie } from "@/types/types";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function WatchMoviePage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(false);
  const [movieData, setMovieData] = useState<IMovie>();
  const apiKey =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGIyN2QzN2ExYmM1MDI4MGNlNmJlNDJkNjdhZTJiMiIsInN1YiI6IjYyOWM5N2VhOTkyZmU2MDA2NjgzMTE2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.i8SRfI-RxH1iiHMU2Bya4iPUUyezP-uqAqNYBvqiLwI";

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: apiKey,
    },
  };
  const apiUrl = `https://api.themoviedb.org/3/movie/${params.id}?language=en-US`;
  useEffect(() => {
    setLoading(true);
    fetch(apiUrl, options)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        setMovieData(response);
      })
      .then((response) => setLoading(false))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="container mt-8 px-6">
      {loading && (
        <div className="h-[700px]">
          <Preloader />
        </div>
      )}
      <Card className="flex flex-col gap-6 border-slate-400/50 p-5">
        {movieData?.imdb_id ? (
          <div>
            <iframe
              width="100%"
              height="720px"
              src={`https://vidsrc.to/embed/movie/${movieData?.imdb_id}`}
              allowFullScreen
              title="Embedded Video"></iframe>
          </div>
        ) : (
          <div className="w-full h-[720px] bg-black"></div>
        )}
        <hr className="bg-primary border-primary border opacity-25 " />
        <div className="flex gap-5">
          <div className="h-[600px] rounded-lg overflow-hidden w-[400px]">
            <Image
              src={
                "https://image.tmdb.org/t/p/original/" + movieData?.poster_path
              }
              className="w-full h-full  rounded-2.5xl"
              width={800}
              height={1600}
              alt="image"
            />
          </div>
          <div className="w-1/2 flex flex-col">
            <h1 className="font-medium text-4xl">{movieData?.title}</h1>
            <p className="font-medium text-base opacity-75">
              {movieData?.overview}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
