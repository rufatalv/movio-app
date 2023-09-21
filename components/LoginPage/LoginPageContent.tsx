"use client";
import Input from "@/components/Input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Preloader from "@/components/ui/loadingUI";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiGithub } from "react-icons/fi";
import CustomButton from "../CustomButton";
import { BsGoogle } from "react-icons/bs";

export default function LoginPageContent() {
  const [loginLoading, setLoginLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
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
    setLoginLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setLoginLoading(false);

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
    setGithubLoading(true);
    signIn("github", { redirect: true, callbackUrl: "/" })
      .then(
        (res) => {
          if (res?.ok) {
            setGithubLoading(false);
          }
        },
        (err) => {
          toast.error(err.message);
        }
      )
      .then(() => {
        toast.success("Successfully logged in!");
      });
  };
  const handleGoogle = () => {
    signIn("google", { redirect: true, callbackUrl: "/" }).then(
      (res) => {
        toast.success("Successfully logged in!");
        if (res?.ok) {
          router.push("/");
          setGoogleLoading(false);
        }
      },
      (err) => {
        toast.error(err.message);
      }
    );
  };
  return (
    <Card className="w-1/2 mx-auto relative mt-12 p-5">
      {(githubLoading || loginLoading) && <Preloader />}
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
          <CustomButton
            isLoading={loginLoading}
            type="submit"
            className="text-xl py-6">
            Login
          </CustomButton>
        </form>
        <CustomButton
          isLoading={githubLoading}
          onClick={handleGithub}
          className="flex w-full mt-5 gap-4 text-xl py-6">
          Login with Github
          <FiGithub />
        </CustomButton>{" "}
        <CustomButton
          isLoading={googleLoading}
          onClick={handleGoogle}
          className="flex w-full mt-5 gap-4 text-xl py-6">
          Login with Google
          <BsGoogle />
        </CustomButton>
      </CardContent>
    </Card>
  );
}
