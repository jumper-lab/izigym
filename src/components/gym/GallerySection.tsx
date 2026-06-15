import React from "react";
import { Reveal } from "@/components/Reveal";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

const galleryItems = [
  {
    type: "video",
    src: "https://www.youtube-nocookie.com/embed/4LyI3_2WWg0?start=12&rel=0&modestbranding=1&playsinline=1&controls=1&enablejsapi=1",
    title: "Video da IZI GYM Alto de Pinheiros",
    label: "Tour",
  },
  {
    type: "image",
    src: "/images/gallery-01.jpg",
    alt: "Entrada da IZI GYM Alto de Pinheiros",
    label: "Recepção",
  },
  {
    type: "image",
    src: "/images/gallery-02.jpg",
    alt: "Área de musculação da IZI GYM",
    label: "Musculação",
  },
  {
    type: "image",
    src: "/images/gallery-03.jpg",
    alt: "Equipamentos modernos da academia",
    label: "Equipamentos",
  },
  {
    type: "image",
    src: "/images/gallery-04.jpg",
    alt: "Máquina de treino na área de musculação",
    label: "Força",
  },
  {
    type: "image",
    src: "/images/gallery-05.jpg",
    alt: "Espaço interno com equipamentos de treino",
    label: "Ambiente",
  },
  {
    type: "image",
    src: "/images/gallery-06.jpg",
    alt: "Detalhes da estrutura da academia",
    label: "Estrutura",
  },
];

const VideoGalleryItem = ({
  item,
}: {
  item: {
    src: string;
    title: string;
    label: string;
  };
}) => {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const [isStarted, setIsStarted] = React.useState(false);

  const sendPlayCommand = () => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({
        event: "command",
        func: "playVideo",
        args: [],
      }),
      "*",
    );
  };

  const handlePlay = () => {
    sendPlayCommand();
    window.setTimeout(sendPlayCommand, 250);
    setIsStarted(true);
  };

  return (
    <>
      <div className="absolute inset-0 bg-black">
        <iframe
          ref={iframeRef}
          src={item.src}
          title={item.title}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      {!isStarted && (
        <button
          type="button"
          onClick={handlePlay}
          className="absolute inset-0 z-10 flex items-center justify-center bg-black/8 text-white transition-colors duration-500 ease-soft hover:bg-black/18 focus:outline-none"
          aria-label="Reproduzir vídeo da IZI GYM"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white shadow-[0_18px_45px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-all duration-500 ease-soft hover:-translate-y-px hover:border-primary/50 hover:bg-primary/30">
            <Play className="ml-1 h-6 w-6 fill-white" />
          </span>
        </button>
      )}
    </>
  );
};

export const GallerySection = () => {
  const featuredGalleryItems = galleryItems.slice(0, 7);

  return (
    <section className="scroll-mt-16 pt-16 lg:pt-24" id="galeria">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal className="max-w-3xl mx-auto mb-10 lg:mb-14 text-center">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.28em] sm:tracking-[0.3em] text-zinc-400 mb-4 block">
            Interior
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-tight">
            Conheça a estrutura
            <br className="hidden sm:block" />
            {" "}por dentro.
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 mt-5 sm:mt-6 leading-relaxed">
            Ambientes modernos, equipamentos selecionados e uma atmosfera pensada para deixar o treino mais simples de começar e melhor de manter.
          </p>
        </Reveal>
      </div>

      <div className="grid w-full grid-cols-2 lg:grid-cols-[56.25vh_repeat(3,minmax(0,1fr))] lg:grid-rows-2 gap-2 px-2 sm:gap-4 sm:px-4 lg:gap-0 lg:px-0 lg:h-screen lg:min-h-[680px]">
        {featuredGalleryItems.map((item, index) => (
          <Reveal
            key={item.src}
            delay={index * 70}
            className={item.type === "video" ? "col-span-2 lg:col-span-1 lg:row-span-2 lg:h-full" : "lg:h-full"}
          >
            <figure
              className={cn(
                "group relative overflow-hidden bg-zinc-900 shadow-lg shadow-black/10 lg:rounded-none lg:shadow-none",
                item.type === "video"
                  ? "aspect-[4/5] rounded-[22px] sm:aspect-[4/3] sm:rounded-2xl lg:h-full lg:aspect-auto lg:rounded-none"
                  : "aspect-[3/4] rounded-[18px] sm:aspect-[4/3] sm:rounded-2xl lg:h-full lg:aspect-auto lg:rounded-none",
              )}
            >
              {item.type === "video" ? (
                <VideoGalleryItem item={item} />
              ) : (
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-cover transition-transform duration-1000 ease-soft group-hover:scale-[1.04]"
                />
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 transition-opacity duration-700 ease-soft group-hover:opacity-95" />
              <figcaption className="pointer-events-none absolute bottom-0 left-0 right-0 p-3 sm:p-5">
                <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[9px] sm:px-3 sm:text-[11px] font-bold uppercase tracking-[0.16em] sm:tracking-[0.18em] text-white backdrop-blur-md">
                  {item.label}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
};
