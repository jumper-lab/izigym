import { Header } from "@/components/gym/Header";
import { UnidadeSection } from "@/components/gym/UnidadeSection";
import { PlanosSection } from "@/components/gym/PlanosSection";
import { LocationsSection } from "@/components/gym/LocationsSection";
import { GallerySection } from "@/components/gym/GallerySection";
import { FAQSection } from "@/components/gym/FAQSection";
import { Footer } from "@/components/gym/Footer";
import { WhatsAppButton } from "@/components/gym/WhatsAppButton";
import { StickyMobileCTA } from "@/components/gym/StickyMobileCTA";
import { BackgroundMusic } from "@/components/gym/BackgroundMusic";

const Index = () => {
  return (
    <>
      {/* Skip link — invisível até receber foco via tab. WCAG 2.4.1 */}
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-xl focus:outline-none focus:ring-4 focus:ring-primary/40"
      >
        Pular para o conteúdo
      </a>

      <Header />
      <main id="conteudo">
        <UnidadeSection />
        <PlanosSection />
        <LocationsSection />
        <GallerySection />
        <FAQSection />
      </main>
      <Footer />
      <BackgroundMusic />
      <WhatsAppButton />
      <StickyMobileCTA />
    </>
  );
};

export default Index;
