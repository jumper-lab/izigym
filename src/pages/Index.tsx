import { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/gym/Header";
import { UnidadeSection } from "@/components/gym/UnidadeSection";
import { PlanosSection } from "@/components/gym/PlanosSection";
import { LocationsSection } from "@/components/gym/LocationsSection";
import { FAQSection } from "@/components/gym/FAQSection";
import { Footer } from "@/components/gym/Footer";
import { WhatsAppButton } from "@/components/gym/WhatsAppButton";
import { DarkModeToggle } from "@/components/gym/DarkModeToggle";
import { StickyMobileCTA } from "@/components/gym/StickyMobileCTA";
import { ScrollAnimationWrapper } from "@/components/ScrollAnimationWrapper";

const THEME_KEY = "izi-theme";

/**
 * Resolve a preferência inicial do tema:
 * 1. localStorage (escolha explícita do usuário no toggle)
 * 2. fallback: light (sempre, ignora prefers-color-scheme do sistema)
 */
function getInitialDarkMode(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(THEME_KEY) === "dark";
}

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(getInitialDarkMode);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      window.localStorage.setItem(THEME_KEY, "dark");
    } else {
      root.classList.remove("dark");
      window.localStorage.setItem(THEME_KEY, "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

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
        <ScrollAnimationWrapper>
          <UnidadeSection />
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper>
          <PlanosSection />
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper>
          <LocationsSection />
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper>
          <FAQSection />
        </ScrollAnimationWrapper>
      </main>
      <Footer />
      <WhatsAppButton />
      <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <StickyMobileCTA />
    </>
  );
};

export default Index;
