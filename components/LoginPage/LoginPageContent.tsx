"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Input from "@/components/Input";
import Preloader from "@/components/ui/loadingUI";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FiGithub } from "react-icons/fi";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

export default function LoginPageContent() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setLoading(false);

      if (callback?.ok) {
        toast.success("Successfully logged in!");
        router.push("/");
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };
  const handleGithub = () => {
    signIn("github", { redirect: true, callbackUrl: "/" }).then(
      (res) => {
        toast.success("Successfully logged in!");
        if (res?.ok) {
          router.push("/");
        }
      },
      (err) => {
        toast.error(err.message);
      }
    );
  };
  return (
    <Card className="w-1/2 mx-auto relative mt-12 p-5">
      {loading && <Preloader />}
      <CardHeader className="text-4xl mb-6 font-bold">
        Login to your account!
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <Input
            id="email"
            register={register}
            className=""
            htmlFor="email"
            placeholder="Enter your email"
            type="email"
            errors={errors}
            required
          />
          <Input
            id="password"
            className=""
            register={register}
            required
            errors={errors}
            htmlFor="password"
            placeholder="Enter your password"
            type="password"
          />
          <Button type="submit" className="text-xl py-6">
            Login
          </Button>
        </form>
        <Button
          onClick={handleGithub}
          className="flex w-full mt-5 gap-4 text-xl py-6">
          Login with Github
          <FiGithub />
        </Button>
      </CardContent>
    </Card>
  );
}
