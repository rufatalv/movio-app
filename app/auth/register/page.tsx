"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import Input from "@/components/Input";
import Preloader from "@/components/ui/loadingUI";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();


  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Registered!");
        router.push('/auth/login')
      })
      .catch((error: any) => {
        toast.error("Error! Check your credentials!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container mx-auto">
      <Card className="w-1/2 mx-auto relative mt-12 p-5">
        {loading && <Preloader />}
        <CardHeader className="text-4xl mb-6 font-bold">
          Register your account!
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5">
            <Input
              id="name"
              className=""
              htmlFor="name"
              register={register}
              placeholder="Enter your name"
              type="text"
              required
            />
            <Input
              id="email"
              register={register}
              className=""
              htmlFor="email"
              placeholder="Enter your email"
              type="email"
              required
            />
            <Input
              id="password"
              className=""
              register={register}
              required
              htmlFor="password"
              placeholder="Enter your password"
              type="password"
            />
            <Button type="submit" className="text-xl py-6">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
