import { Archive } from "@/components/archive";
import { Follow } from "@/components/follow";
import { Hero } from "@/components/hero";
import { Positioning } from "@/components/positioning";
import { Tools } from "@/components/tools";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Positioning />
        <Tools />
        <Archive />
        <Follow />
      </main>

      <footer className="mx-auto w-full max-w-[1728px] px-5 pb-10 font-doc text-[0.7rem] uppercase tracking-[0.16em] text-halftone sm:px-8 md:px-12">
        thecultist.it — Cardboard Cultist
      </footer>
    </>
  );
}
