"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import Input from "@/components/Input";
import Preloader from "@/components/ui/loadingUI";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@nextui-org/react";

export default function RegisterPageContent() {
  const [pageLoading, setPageLoading] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setPageLoading(true);
    setRequestLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Registered!");
        router.push("/auth/login");
      })
      .catch((error: any) => {
        toast.error("Error! Check your credentials!");
      })
      .finally(() => {
        setPageLoading(false);
        setRequestLoading(false);
      });
  };

  return (
    <div className="container mx-auto">
      <Card className="w-1/2 mx-auto relative mt-12 p-5">
        {pageLoading && <Preloader />}
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
              errors={errors}
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
              errors={errors}
            />
            <Input
              id="password"
              className=""
              register={register}
              required
              htmlFor="password"
              placeholder="Enter your password"
              type="password"
              errors={errors}
            />
            <Button
              type="submit"
              isLoading={requestLoading}
              className="h-10 px-4 gap-4 py-6 text-xl bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:!outline-none focus-visible:ring-0 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              color="primary">
              {requestLoading ? "Loading..." : "Register!"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
