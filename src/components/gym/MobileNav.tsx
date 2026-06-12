import React from "react";
import { Menu, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

interface MobileNavProps {
  handleSmoothScroll: (event: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
}

const navItems = [
  { name: "HOME", href: "#unidade" },
  { name: "PLANOS", href: "#planos" },
  { name: "UNIDADE", href: "#pass" },
  { name: "FAQ", href: "#faq" },
];

export const MobileNav: React.FC<MobileNavProps> = ({ handleSmoothScroll }) => {
  const [open, setOpen] = React.useState(false);

  const handleNavigationClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    handleSmoothScroll(e, targetId);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Abrir menu de navegação</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-background-light dark:bg-zinc-900 flex flex-col p-0">
        <SheetHeader className="p-6 pb-4">
          <SheetTitle>
            <img
              src="https://raw.githubusercontent.com/cleitonSam/img/refs/heads/main/IZI%20(2)%20(1).png"
              alt="IZI ONE Logo"
              className="h-16 w-auto"
            />
          </SheetTitle>
          <SheetDescription className="sr-only">
            Menu de navegação principal.
          </SheetDescription>
        </SheetHeader>
        <Separator className="bg-zinc-200 dark:bg-zinc-700" />
        
        <nav className="flex-grow p-6">
          <ul className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavigationClick(e, item.href.substring(1))}
                  className="block text-base font-medium p-3 rounded-md text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto p-6 space-y-6 border-t border-zinc-200 dark:border-zinc-700">
          <a 
            href="#planos" 
            onClick={(e) => handleNavigationClick(e, "planos")}
            className="w-full bg-primary text-white px-6 py-3 rounded-lg text-sm font-bold uppercase tracking-wide hover:opacity-90 transition-opacity text-center block"
          >
            Matricule-se
          </a>
          <div className="flex items-center justify-center space-x-4">
            <a href="https://www.instagram.com/izigym.brasil" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-primary">
              <Instagram className="h-6 w-6" />
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};