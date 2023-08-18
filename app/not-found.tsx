"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="container ">
      <Card className="mt-20 w-1/2 mx-auto">
        <CardHeader>
          <CardTitle className="text-4xl">Not Found!</CardTitle>
          <CardDescription className="text-2xl">
            Oh no! It seems like the page you&apos;re looking is lost in space.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-medium">Please return to previous page!</p>
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
