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
    <div className="w-1/4 p-4">
      <div className="bg-white rounded-lg shadow-lg">
        <img
          src={"https://image.tmdb.org/t/p/original/" + data.poster_path}
          alt={data.original_title}
          className="w-full h-auto rounded-t-lg"
        />
        <div className="p-4">
          <h2 className="text-xl h-16 font-semibold">{data.title}</h2>
          <p className="text-gray-500">{data.release_date}</p>
          <p className="mt-2 line-clamp-3">{data.overview}</p>
        </div>
      </div>
    </div>
    // <Card className="w-[calc(33.3%-12px)]">
    //   <CardHeader className="h-[100px]">
    //     <CardTitle>{data.original_title || data.original_name}</CardTitle>
    //     <CardDescription></CardDescription>
    //   </CardHeader>
    //   <CardContent>
    //     <div className="h-[600px] w-full">
    //       <Image
    //         src={"https://image.tmdb.org/t/p/original/" + data.poster_path}
    //         className="w-full h-full select-none object-cover rounded-2.5xl"
    //         width={500}
    //         height={500}
    //         alt="image"
    //       />
    //     </div>
    //   </CardContent>
    //   <CardFooter>
    //     <Link href={data.media_type && data.media_type === 'tv' ? `/watch/series/${data.id}` : `/watch/movie/${data.id}`}>
    //       <Button className="text-lg flex items-center gap-4">
    //         Watch <BsArrowRight />
    //       </Button>
    //     </Link>
    //   </CardFooter>
    // </Card>
  );
}
