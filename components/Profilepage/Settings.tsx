/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Preloader from "../ui/loadingUI";
import CustomButton from "../CustomButton";

export default function Settings({ user }: { user: User }) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/user", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const result = await res.json();
        console.log("User updated:", result);
        setIsLoading(false)
        toast.success("Updated successfully!");
        router.refresh();
      } else {
        const errorData = await res.json();
        setIsLoading(false)
        console.error("Error updating user:", errorData);
      }
    } catch (error) {
      setIsLoading(false)
      console.error("An error occurred:", error);
    }
  };

  return (
    <Card className="container relative px-6 lg:px-0 border-slate-400/70 mt-12">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Tabs defaultValue="account" className="p-5">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you&apos;re
                  done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    {...register("name")}
                    id="name"
                    defaultValue={user?.name!}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    {...register("email")}
                    defaultValue={user?.email!}
                  />
                </div>
                <div className="space-y-1 flex justify-between gap-4">
                  <div className="flex flex-col w-full gap-1">
                    <Label htmlFor="email">Image</Label>
                    <Input
                      id="image"
                      {...register("image")}
                      defaultValue={user?.image!}
                    />
                    <Label className="mt-2" htmlFor="email">
                      Bio
                    </Label>
                    <Input
                      id="bio"
                      {...register("bio")}
                      defaultValue={user?.bio!}
                    />
                  </div>
                  <div className="bg-smokyblack/10 w-fit p-2 border border-slate/60 rounded-lg">
                    <img src={user?.image! || ""} width={128} height={128} />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <CustomButton className="px-4 py-2 h-10 text-sm font-medium" isLoading={isLoading} type="submit">Save changes</CustomButton>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you&apos;ll be logged
                  out.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Current password</Label>
                  <Input
                    {...register("currentPassword")}
                    id="current"
                    type="password"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">New password</Label>
                  <Input
                    {...register("newPassword")}
                    id="new"
                    type="password"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <CustomButton isLoading={isLoading} type="submit">Save password</CustomButton>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </Card>
  );
}
