import React from "react";
import { ArrowRight } from "lucide-react";

/**
 * CTA fixo no rodapé, visível apenas em mobile (<md / 768px).
 * Reforça conversão em telas pequenas onde o botão "Matricule-se" do
 * Header só aparece dentro do drawer.
 *
 * Usa env(safe-area-inset-bottom) pra respeitar a home indicator do iPhone.
 */
export const StickyMobileCTA: React.FC = () => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("planos")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 px-4 py-3"
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
      role="region"
      aria-label="Chamada para matrícula"
    >
      <a
        href="#planos"
        onClick={handleClick}
        className="flex items-center justify-center gap-2 w-full bg-primary text-white py-3 rounded-full text-sm font-bold uppercase tracking-wide hover:opacity-90 transition-opacity shadow-lg shadow-primary/30 focus:outline-none focus:ring-4 focus:ring-primary/40"
      >
        Matricule-se agora
        <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  );
};
