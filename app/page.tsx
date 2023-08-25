import NowPlaying from "@/components/Homepage/NowPlaying";
import { Card, CardHeader } from "@/components/ui/card";

export default function Home() {
  return (
    <>
      <section id="hero">
        <NowPlaying />
      </section>
    </>
  );
}
