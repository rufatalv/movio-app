"use client";

import { IMovie } from "@/types/types";
import Image from "next/image";
import { useRef, useState } from "react";
import { BsArrowRight, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

interface Props {
  data: IMovie[];
  title: string;
  className?: string;
}

const SliderSmall: React.FC<Props> = ({ data, className, title }: Props) => {
  const [_, setInit] = useState<boolean>();
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  return (
    <Card
      className={`bg-white/40 flex-1 border-slate-400/70 mt-10 font-sf font-semibold ${className}`}>
      <CardHeader className="!select-none flex flex-col">
        <div className="flex text-darkgray justify-between items-center">
          <CardTitle className="text-2xl">{title}</CardTitle>
          <div className="flex items-center gap-6">
            <div className="cursor-pointer md:text-2xl" ref={prevButtonRef}>
              <BsChevronLeft />
            </div>
            <div className="cursor-pointer md:text-2xl" ref={nextButtonRef}>
              <BsChevronRight />
            </div>
          </div>
        </div>
        <CardDescription>New releases every month!</CardDescription>
      </CardHeader>

      <CardContent className="">
        <Swiper
          spaceBetween={24}
          speed={500}
          loop={true}
          effect="fade"
          autoplay={{
            delay: 1500,
          }}
          className=""
          onInit={() => setInit(true)}
          modules={[Navigation, Pagination, EffectFade, Autoplay]}
          navigation={{
            prevEl: prevButtonRef.current,
            nextEl: nextButtonRef.current,
          }}>
          {data.map((item) => (
            <SwiperSlide
              className="rounded-[10px] overflow-hidden"
              key={item.id}>
              <div className="w-full h-[350px] md:h-[470px] relative">
                <img
                  src={
                    "https://image.tmdb.org/t/p/original/" + item.backdrop_path
                  }
                  className="w-full h-full select-none object-cover rounded-2.5xl"
                  width={1200}
                  height={500}
                  alt="image"
                />
                <div className="absolute flex flex-col px-2 py-5 md:p-5 bottom-0 text-white z-[5]">
                  <h1 className="text-lg md:text-4xl">
                    {item.title || item.name}
                  </h1>
                  <h4 className="text-sm hidden md:flex md:text-md font-light md:max-w-md">
                    {item.overview}
                  </h4>
                </div>
                <div className="absolute flex flex-col px-2 py-5 md:p-5 bottom-0 right-0 text-white z-[5]">
                  <Link
                    href={
                      item.original_name && item.original_name
                        ? `/watch/series/${item.id}`
                        : `/watch/movie/${item.id}`
                    }>
                    <Button className="text-sm md:text-lg flex items-center gap-4">
                      Watch <BsArrowRight />
                    </Button>
                  </Link>
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

export default SliderSmall;
