import React from "react";

export const UnidadeSection = () => {
  const imgSrc = "https://raw.githubusercontent.com/fluxodigitaltech/izi/refs/heads/main/IMG_2884(1).jpg";

  return (
    <section
      id="unidade"
      // mt-20 (80px) compensa a altura do Header fixo (h-20)
      className="relative w-full bg-black overflow-hidden mt-20"
    >
      <div className="relative w-full h-[450px] sm:h-[600px] md:h-[800px] lg:h-[950px]">
        <img
          alt="Espaço amplo e bem iluminado da IZI ONE"
          className="w-full h-full block object-cover object-center"
          src={imgSrc}
        />
        {/* Overlay com opacidade de 50% */}
        <div className="absolute inset-0 bg-black/50 pointer-events-none" />
      </div>
    </section>
  );
};