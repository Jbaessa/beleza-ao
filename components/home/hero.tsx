"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, MapPin, Star, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const popularSearches = ["Manicure", "Cabelo", "Massagem", "Maquiagem", "Sobrancelhas"];

export function Hero() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("Luanda");
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    if (location) params.set("cidade", location);
    router.push(`/saloes?${params.toString()}`);
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-noir-975 via-noir-975/95 to-noir-975" />

      {/* Decorative gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/6 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-rose-500/6 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-400/3 rounded-full blur-[80px]" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(212,175,55,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 text-center pt-24 pb-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-gold border border-gold-500/20 text-gold-400 text-xs font-medium mb-8 animate-in fade-in slide-in-from-bottom-3 duration-700">
          <Sparkles className="w-3.5 h-3.5" />
          <span>O marketplace de beleza nº 1 em Angola</span>
        </div>

        {/* Headline */}
        <h1 className="font-playfair text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          Beleza que{" "}
          <span className="text-gradient-gold">transforma.</span>
          <br />
          <span className="text-gradient-rose">Marcações</span> que simplificam.
        </h1>

        <p className="text-lg sm:text-xl text-noir-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          Descubra os melhores salões, clínicas e spas de Angola. Reserve o seu tratamento favorito em segundos.
        </p>

        {/* Search Box */}
        <form
          onSubmit={handleSearch}
          className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 glass-dark rounded-2xl p-2 sm:p-3 flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto shadow-gold-lg mb-10"
        >
          <div className="flex-1 flex items-center gap-3 px-3 py-2 bg-noir-900/50 rounded-xl">
            <Search className="w-4 h-4 text-gold-500 shrink-0" />
            <input
              type="text"
              placeholder="Que serviço procura? (ex: manicure, cabelo...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-sm text-noir-100 placeholder:text-noir-500 outline-none min-w-0"
            />
          </div>

          <div className="flex items-center gap-3 px-3 py-2 bg-noir-900/50 rounded-xl sm:w-40">
            <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
            <input
              type="text"
              placeholder="Cidade"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1 bg-transparent text-sm text-noir-100 placeholder:text-noir-500 outline-none min-w-0"
            />
          </div>

          <Button type="submit" variant="gold" size="lg" className="shrink-0 rounded-xl">
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">Pesquisar</span>
          </Button>
        </form>

        {/* Popular searches */}
        <div className="flex items-center justify-center gap-2 flex-wrap animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
          <span className="text-xs text-noir-500">Popular:</span>
          {popularSearches.map((term) => (
            <button
              key={term}
              onClick={() => {
                setSearch(term);
                router.push(`/saloes?q=${term}`);
              }}
              className="text-xs px-3 py-1 rounded-full glass-gold border border-gold-500/15 text-gold-400 hover:border-gold-500/40 hover:bg-gold-500/15 transition-all"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 pb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
        <div className="glass-dark border border-gold-500/10 rounded-2xl p-6 grid grid-cols-3 gap-6">
          {[
            { value: "200+", label: "Salões Verificados" },
            { value: "5.000+", label: "Clientes Felizes" },
            { value: "4.9", label: "Avaliação Média", icon: Star },
          ].map(({ value, label, icon: Icon }) => (
            <div key={label} className="text-center">
              <div className="flex items-center justify-center gap-1">
                {Icon && <Icon className="w-4 h-4 text-gold-400 fill-gold-400" />}
                <span className="font-playfair text-2xl sm:text-3xl font-bold text-gradient-gold">
                  {value}
                </span>
              </div>
              <p className="text-xs text-noir-500 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
