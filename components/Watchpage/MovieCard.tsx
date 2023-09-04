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
  console.log(data.media_type);
  
  return (
    <Card className="w-[calc(33.3%-12px)]">
      <CardHeader className="h-[100px]">
        <CardTitle>{data.original_title || data.original_name}</CardTitle>
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
        <Link href={data.media_type && data.media_type === 'tv' ? `/watch/series/${data.id}` : `/watch/movie/${data.id}`}>
          <Button className="text-lg flex items-center gap-4">
            Watch <BsArrowRight />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
