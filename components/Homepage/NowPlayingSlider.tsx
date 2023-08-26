"use client";
import React, { Suspense } from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { IMovie } from "@/types/types";
import Image from "next/image";

interface Props {
  data: IMovie[];
}
function NowPlayingSlider({ data }: Props) {
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
    <Suspense fallback={<p>Loading</p>}>
      <div ref={sliderRef} className="keen-slider">
        {data?.map((item, idx) => (
          <div key={idx} className="keen-slider__slide">
            <div className="relative">
              <div className="w-full h-[450px]">
                <Suspense fallback={<p>Loading</p>}>
                  <Image
                    src={
                      "https://image.tmdb.org/t/p/original/" +
                      item.backdrop_path
                    }
                    alt="img"
                    width={1200}
                    className="w-full h-full overflow-hidden rounded-md object-center object-cover"
                    height={700}
                  />
                </Suspense>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t  from-black/75"></div>
              <div className="absolute flex flex-col gap-4 bottom-4 text-white font-bold left-14">
                <h1 className=" text-4xl ">{item.title}</h1>
                <h4>{item.release_date}</h4>
                <h3 className="max-w-lg text-white/70 font-light">
                  {item.overview}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Suspense>
  );
}

export default NowPlayingSlider;
