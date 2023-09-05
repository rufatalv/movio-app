"use client";
import Input from "@/components/Input";
import MovieCard from "@/components/Watchpage/MovieCard";
import { Button } from "@/components/ui/button";
import { IMovie } from "@/types/types";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Preloader from "@/components/ui/loadingUI";
import Pagination from "@/components/Pagination";

export default function WatchPage() {
  const [movieData, setMovieData] = useState<IMovie[]>([]);
  const [totalPagesData, setTotalPagesData] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const baseApiUrl = "https://api.themoviedb.org/3";
  const apiKey =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGIyN2QzN2ExYmM1MDI4MGNlNmJlNDJkNjdhZTJiMiIsInN1YiI6IjYyOWM5N2VhOTkyZmU2MDA2NjgzMTE2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.i8SRfI-RxH1iiHMU2Bya4iPUUyezP-uqAqNYBvqiLwI";

  const discoverUrl = `${baseApiUrl}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${currentPage}&sort_by=popularity.desc`;
  const searchUrl = `${baseApiUrl}/search/multi?include_adult=false&language=en-US&page=${currentPage}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: apiKey,
    },
  };
  useEffect(() => {
    const apiUrl = searchTerm
      ? `${searchUrl}&query=${searchTerm}`
      : discoverUrl;
    setLoading(true);
    fetch(apiUrl, options)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        setMovieData(response.results);
        setTotalPagesData(response.total_pages);
      })
      .then((response) => setLoading(false))
      .catch((err) => console.error(err));
  }, [searchTerm, discoverUrl, searchUrl]);
  useEffect(() => {
    console.log(searchTerm);
  }, [searchTerm]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      movieName: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setSearchTerm(data.movieName);
  };
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    console.log(`Page changed to ${newPage}`);
  };
  return (
    <div className="container flex flex-col gap-4 mt-12 px-6 lg:px-0">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-6">
        <Input
          id="movieName"
          register={register}
          className=""
          htmlFor="movieName"
          placeholder="Type movie or TV Show Name"
          type="movieName"
          required
        />
        <Button type="submit" className="py-6 px-8 text-lg">
          Search!
        </Button>
      </form>
      <div className="flex flex-wrap px-6 gap-2">
        {loading ? (
          <div className="h-[700px]">
            <Preloader />
          </div>
        ) : (
          movieData.map((movie, idx) => <MovieCard data={movie} key={idx} />)
        )}
      </div>
      <Pagination
        onPageChange={handlePageChange}
        totalPages={20}
        currentPage={currentPage}
      />
    </div>
  );
}
