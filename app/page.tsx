import NowPlaying from "@/components/Homepage/NowPlaying";
import { Card, CardHeader } from "@/components/ui/card";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <section id="hero">
        <Suspense fallback={<p>Loading</p>}>
          <NowPlaying />
        </Suspense>
      </section>
    </>
  );
}
