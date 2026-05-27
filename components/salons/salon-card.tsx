"use client";

import Link from "next/link";
import { Star, MapPin, CheckCircle2, Heart, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface SalonCardProps {
  salon: {
    id: string;
    slug: string;
    name: string;
    category?: string;
    neighborhood?: string;
    city: string;
    rating: number;
    review_count: number;
    price_from?: number;
    is_verified: boolean;
    is_open?: boolean;
    is_featured?: boolean;
    cover_image_url?: string | null;
    tags?: string[];
    description?: string;
  };
  layout?: "grid" | "list";
}

const GRADIENT_CLASSES = [
  "from-gold-900/50 via-noir-925 to-noir-925",
  "from-rose-900/40 via-noir-925 to-noir-925",
  "from-purple-900/40 via-noir-925 to-noir-925",
  "from-teal-900/40 via-noir-925 to-noir-925",
  "from-blue-900/40 via-noir-925 to-noir-925",
  "from-amber-900/40 via-noir-925 to-noir-925",
];

function getGradient(id: string) {
  const index = id.charCodeAt(0) % GRADIENT_CLASSES.length;
  return GRADIENT_CLASSES[index];
}

export function SalonCard({ salon, layout = "grid" }: SalonCardProps) {
  const gradient = getGradient(salon.id);

  if (layout === "list") {
    return (
      <Link
        href={`/saloes/${salon.slug}`}
        className="group flex gap-4 bg-noir-925 border border-noir-800 rounded-2xl overflow-hidden hover:border-gold-500/30 transition-all duration-300 hover:shadow-gold"
      >
        {/* Thumbnail */}
        <div className={`relative w-32 sm:w-48 shrink-0 bg-gradient-to-br ${gradient}`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-playfair text-5xl font-bold text-white/10">{salon.name[0]}</span>
          </div>
          {salon.is_featured && (
            <div className="absolute top-2 left-2">
              <Badge variant="gold">Destaque</Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 py-4 pr-4 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
              <h3 className="font-playfair text-lg font-semibold text-white group-hover:text-gold-400 transition-colors truncate">
                {salon.name}
              </h3>
              {salon.is_verified && <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />}
            </div>
            <p className="text-xs text-noir-500 mb-2">{salon.category}</p>
            {salon.description && (
              <p className="text-sm text-noir-400 line-clamp-2 mb-3">{salon.description}</p>
            )}
            {salon.tags && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {salon.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-noir-900 border border-noir-800 text-noir-400">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3 text-xs text-noir-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {salon.neighborhood && `${salon.neighborhood}, `}{salon.city}
              </span>
              {salon.is_open !== undefined && (
                <span className={`flex items-center gap-1 ${salon.is_open ? "text-green-400" : "text-noir-500"}`}>
                  <Clock className="w-3 h-3" />
                  {salon.is_open ? "Aberto" : "Fechado"}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
                <span className="text-sm font-semibold text-gold-400">{salon.rating}</span>
                <span className="text-xs text-noir-500">({salon.review_count})</span>
              </div>
              {salon.price_from && (
                <span className="text-sm font-medium text-noir-100">
                  {salon.price_from.toLocaleString("pt-AO")} AOA
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/saloes/${salon.slug}`}
      className="group block relative overflow-hidden rounded-2xl bg-noir-925 border border-noir-800 hover:border-gold-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-gold"
    >
      {/* Cover */}
      <div className={`relative h-44 bg-gradient-to-br ${gradient}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-playfair text-7xl font-bold text-white/8 select-none">{salon.name[0]}</span>
        </div>
        <div className="absolute top-3 left-3 flex gap-1.5">
          {salon.is_open !== undefined && (
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
              salon.is_open
                ? "bg-green-950/80 text-green-300 border border-green-800/60"
                : "bg-noir-950/80 text-noir-400 border border-noir-700"
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${salon.is_open ? "bg-green-400" : "bg-noir-500"}`} />
              {salon.is_open ? "Aberto" : "Fechado"}
            </span>
          )}
          {salon.is_featured && <Badge variant="gold">★ Destaque</Badge>}
        </div>
        <button
          onClick={(e) => { e.preventDefault(); }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-noir-975/70 border border-noir-800 flex items-center justify-center text-noir-400 hover:text-rose-400 hover:border-rose-500/40 transition-colors backdrop-blur-sm"
        >
          <Heart className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="min-w-0">
            <div className="flex items-center gap-1 mb-0.5">
              <h3 className="font-playfair text-base font-semibold text-white group-hover:text-gold-400 transition-colors truncate">
                {salon.name}
              </h3>
              {salon.is_verified && <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 shrink-0" />}
            </div>
            <p className="text-xs text-noir-500">{salon.category}</p>
          </div>
          <div className="text-right shrink-0">
            <div className="flex items-center gap-0.5 justify-end">
              <Star className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
              <span className="text-sm font-semibold text-gold-400">{salon.rating}</span>
            </div>
            <p className="text-xs text-noir-500">({salon.review_count})</p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs text-noir-500 mb-3">
          <MapPin className="w-3 h-3 shrink-0" />
          <span className="truncate">{salon.neighborhood && `${salon.neighborhood}, `}{salon.city}</span>
        </div>

        {salon.tags && (
          <div className="flex flex-wrap gap-1 mb-3">
            {salon.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-noir-900 border border-noir-800 text-noir-400">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-noir-800">
          <div>
            {salon.price_from ? (
              <>
                <p className="text-xs text-noir-500">A partir de</p>
                <p className="text-sm font-semibold text-gold-400">
                  {salon.price_from.toLocaleString("pt-AO")} AOA
                </p>
              </>
            ) : (
              <p className="text-xs text-noir-500">Ver preços</p>
            )}
          </div>
          <Button variant="gold" size="sm" className="pointer-events-none text-xs">
            Reservar
          </Button>
        </div>
      </div>
    </Link>
  );
}
