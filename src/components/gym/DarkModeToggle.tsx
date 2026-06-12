import React from "react";

interface DarkModeToggleProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const DarkModeToggle: React.FC<DarkModeToggleProps> = ({
  isDarkMode,
  toggleDarkMode,
}) => {
  const label = isDarkMode ? "Mudar para tema claro" : "Mudar para tema escuro";

  return (
    <button
      type="button"
      onClick={toggleDarkMode}
      aria-label={label}
      title={label}
      // w-11 h-11 = 44px (minimo WCAG 2.5.5 pra alvos de toque)
      className="fixed bottom-24 md:bottom-8 left-6 md:left-8 w-11 h-11 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 rounded-full shadow-lg flex items-center justify-center z-50 hover:scale-110 transition-transform focus:outline-none focus:ring-4 focus:ring-primary/40"
    >
      <span className="material-icons text-xl" aria-hidden="true">
        {isDarkMode ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
};
