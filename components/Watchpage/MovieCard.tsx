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
    <Card className="w-full">
      <CardHeader className="">
        <CardTitle>{data.original_title || data.original_name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className=" w-full min-h-[350px]">
          <Image
            src={"https://image.tmdb.org/t/p/original/" + data.poster_path}
            className="w-full h-auto"
            width={500}
            height={500}
            alt="image"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Link href={data.media_type && data.media_type === 'tv' ? `/watch/series/${data.id}` : `/watch/movie/${data.id}`}>
          <Button className="text-lg flex items-center gap-4">
            Watch <BsArrowRight />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
