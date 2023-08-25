"use client";
import React from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { IMovie } from "@/types/types";

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
          {item.title}
        </div>
      ))}
    </div>
  );
}

export default NowPlayingSlider;
