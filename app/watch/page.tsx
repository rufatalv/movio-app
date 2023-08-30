"use client";
import Input from "@/components/Input";
import MovieCard from "@/components/Watchpage/MovieCard";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

export default function WatchPage() {
  const [movieData, setMovieData] = useState([]);
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
    console.log(data);
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
          placeholder="Movie name"
          type="movieName"
          required
        />
        <Button type="submit" className="py-6 px-8 text-lg">
          Search!
        </Button>
      </form>
      <div className="flex flex-wrap px-6 gap-2">
        {/* {isLoading === true && <Loading />} */}
        {/* data && */}
          {/* // movieData.map((movie, idx) =>
           <MovieCard data={movie} key={idx} />)} */}
      </div>
    </div>
  );
}
