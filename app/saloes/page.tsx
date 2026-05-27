import React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SalonCard } from "@/components/salons/salon-card";
import { SalonFilters } from "@/components/salons/salon-filters";
import { Search, LayoutGrid, List, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock data — will be replaced by Supabase queries
const MOCK_SALONS = [
  { id: "1", slug: "glamour-studio-luanda", name: "Glamour Studio", category: "Cabelo & Beleza", neighborhood: "Miramar", city: "Luanda", rating: 4.9, review_count: 218, price_from: 3500, is_verified: true, is_open: true, is_featured: true, cover_image_url: null, tags: ["Cabelo", "Manicure", "Maquiagem"], description: "Especialistas em alisamento, coloração e tratamentos capilares premium." },
  { id: "2", slug: "luxe-beauty-bar", name: "Luxe Beauty Bar", category: "Spa & Estética", neighborhood: "Alvalade", city: "Luanda", rating: 4.8, review_count: 175, price_from: 5000, is_verified: true, is_open: true, is_featured: false, cover_image_url: null, tags: ["Spa", "Facial", "Massagem"], description: "Tratamentos premium com produtos importados de alta qualidade." },
  { id: "3", slug: "bella-unhas-design", name: "Bella Unhas Design", category: "Unhas & Nail Art", neighborhood: "Ingombota", city: "Luanda", rating: 4.7, review_count: 302, price_from: 2500, is_verified: true, is_open: false, is_featured: false, cover_image_url: null, tags: ["Manicure", "Pedicure", "Nail Art"], description: "Referência em nail art e gel em Luanda." },
  { id: "4", slug: "pure-skin-clinic", name: "Pure Skin Clinic", category: "Clínica Estética", neighborhood: "Talatona", city: "Luanda", rating: 5.0, review_count: 89, price_from: 8000, is_verified: true, is_open: true, is_featured: false, cover_image_url: null, tags: ["Facial", "Peeling", "Botox"], description: "Dermatologista certificada no local. Tratamentos de alta precisão." },
  { id: "5", slug: "studio-divine", name: "Studio Diviné", category: "Salão de Beleza", neighborhood: "Kilamba", city: "Luanda", rating: 4.6, review_count: 142, price_from: 4000, is_verified: true, is_open: true, is_featured: false, cover_image_url: null, tags: ["Cabelo", "Maquiagem", "Sobrancelhas"], description: "Salão completo com os melhores profissionais do Kilamba." },
  { id: "6", slug: "zen-spa-massagem", name: "Zen Spa & Massagem", category: "Spa", neighborhood: "Maianga", city: "Luanda", rating: 4.8, review_count: 94, price_from: 6000, is_verified: false, is_open: true, is_featured: false, cover_image_url: null, tags: ["Massagem", "Spa", "Aromaterapia"], description: "Experiência de relaxamento total no coração de Luanda." },
  { id: "7", slug: "natural-beauty-benguela", name: "Natural Beauty", category: "Cabelo & Beleza", neighborhood: "Centro", city: "Benguela", rating: 4.5, review_count: 67, price_from: 2000, is_verified: true, is_open: false, is_featured: false, cover_image_url: null, tags: ["Cabelo Natural", "Tranças", "Manicure"], description: "Especialistas em cabelo natural e afro." },
  { id: "8", slug: "elite-nails-art", name: "Elite Nails Art", category: "Unhas", neighborhood: "Viana", city: "Luanda", rating: 4.7, review_count: 188, price_from: 2800, is_verified: true, is_open: true, is_featured: false, cover_image_url: null, tags: ["Nail Art", "Gel", "Pedicure"], description: "Arte em cada detalhe. As melhores nail techs de Viana." },
];

interface PageProps {
  searchParams: Promise<{ q?: string; cidade?: string; categoria?: string; ordenar?: string; avaliacao?: string; aberto?: string }>;
}

export default async function SaloesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const { q, cidade, categoria, ordenar, avaliacao, aberto } = params;

  // In production, this would be a Supabase query
  let salons = [...MOCK_SALONS];
  if (q) salons = salons.filter(s => s.name.toLowerCase().includes(q.toLowerCase()) || s.tags.some(t => t.toLowerCase().includes(q.toLowerCase())));
  if (cidade) salons = salons.filter(s => s.city.toLowerCase().includes(cidade.toLowerCase()));
  if (categoria && categoria !== "all") salons = salons.filter(s => s.tags.some(t => t.toLowerCase().includes(categoria.toLowerCase())));
  if (avaliacao) salons = salons.filter(s => s.rating >= parseFloat(avaliacao));
  if (aberto === "true") salons = salons.filter(s => s.is_open);

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        {/* Page header */}
        <div className="bg-noir-925 border-b border-noir-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-white">
                  {q ? `Resultados para "${q}"` : cidade ? `Salões em ${cidade}` : "Todos os Salões"}
                </h1>
                <p className="text-sm text-noir-500 mt-1">
                  {salons.length} salão{salons.length !== 1 ? "ões" : ""} encontrado{salons.length !== 1 ? "s" : ""}
                  {cidade && ` em ${cidade}`}
                </p>
              </div>

              {/* Search mini */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-noir-500" />
                  <input
                    defaultValue={q}
                    placeholder="Pesquisar..."
                    className="h-9 pl-9 pr-4 text-sm bg-noir-900 border border-noir-800 rounded-lg text-noir-200 placeholder:text-noir-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-transparent w-48"
                  />
                </div>
              </div>
            </div>

            <SalonFilters />
          </div>
        </div>

        {/* Results */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {salons.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-noir-900 border border-noir-800 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-noir-600" />
              </div>
              <h3 className="font-playfair text-xl font-semibold text-white mb-2">
                Nenhum salão encontrado
              </h3>
              <p className="text-noir-500 text-sm">
                Tente ajustar os filtros ou pesquisar por outros termos.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {salons.map((salon) => (
                <SalonCard key={salon.id} salon={salon} layout="grid" />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
