"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/components/Input";

export default function WatchPage() {
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
    <div className="container mt-12 px-6 lg:px-0">
      <Card>
        <CardHeader>
          <CardTitle>Search for movies</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-center gap-6">
            <Input
              id="movieName"
              register={register}
              required
              htmlFor="movieName"
              className="focus:outline-none relative w-full focus-visible:ring-0 border-slate-400/50"
              type="text"
              placeholder="Movie Name"
            />
            <Button type="submit" className="py-6 px-8 text-lg">
              Search!
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
