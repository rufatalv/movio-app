"use client";
import Input from "@/components/Input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    toast.success('Samil')
  };
  return (
    <div className="container mx-auto">
      <Card className="w-1/2 mx-auto mt-12 p-5">
        <CardHeader className="text-4xl mb-6 font-bold">
          Login to your account!
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
