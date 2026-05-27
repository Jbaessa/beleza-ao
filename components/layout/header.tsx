"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/saloes", label: "Salões" },
  { href: "/categorias", label: "Categorias" },
  { href: "/como-funciona", label: "Como Funciona" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "glass-dark shadow-2xl shadow-black/50"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <Image src="/LogoB.png" alt="Beleza.AO ícone" width={36} height={36} className="object-contain" />
            <Image src="/LogoB2.png" alt="Beleza.AO" width={110} height={36} className="object-contain" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  pathname === link.href
                    ? "text-gold-400 bg-gold-500/10"
                    : "text-noir-300 hover:text-gold-400 hover:bg-gold-500/8"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/saloes">
              <Button variant="ghost" size="icon-sm">
                <Search className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="outline-gold" size="sm">
                Entrar
              </Button>
            </Link>
            <Link href="/auth/registar">
              <Button variant="gold" size="sm">
                Registar
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-noir-300 hover:text-gold-400 hover:bg-noir-900 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass-dark border-t border-gold/10 animate-in slide-in-from-top-2">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  pathname === link.href
                    ? "text-gold-400 bg-gold-500/10 border border-gold-500/20"
                    : "text-noir-300 hover:text-gold-400 hover:bg-noir-900"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 flex flex-col gap-2">
              <Link href="/auth/login" onClick={() => setMobileOpen(false)}>
                <Button variant="outline-gold" size="md" className="w-full">
                  Entrar
                </Button>
              </Link>
              <Link href="/auth/registar" onClick={() => setMobileOpen(false)}>
                <Button variant="gold" size="md" className="w-full">
                  Criar Conta
                </Button>
              </Link>
            </div>
            <div className="pt-2 border-t border-noir-800">
              <Link
                href="/parceiro"
                onClick={() => setMobileOpen(false)}
                className="flex items-center px-4 py-3 text-sm text-noir-400 hover:text-gold-400 transition-colors"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Listar o meu negócio
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
