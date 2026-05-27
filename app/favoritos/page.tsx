import React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Heart } from "lucide-react";
import { SalonCard } from "@/components/salons/salon-card";
import { Button } from "@/components/ui/button";

const FAVORITE_SALONS = [
  { id: "1", slug: "glamour-studio-luanda", name: "Glamour Studio", category: "Cabelo & Beleza", neighborhood: "Miramar", city: "Luanda", rating: 4.9, review_count: 218, price_from: 3500, is_verified: true, is_open: true, is_featured: true, cover_image_url: null, tags: ["Cabelo", "Manicure", "Maquiagem"] },
  { id: "4", slug: "pure-skin-clinic", name: "Pure Skin Clinic", category: "Clínica Estética", neighborhood: "Talatona", city: "Luanda", rating: 5.0, review_count: 89, price_from: 8000, is_verified: true, is_open: true, is_featured: false, cover_image_url: null, tags: ["Facial", "Peeling", "Botox"] },
];

export default function FavoritosPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/25 flex items-center justify-center">
              <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
            </div>
            <div>
              <h1 className="font-playfair text-3xl font-bold text-white">Os meus Favoritos</h1>
              <p className="text-noir-500 text-sm mt-0.5">{FAVORITE_SALONS.length} salão{FAVORITE_SALONS.length !== 1 ? "ões" : ""} guardado{FAVORITE_SALONS.length !== 1 ? "s" : ""}</p>
            </div>
          </div>

          {FAVORITE_SALONS.length === 0 ? (
            <div className="text-center py-20">
              <Heart className="w-14 h-14 text-noir-700 mx-auto mb-4" />
              <h3 className="font-playfair text-xl text-white mb-2">Nenhum favorito ainda</h3>
              <p className="text-noir-500 text-sm mb-6">Guarde os seus salões favoritos para os encontrar facilmente.</p>
              <Button variant="gold" size="md" asChild>
                <a href="/saloes">Explorar Salões</a>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {FAVORITE_SALONS.map((salon) => (
                <SalonCard key={salon.id} salon={salon} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
