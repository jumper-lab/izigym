import React from "react";
import { MobileNav } from "./MobileNav";

export const Header = () => {
  const handleSmoothScroll = (event: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    event.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        <div className="md:hidden">
          <MobileNav handleSmoothScroll={handleSmoothScroll} />
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 md:static md:left-auto md:translate-x-0 h-full flex items-center">
          <img
            src="https://raw.githubusercontent.com/cleitonSam/img/refs/heads/main/IZI%20(2)%20(1).png"
            alt="IZI ONE Logo"
            className="h-12 md:h-14 w-auto"
          />
        </div>

        <div className="hidden md:flex items-center space-x-8 text-sm font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          <a className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" href="#unidade" onClick={(e) => handleSmoothScroll(e, "unidade")}>
            HOME
          </a>
          <a className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" href="#planos" onClick={(e) => handleSmoothScroll(e, "planos")}>
            PLANOS
          </a>
          <a className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" href="#pass" onClick={(e) => handleSmoothScroll(e, "pass")}>
            UNIDADE
          </a>
          <a className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" href="#faq" onClick={(e) => handleSmoothScroll(e, "faq")}>
            FAQ
          </a>
        </div>

        <div className="hidden xs:block">
          <a
            href="#planos"
            onClick={(e) => handleSmoothScroll(e, "planos")}
            className="bg-primary text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide hover:opacity-90 transition-opacity"
          >
            Matricule-se
          </a>
        </div>
      </div>
    </nav>
  );
};
