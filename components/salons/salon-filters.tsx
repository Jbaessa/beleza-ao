"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CATEGORIES = [
  { value: "all", label: "Todas as Categorias" },
  { value: "cabelo", label: "Cabelo" },
  { value: "unhas", label: "Unhas & Manicure" },
  { value: "spa", label: "Spa & Relaxamento" },
  { value: "maquiagem", label: "Maquiagem" },
  { value: "sobrancelhas", label: "Sobrancelhas" },
  { value: "massagem", label: "Massagem" },
  { value: "depilacao", label: "Depilação" },
  { value: "estetica", label: "Estética Facial" },
];

const SORT_OPTIONS = [
  { value: "rating", label: "Melhor Avaliação" },
  { value: "reviews", label: "Mais Avaliações" },
  { value: "price_asc", label: "Menor Preço" },
  { value: "price_desc", label: "Maior Preço" },
  { value: "newest", label: "Mais Recentes" },
];

const RATING_OPTIONS = [
  { value: "4.5", label: "4.5+ ★" },
  { value: "4.0", label: "4.0+ ★" },
  { value: "3.5", label: "3.5+ ★" },
];

export function SalonFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get("categoria") || "all";
  const sort = searchParams.get("ordenar") || "rating";
  const rating = searchParams.get("avaliacao") || "";
  const isOpen = searchParams.get("aberto") === "true";

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/saloes?${params.toString()}`);
  }

  function clearFilters() {
    const q = searchParams.get("q");
    const cidade = searchParams.get("cidade");
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (cidade) params.set("cidade", cidade);
    router.push(`/saloes?${params.toString()}`);
  }

  const hasFilters = category !== "all" || rating || isOpen;

  return (
    <div className="flex flex-col gap-3">
      {/* Mobile filter bar */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs text-noir-500 mr-1">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Filtros
        </div>

        {/* Category */}
        <Select value={category} onValueChange={(v) => updateFilter("categoria", v)}>
          <SelectTrigger className="h-8 text-xs w-44">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((c) => (
              <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Rating */}
        <Select value={rating || "all"} onValueChange={(v) => updateFilter("avaliacao", v === "all" ? "" : v)}>
          <SelectTrigger className="h-8 text-xs w-32">
            <SelectValue placeholder="Avaliação" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Qualquer avaliação</SelectItem>
            {RATING_OPTIONS.map((r) => (
              <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Open now */}
        <button
          onClick={() => updateFilter("aberto", isOpen ? "" : "true")}
          className={`h-8 px-3 text-xs rounded-lg border transition-all ${
            isOpen
              ? "bg-green-900/40 border-green-700 text-green-300"
              : "bg-noir-900 border-noir-800 text-noir-400 hover:border-gold-500/30 hover:text-gold-400"
          }`}
        >
          ● Aberto agora
        </button>

        {hasFilters && (
          <button
            onClick={clearFilters}
            className="h-8 px-3 text-xs rounded-lg bg-red-900/30 border border-red-800/50 text-red-400 hover:bg-red-900/50 transition-colors flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            Limpar
          </button>
        )}

        <div className="flex-1" />

        {/* Sort */}
        <Select value={sort} onValueChange={(v) => updateFilter("ordenar", v)}>
          <SelectTrigger className="h-8 text-xs w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((s) => (
              <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
