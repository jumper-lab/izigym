import React from "react";
import { ScrollToTopLink } from "./ScrollToTopLink";

export const Footer = () => {
  return (
    <footer
      className="pt-24 pb-12 px-6 max-w-7xl mx-auto border-t border-zinc-200 dark:border-zinc-800"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div className="space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-zinc-400">
            Nos siga em @izigym.brasil
          </span>
        </div>
        <ScrollToTopLink
          className="text-xs uppercase tracking-widest border-b border-zinc-900 dark:border-zinc-100 pb-1 mb-4 hover:opacity-60"
        >
          Voltar ao topo
        </ScrollToTopLink>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-sm text-zinc-500">
        <div>
          <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-4 uppercase tracking-widest">
            Contato
          </h4>
          <p>
            Telefone:{" "}
            <a href="tel:+5511952137022" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              11 95213-7022
            </a>
          </p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Rua%20Cerro%20Cor%C3%A1%2C%202235%2C%20Alto%20de%20Pinheiros%2C%20S%C3%A3o%20Paulo%2C%20SP"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            R. Cerro Corá, 2235 - Alto de Pinheiros - São Paulo - SP, 02675-031
          </a>
          <p className="mt-4">Razão Social: IZI</p>
          <p>CNPJ: 62.054.534/0001-58</p>
        </div>
        <div>
          <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-4 uppercase tracking-widest">
            Horário de Funcionamento
          </h4>
          <div className="space-y-1">
            <div className="flex justify-between max-w-[220px]">
              <span>Segunda a Sexta</span>
              <span>05:00 - 23:00</span>
            </div>
            <div className="flex justify-between max-w-[220px]">
              <span>Sábado e Domingo</span>
              <span>08:00 - 20:00</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start md:items-end">
          <div className="flex space-x-6">
            <a className="hover:text-zinc-900 dark:hover:text-zinc-100" href="https://www.instagram.com/izigym.brasil" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </div>
          <p className="mt-8">© {new Date().getFullYear()} IZI. Todos os direitos reservados.</p>
          <p>LAYOUT E WEBSITE PRODUZIDO POR FLUXO DIGITAL</p>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex justify-center">
        <img
          src="https://raw.githubusercontent.com/cleitonSam/img/refs/heads/main/IZI%20(2)%20(1).png"
          alt="IZI ONE Logo"
          className="h-40 w-auto opacity-80 dark:opacity-90"
        />
      </div>
    </footer>
  );
};
