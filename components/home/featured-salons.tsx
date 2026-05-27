import React from "react";
import Link from "next/link";
import { Star, MapPin, Clock, CheckCircle2, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const FEATURED_SALONS = [
  {
    id: "1",
    slug: "glamour-studio-luanda",
    name: "Glamour Studio",
    category: "Cabelo & Beleza",
    neighborhood: "Miramar",
    city: "Luanda",
    rating: 4.9,
    reviews: 218,
    price_from: 3500,
    is_verified: true,
    is_open: true,
    cover: null,
    tags: ["Cabelo", "Manicure", "Maquiagem"],
    highlight: "Especialistas em alisamento e coloração",
  },
  {
    id: "2",
    slug: "luxe-beauty-bar",
    name: "Luxe Beauty Bar",
    category: "Spa & Estética",
    neighborhood: "Alvalade",
    city: "Luanda",
    rating: 4.8,
    reviews: 175,
    price_from: 5000,
    is_verified: true,
    is_open: true,
    cover: null,
    tags: ["Spa", "Facial", "Massagem"],
    highlight: "Tratamentos premium com produtos importados",
  },
  {
    id: "3",
    slug: "bella-unhas-design",
    name: "Bella Unhas Design",
    category: "Unhas & Nail Art",
    neighborhood: "Ingombota",
    city: "Luanda",
    rating: 4.7,
    reviews: 302,
    price_from: 2500,
    is_verified: true,
    is_open: false,
    cover: null,
    tags: ["Manicure", "Pedicure", "Nail Art"],
    highlight: "Referência em nail art e gel em Luanda",
  },
  {
    id: "4",
    slug: "pure-skin-clinic",
    name: "Pure Skin Clinic",
    category: "Clínica Estética",
    neighborhood: "Talatona",
    city: "Luanda",
    rating: 5.0,
    reviews: 89,
    price_from: 8000,
    is_verified: true,
    is_open: true,
    cover: null,
    tags: ["Facial", "Peeling", "Botox"],
    highlight: "Dermatologista certificada no local",
  },
];

function SalonCard({ salon }: { salon: typeof FEATURED_SALONS[0] }) {
  const gradients = [
    "from-gold-900/60 to-noir-925",
    "from-rose-900/40 to-noir-925",
    "from-purple-900/40 to-noir-925",
    "from-teal-900/40 to-noir-925",
  ];
  const gradientIndex = FEATURED_SALONS.findIndex(s => s.id === salon.id) % gradients.length;

  return (
    <Link
      href={`/saloes/${salon.slug}`}
      className="group block relative overflow-hidden rounded-2xl bg-noir-925 border border-noir-800 hover:border-gold-500/30 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Cover image area */}
      <div className={`relative h-48 bg-gradient-to-br ${gradients[gradientIndex]} overflow-hidden`}>
        {/* Decorative pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 50%, rgba(212,175,55,0.6) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(212,175,55,0.3) 0%, transparent 50%)`,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-playfair text-6xl font-bold text-white/10 select-none">
            {salon.name[0]}
          </span>
        </div>

        {/* Open badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
              salon.is_open
                ? "bg-green-900/80 text-green-300 border border-green-700/50"
                : "bg-noir-900/80 text-noir-400 border border-noir-700"
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${salon.is_open ? "bg-green-400" : "bg-noir-500"}`} />
            {salon.is_open ? "Aberto" : "Fechado"}
          </span>
        </div>

        {/* Favorite button */}
        <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-noir-975/70 border border-noir-800 flex items-center justify-center text-noir-400 hover:text-rose-400 hover:border-rose-500/40 transition-colors backdrop-blur-sm">
          <Heart className="w-4 h-4" />
        </button>

        {/* Featured badge */}
        <div className="absolute bottom-3 left-3">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs bg-gold-500/20 border border-gold-500/30 text-gold-400">
            <Star className="w-3 h-3 fill-gold-400" />
            Destaque
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <h3 className="font-playfair text-lg font-semibold text-white group-hover:text-gold-400 transition-colors">
                {salon.name}
              </h3>
              {salon.is_verified && (
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
              )}
            </div>
            <p className="text-xs text-noir-500">{salon.category}</p>
          </div>
          <div className="text-right shrink-0">
            <div className="flex items-center gap-1 justify-end">
              <Star className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
              <span className="text-sm font-semibold text-gold-400">{salon.rating}</span>
            </div>
            <p className="text-xs text-noir-500">({salon.reviews})</p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs text-noir-500 mb-3">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span>{salon.neighborhood}, {salon.city}</span>
        </div>

        <p className="text-xs text-noir-400 mb-3 line-clamp-2">{salon.highlight}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {salon.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded-full text-xs bg-noir-900 border border-noir-800 text-noir-400">
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-noir-800">
          <div>
            <p className="text-xs text-noir-500">A partir de</p>
            <p className="text-sm font-semibold text-gold-400">
              {salon.price_from.toLocaleString("pt-AO")} AOA
            </p>
          </div>
          <Button variant="gold" size="sm" className="pointer-events-none">
            Reservar
          </Button>
        </div>
      </div>
    </Link>
  );
}

export function FeaturedSalons() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-500 mb-3">
            Salões em Destaque
          </p>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-white">
            Os mais bem avaliados{" "}
            <span className="text-gradient-gold">em Angola</span>
          </h2>
        </div>
        <Link
          href="/saloes"
          className="text-sm text-gold-500 hover:text-gold-300 font-medium transition-colors whitespace-nowrap group flex items-center gap-1"
        >
          Ver todos
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {FEATURED_SALONS.map((salon) => (
          <SalonCard key={salon.id} salon={salon} />
        ))}
      </div>
    </section>
  );
}
