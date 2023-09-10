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
import CustomButton from "@/components/CustomButton";

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
  useEffect(() => {
    const apiUrl = searchTerm
      ? `${searchUrl}&query=${searchTerm}&page=${currentPage}`
      : `${discoverUrl}&page=${currentPage}`;
    setLoading(true);
    fetch(apiUrl, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: apiKey,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setMovieData(response.results);
        setTotalPagesData(response.total_pages);
      })
      .then((response) => setLoading(false))
      .catch((err) => console.error(err));
  }, [searchTerm, currentPage, discoverUrl, searchUrl]);
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
  };
  return (
    <div className="container flex flex-col gap-4 mt-12 px-6 lg:px-0">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2">
        <Input
          id="movieName"
          register={register}
          className="w-11/12"
          htmlFor="movieName"
          placeholder="Type movie or TV Show Name"
          type="movieName"
          required
        />
        <CustomButton isLoading={false} type="submit" className="w-1/12 h-[58px] rounded-[8px] text-md font-normal">
          Search!
        </CustomButton>
      </form>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {loading ? (
          <div className="h-screen">
            <Preloader />
          </div>
        ) : (
          movieData.map((movie, idx) => <MovieCard data={movie} key={idx} />)
        )}
      </div>
      <Pagination
        onPageChange={handlePageChange}
        totalPages={totalPagesData}
        currentPage={currentPage}
      />
    </div>
  );
}
