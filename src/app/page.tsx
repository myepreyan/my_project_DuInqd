import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import HowItWorksSection from "@/components/HowItWorksSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <HeroSection />
      <ServicesSection />
      <HowItWorksSection />
    </div>
  );
}
