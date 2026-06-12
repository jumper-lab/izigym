import React from "react";
import { MapPin, CheckCircle, ExternalLink } from "lucide-react";

const locationData = {
  name: "IZI - Alto de Pinheiros",
  address: "R. Cerro Corá, 2235 - Alto de Pinheiros",
  mapLink: "https://www.google.com/maps/search/?api=1&query=Rua%20Cerro%20Cor%C3%A1%2C%202235%2C%20Alto%20de%20Pinheiros%2C%20S%C3%A3o%20Paulo%2C%20SP",
  imageSrc: "https://raw.githubusercontent.com/fluxodigitaltech/izi/refs/heads/main/IMG_2884(1).jpg",
  benefits: [
    "Musculação e Cardio",
    "Aulas Coletivas",
    "Ambiente Climatizado",
    "Estacionamento Gratuito",
  ],
};

export const LocationsSection = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto" id="pass">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-[0.3em] text-zinc-400 mb-4 block">
          Nossa Unidade
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-tight">
          Um espaço completo para o seu bem-estar.
        </h2>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mt-6 leading-relaxed">
          Descubra a IZI ONE Alto de Pinheiros. Oferecemos uma infraestrutura moderna e diversas modalidades para você alcançar seus objetivos.
        </p>
      </div>
      
      <div className="relative max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl group">
        <img
          src={locationData.imageSrc}
          alt={`Unidade ${locationData.name}`}
          className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
          <div className="grid md:grid-cols-3 gap-8 items-end">
            {/* Coluna 1: Nome e Endereço */}
            <div className="md:col-span-1">
              <h3 className="text-3xl font-bold font-display leading-snug mb-2">
                {locationData.name}
              </h3>
              <div className="flex items-center space-x-2 text-zinc-300">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>{locationData.address}</span>
              </div>
            </div>

            {/* Coluna 2: Benefícios */}
            <div className="md:col-span-1">
              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                {locationData.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-zinc-200 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Coluna 3: Botão */}
            <div className="md:col-span-1 md:justify-self-end">
              <a
                href={locationData.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full md:w-auto bg-primary text-white px-8 py-3 rounded-lg text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:bg-primary/90 focus:ring-4 focus:ring-primary/50 gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Ver no Mapa
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};