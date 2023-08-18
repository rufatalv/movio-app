"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="container">
      <Card className="mt-20 w-11/12 md:w-10/12 lg:w-1/2 mx-auto">
        <CardHeader>
          <CardTitle className="text-lg sm:text-2xl md:text-4xl">Not Found!</CardTitle>
          <CardDescription className="text-lg md:text-2xl">
            Oh no! It seems like the page you&apos;re looking is lost in space.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-base md:text-xl font-medium">Please return to previous page!</p>
          <Button
            className="mt-6 text-lg tracking-wider"
            onClick={() => router.back()}
            size={"lg"}>
            Go back!
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
