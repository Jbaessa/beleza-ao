import React from "react";
import Link from "next/link";
import {
  Scissors, Sparkles, Hand, Flower2, Sun, Heart,
  Zap, Eye, Star, Activity
} from "lucide-react";

const categories = [
  { slug: "cabelo", label: "Cabelo", icon: Scissors, color: "from-gold-400 to-gold-600", count: 87 },
  { slug: "unhas", label: "Unhas & Manicure", icon: Hand, color: "from-rose-400 to-rose-600", count: 64 },
  { slug: "spa", label: "Spa & Relaxamento", icon: Flower2, color: "from-emerald-400 to-teal-600", count: 42 },
  { slug: "maquiagem", label: "Maquiagem", icon: Star, color: "from-purple-400 to-pink-600", count: 55 },
  { slug: "sobrancelhas", label: "Sobrancelhas", icon: Eye, color: "from-amber-400 to-orange-500", count: 73 },
  { slug: "massagem", label: "Massagem", icon: Activity, color: "from-blue-400 to-cyan-500", count: 38 },
  { slug: "depilacao", label: "Depilação", icon: Sun, color: "from-rose-300 to-rose-500", count: 49 },
  { slug: "estetica", label: "Estética Facial", icon: Sparkles, color: "from-gold-300 to-amber-500", count: 31 },
  { slug: "cuidados-pele", label: "Cuidados da Pele", icon: Heart, color: "from-pink-400 to-rose-500", count: 44 },
  { slug: "outros", label: "Outros Serviços", icon: Zap, color: "from-violet-400 to-purple-600", count: 22 },
];

export function Categories() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section header */}
      <div className="text-center mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold-500 mb-3">
          Explorar por Categoria
        </p>
        <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-white mb-4">
          Todos os tratamentos,{" "}
          <span className="text-gradient-gold">num só lugar</span>
        </h2>
        <p className="text-noir-400 text-base max-w-xl mx-auto">
          Encontre exactamente o que procura para cuidar da sua beleza e bem-estar.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {categories.map(({ slug, label, icon: Icon, color, count }) => (
          <Link
            key={slug}
            href={`/saloes?categoria=${slug}`}
            className="group relative overflow-hidden rounded-2xl bg-noir-925 border border-noir-800 p-5 flex flex-col items-center text-center hover:border-gold-500/30 hover:-translate-y-1 transition-all duration-300"
          >
            {/* Icon container */}
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}
            >
              <Icon className="w-6 h-6 text-white" />
            </div>

            <span className="text-sm font-medium text-noir-200 group-hover:text-gold-400 transition-colors leading-tight mb-1">
              {label}
            </span>
            <span className="text-xs text-noir-500">
              {count} salões
            </span>

            {/* Hover glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold-500/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
          </Link>
        ))}
      </div>

      {/* View all */}
      <div className="text-center mt-10">
        <Link
          href="/categorias"
          className="inline-flex items-center gap-2 text-sm text-gold-500 hover:text-gold-300 font-medium transition-colors group"
        >
          Ver todas as categorias
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </section>
  );
}
