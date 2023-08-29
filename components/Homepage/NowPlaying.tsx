"use client";

import { IMovie } from "@/types/types";
import Image from "next/image";
import { useState } from "react";
import "swiper/css";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface Props {
  data: IMovie[];
}

const NowPlaying: React.FC<Props> = ({ data }: Props) => {
  const [_, setInit] = useState<boolean>();

  return (
    <Card className="container mt-10 px-6 lg:px-0 font-sf font-semibold">
      <CardHeader className="flex flex-col">
        <div className="flex text-darkgray justify-between items-center">
          <CardTitle className="text-2xl">Now playing</CardTitle>
          <div className="flex items-center gap-6">
            <BsChevronLeft />
            <BsChevronRight />
          </div>
        </div>
        <CardDescription>New releases every month!</CardDescription>
      </CardHeader>

      <CardContent className="">
        <Swiper
          spaceBetween={24}
          speed={700}
          effect="fade"
          onInit={() => setInit(true)}
          modules={[Navigation, Pagination, EffectFade]}>
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="w-full h-[470px] relative">
                <Image
                  src={
                    "https://image.tmdb.org/t/p/original/" + item.backdrop_path
                  }
                  className="w-full h-full select-none object-cover rounded-2.5xl"
                  width={1200}
                  height={500}
                  alt="image"
                />
                <div className="absolute flex flex-col p-5 bottom-0 text-white z-[5]">
                  <h1 className=" text-4xl">{item.title}</h1>
                  <h4 className=" text-lg font-light max-w-3xl">
                    {item.overview}
                  </h4>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/75"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </CardContent>
    </Card>
  );
};

export default NowPlaying;
