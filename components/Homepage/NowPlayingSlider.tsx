"use client";
import React from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { IMovie } from "@/types/types";
import Image from "next/image";

interface Props {
  data: IMovie[];
}
function NowPlayingSlider({ data }: Props) {
  console.log(data);
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      slideChanged() {
        console.log("slide changed");
      },
    },
    [
      // add plugins here
    ]
  );
  return (
    <div ref={sliderRef} className="keen-slider">
      {data?.map((item, idx) => (
        <div key={idx} className="keen-slider__slide">
          <div className="relative">
            <Image
              src={"https://image.tmdb.org/t/p/original/" + item.backdrop_path}
              alt="img"
              width={2500}
              quality={100}
              className="w-full h-full overflow-hidden rounded-md object-cover"
              height={1500}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NowPlayingSlider;
