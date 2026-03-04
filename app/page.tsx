import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Stats from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Hero />
      <Services />
      <Stats />
      <Testimonials />
    </main>
  );
}
