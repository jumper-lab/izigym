import React from "react";
import { Volume2, VolumeX } from "lucide-react";

const VIDEO_ID = "4LyI3_2WWg0";

export const BackgroundMusic = () => {
  const playerRef = React.useRef<HTMLIFrameElement>(null);
  const [isMuted, setIsMuted] = React.useState(false);

  const sendPlayerCommand = React.useCallback((func: string, args: unknown[] = []) => {
    playerRef.current?.contentWindow?.postMessage(
      JSON.stringify({
        event: "command",
        func,
        args,
      }),
      "*",
    );
  }, []);

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      sendPlayerCommand("playVideo");
      sendPlayerCommand("setVolume", [42]);
      sendPlayerCommand("unMute");
    }, 1200);

    const pauseBackgroundMusic = () => {
      sendPlayerCommand("mute");
      sendPlayerCommand("pauseVideo");
      setIsMuted(true);
    };

    window.addEventListener("izi:pause-background-music", pauseBackgroundMusic);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("izi:pause-background-music", pauseBackgroundMusic);
    };
  }, [sendPlayerCommand]);

  const toggleAudio = () => {
    if (isMuted) {
      sendPlayerCommand("playVideo");
      sendPlayerCommand("setVolume", [42]);
      sendPlayerCommand("unMute");
      setIsMuted(false);
      return;
    }

    sendPlayerCommand("mute");
    setIsMuted(true);
  };

  return (
    <>
      <iframe
        ref={playerRef}
        title="Trilha sonora IZI GYM"
        src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?enablejsapi=1&autoplay=1&mute=0&controls=0&loop=1&playlist=${VIDEO_ID}&playsinline=1&start=12&rel=0&modestbranding=1`}
        className="pointer-events-none fixed -left-[9999px] top-0 h-px w-px opacity-0"
        allow="autoplay; encrypted-media"
        aria-hidden="true"
        tabIndex={-1}
      />

      <button
        type="button"
        onClick={toggleAudio}
        className="fixed bottom-24 left-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#080808]/60 text-white shadow-[0_14px_36px_rgba(0,0,0,0.22)] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-500 ease-soft hover:-translate-y-px hover:border-primary/45 hover:bg-primary/30 focus:outline-none focus:ring-4 focus:ring-primary/30 md:bottom-16 md:left-8"
        aria-label={isMuted ? "Ativar música do site" : "Silenciar música do site"}
        title={isMuted ? "Ativar som" : "Silenciar"}
      >
        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      </button>
    </>
  );
};
