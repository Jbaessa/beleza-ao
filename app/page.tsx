import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { Categories } from "@/components/home/categories";
import { FeaturedSalons } from "@/components/home/featured-salons";
import { HowItWorks } from "@/components/home/how-it-works";
import { Testimonials } from "@/components/home/testimonials";
import { CtaPartner } from "@/components/home/cta-partner";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Categories />
        <FeaturedSalons />
        <HowItWorks />
        <Testimonials />
        <CtaPartner />
      </main>
      <Footer />
    </>
  );
}
