// app/page.tsx

import Hero from "@/components/Hero";
import ProblemSolution from "@/components/ProblemSolution";
import SignatureServices from "@/components/SignatureServices";
import SpecialistSection from "@/components/SpecialistSection";
import PricingSection from "@/components/PricingSection";
import GallerySection from "@/components/GallerySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection"; 
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProblemSolution />
      <SignatureServices />
      <SpecialistSection />
      <PricingSection />
      <GallerySection />
      <TestimonialsSection />
      <FAQSection /> 
      <FinalCTA /> 
      <Footer /> 
    </main>
  );
}