/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Card } from "@/components/ui/card";
import { IMovie } from "@/types/types";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";

export default function WatchMoviePage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(false);
  const [movieData, setMovieData] = useState<IMovie>();
  const [availableSeasons, setAvailableSeasons] = useState<number[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<number>(1);

  const apiKey =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGIyN2QzN2ExYmM1MDI4MGNlNmJlNDJkNjdhZTJiMiIsInN1YiI6IjYyOWM5N2VhOTkyZmU2MDA2NjgzMTE2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.i8SRfI-RxH1iiHMU2Bya4iPUUyezP-uqAqNYBvqiLwI";

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: apiKey,
    },
  };
  const apiUrl = `https://api.themoviedb.org/3/tv/${params.id}?language=en-US`;
  useEffect(() => {
    setLoading(true);
    fetch(apiUrl, options)
      .then((response) => response.json())
      .then((response) => {
        setMovieData(response);
        if (response.seasons && response.seasons.length > 0) {
          const today = moment();
          const availableSeasonNumbers = response.seasons
            .filter(
              (season: any) =>
                moment(season.air_date).isBefore(today) &&
                season.season_number !== 0
            )
            .map((season: any) => season.season_number);
          setAvailableSeasons(availableSeasonNumbers);
          setSelectedSeason(availableSeasonNumbers[0]);
        }
      })
      .then(() => setLoading(false))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mt-8 px-6">
      <Suspense fallback={<p>Loading...</p>}>
        <Card className="flex flex-col gap-6 border-slate-400/50 p-5">
          {movieData?.id ? (
            <div>
              <iframe
                width="100%"
                height="720px"
                src={`https://vidsrc.to/embed/tv/${movieData?.id}/${selectedSeason}`}
                allowFullScreen
                title="Embedded Video"></iframe>
            </div>
          ) : (
            <div className="w-full h-[720px] bg-slate-400/50"></div>
          )}
          <hr className="bg-primary border-primary border opacity-25 " />
          <div className="flex flex-wrap justify-center gap-2">
            {availableSeasons.map((seasonNumber) => (
              <button
                key={seasonNumber}
                className={`${
                  selectedSeason === seasonNumber
                    ? "bg-primary text-white"
                    : "bg-white text-primary"
                } px-4 py-2 rounded-md transition-all`}
                onClick={() => setSelectedSeason(seasonNumber)}>
                Season {seasonNumber}
              </button>
            ))}
          </div>
          <hr className="bg-primary border-primary border opacity-25 " />
          <div className="flex gap-5">
            <div className="h-[600px] rounded-lg overflow-hidden w-[400px]">
              <img
                src={
                  "https://image.tmdb.org/t/p/original/" +
                  movieData?.poster_path
                }
                className="w-full h-full  rounded-2.5xl"
                width={800}
                height={1600}
                alt="image"
              />
            </div>
            <div className="w-1/2 flex gap-6 flex-col">
              <h1 className="font-medium text-4xl">
                {movieData?.original_name}
              </h1>
              <p className="font-medium text-2xl">
                {movieData?.first_air_date}
              </p>
              <p className="font-medium text-base opacity-75">
                {movieData?.overview}
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex gap-1">
                  <p>Genres:</p>
                  <p className="flex gap-1">
                    {movieData?.genres.map((genre, index) => (
                      <span key={genre.id}>
                        <Link
                          className="hover:text-slate-400 transition-all"
                          href={"/genres/" + genre.name}>
                          {genre.name}
                        </Link>
                        {index < movieData.genres.length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                </div>
                <div className="flex gap-1">
                  <p>Production:</p>
                  <p className="flex gap-1 flex-wrap">
                    {movieData?.production_companies.map((company, index) => (
                      <span key={company.id}>
                        <Link
                          className="hover:text-slate-400 transition-all"
                          href={"/production/" + company.name}>
                          {company.name}
                        </Link>
                        {index < movieData.production_companies.length - 1 &&
                          ", "}
                      </span>
                    ))}
                  </p>
                </div>
                <div className="flex gap-1">
                  <p>Release:</p>
                  <p className="flex gap-1">
                    {moment(movieData?.first_air_date).format("YYYY, MMM DD")}
                  </p>
                </div>
                <div className="flex gap-1">
                  <p>Genres:</p>
                  <p className="flex gap-1">
                    {movieData?.genres.map((genre, index) => (
                      <span key={genre.id}>
                        <Link
                          className="hover:text-slate-400 transition-all"
                          href={"/genres/" + genre.name}>
                          {genre.name}
                        </Link>
                        {index < movieData.genres.length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Suspense>
    </div>
  );
}
