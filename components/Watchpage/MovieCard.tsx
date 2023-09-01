import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { BsArrowRight } from "react-icons/bs";
import { IMovie } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
interface Props {
  data: IMovie;
  key: number | string;
}
export default function MovieCard({ data }: Props) {
  return (
    <Card className="w-[calc(33.3%-12px)]">
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[600px] w-full">
          <Image
            src={"https://image.tmdb.org/t/p/original/" + data.poster_path}
            className="w-full h-full select-none object-cover rounded-2.5xl"
            width={500}
            height={500}
            alt="image"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Link href={"/watch/" + data.id}>
          <Button className="text-lg flex items-center gap-4">
            Watch <BsArrowRight />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
