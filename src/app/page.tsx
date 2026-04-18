import Navigation from "@/components/Navigation";
import HeroSlider from "@/components/HeroSlider";
import UnboxingExperience from "@/components/UnboxingExperience";
import FeaturedProducts from "@/components/FeaturedProducts";
import CategoriesShowcase from "@/components/CategoriesShowcase";
import BrandStory from "@/components/BrandStory";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import { SplashScreen } from "@/components/SplashScreen";
import FloatingIcons from "@/components/FloatingIcons";
import { Camera } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-obsidian-950">
      <SplashScreen />
      <Navigation />
      <FloatingIcons />
      <HeroSlider />
      <UnboxingExperience />
      <FeaturedProducts />
      <CategoriesShowcase />
      <BrandStory />
      <Newsletter />
      <Footer />
      
      {/* Floating Camera Button */}
      <a 
        href="/camera"
        className="fixed bottom-8 right-8 w-16 h-16 bg-gold-500 hover:bg-gold-400 text-black rounded-full flex items-center justify-center shadow-lg transition-all transform hover:scale-110 z-50 border-2 border-gold-600"
        aria-label="Open Avatar Camera"
      >
        <Camera size={24} />
      </a>
    </main>
  );
}
