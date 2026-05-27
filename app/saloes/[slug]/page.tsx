import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BookingForm } from "@/components/salons/booking-form";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Star, MapPin, Phone, CheckCircle2, Heart, Share2,
  Clock, AtSign, MessageCircle,
} from "lucide-react";
import { getInitials } from "@/lib/utils";

// Mock salon data
const SALONS_DATA: Record<string, {
  id: string; slug: string; name: string; category: string;
  neighborhood: string; city: string; province: string;
  rating: number; review_count: number; is_verified: boolean; is_open: boolean;
  is_featured: boolean; phone: string; whatsapp: string; instagram?: string;
  address: string; description: string; tags: string[];
  services: { id: string; name: string; duration: number; price: number; category: string }[];
  professionals: { id: string; name: string; role: string; rating: number; reviews: number }[];
  reviews: { id: string; name: string; rating: number; comment: string; date: string; service: string }[];
  working_hours: { day: string; hours: string; is_closed: boolean }[];
}> = {
  "glamour-studio-luanda": {
    id: "1", slug: "glamour-studio-luanda", name: "Glamour Studio",
    category: "Cabelo & Beleza", neighborhood: "Miramar", city: "Luanda", province: "Luanda",
    rating: 4.9, review_count: 218, is_verified: true, is_open: true, is_featured: true,
    phone: "+244 923 000 000", whatsapp: "+244 923 000 000", instagram: "@glamourstudioluanda",
    address: "Rua do Miramar, 45, Miramar, Luanda",
    description: "O Glamour Studio é o destino premium de beleza em Luanda. Com mais de 10 anos de experiência, os nossos especialistas são apaixonados pela arte da beleza feminina. Oferecemos tratamentos de cabelo, manicure, maquiagem profissional e muito mais, num ambiente sofisticado e acolhedor.",
    tags: ["Cabelo", "Manicure", "Maquiagem", "Coloração", "Alisamento", "Tratamentos"],
    services: [
      { id: "s1", name: "Corte de Cabelo", duration: 45, price: 3500, category: "Cabelo" },
      { id: "s2", name: "Coloração Completa", duration: 120, price: 8000, category: "Cabelo" },
      { id: "s3", name: "Alisamento Definitivo", duration: 180, price: 15000, category: "Cabelo" },
      { id: "s4", name: "Manicure Clássica", duration: 45, price: 2500, category: "Unhas" },
      { id: "s5", name: "Pedicure + Manicure", duration: 90, price: 4500, category: "Unhas" },
      { id: "s6", name: "Maquiagem Completa", duration: 60, price: 6000, category: "Maquiagem" },
      { id: "s7", name: "Hidratação Capilar", duration: 60, price: 5000, category: "Tratamento" },
    ],
    professionals: [
      { id: "p1", name: "Inês Fernandes", role: "Especialista Capilar", rating: 5.0, reviews: 89 },
      { id: "p2", name: "Sofia Neto", role: "Nail Artist", rating: 4.9, reviews: 124 },
      { id: "p3", name: "Beatriz Cardoso", role: "Make-up Artist", rating: 4.8, reviews: 67 },
    ],
    reviews: [
      { id: "r1", name: "Ana Ferreira", rating: 5, comment: "Absolutamente incrível! A Inês fez um trabalho fantástico no meu cabelo. Saí do salão radiante. Recomendo a todas!", date: "2025-04-15", service: "Coloração Completa" },
      { id: "r2", name: "Maria Coelho", rating: 5, comment: "A Sofia é uma artista com as unhas! O meu nail art ficou perfeito. Já é o meu salão favorito em Luanda.", date: "2025-04-10", service: "Manicure" },
      { id: "r3", name: "Lúcia Mendes", rating: 4, comment: "Ótimo atendimento e resultados excelentes. O espaço é muito bonito e o ambiente é acolhedor.", date: "2025-04-05", service: "Corte de Cabelo" },
    ],
    working_hours: [
      { day: "Segunda", hours: "09:00 - 19:00", is_closed: false },
      { day: "Terça", hours: "09:00 - 19:00", is_closed: false },
      { day: "Quarta", hours: "09:00 - 19:00", is_closed: false },
      { day: "Quinta", hours: "09:00 - 19:00", is_closed: false },
      { day: "Sexta", hours: "09:00 - 20:00", is_closed: false },
      { day: "Sábado", hours: "08:00 - 18:00", is_closed: false },
      { day: "Domingo", hours: "Fechado", is_closed: true },
    ],
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function SalonDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const salon = SALONS_DATA[slug];

  if (!salon) notFound();

  const avgRating = salon.rating;
  const ratingStars = Array.from({ length: 5 }, (_, i) => i < Math.floor(avgRating));

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        {/* Hero Cover */}
        <div className="relative h-72 sm:h-96 bg-gradient-to-br from-gold-900/60 via-noir-925 to-noir-950 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-playfair text-[12rem] font-bold text-white/5 select-none leading-none">
              {salon.name[0]}
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-noir-975 via-noir-975/30 to-transparent" />

          {/* Actions */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button className="w-10 h-10 rounded-full glass-dark border border-gold-500/20 flex items-center justify-center text-noir-300 hover:text-rose-400 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full glass-dark border border-gold-500/20 flex items-center justify-center text-noir-300 hover:text-gold-400 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Salon header */}
              <div className="glass-dark border border-noir-800 rounded-2xl p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h1 className="font-playfair text-3xl font-bold text-white">{salon.name}</h1>
                      {salon.is_verified && (
                        <Badge variant="verified">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Verificado
                        </Badge>
                      )}
                      {salon.is_featured && <Badge variant="gold">★ Destaque</Badge>}
                    </div>
                    <p className="text-noir-400 text-sm">{salon.category}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="flex items-center gap-1 justify-end mb-0.5">
                      <Star className="w-5 h-5 text-gold-400 fill-gold-400" />
                      <span className="text-2xl font-bold text-gold-400">{salon.rating}</span>
                    </div>
                    <p className="text-xs text-noir-500">{salon.review_count} avaliações</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-noir-400 mb-4">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-rose-400" />
                    {salon.address}
                  </span>
                  <span className={`flex items-center gap-1.5 ${salon.is_open ? "text-green-400" : "text-noir-500"}`}>
                    <span className={`w-2 h-2 rounded-full ${salon.is_open ? "bg-green-400" : "bg-noir-600"}`} />
                    {salon.is_open ? "Aberto agora" : "Fechado"}
                  </span>
                </div>

                <p className="text-sm text-noir-300 leading-relaxed mb-5">{salon.description}</p>

                <div className="flex flex-wrap gap-2">
                  {salon.tags.map((tag) => (
                    <span key={tag} className="text-xs px-3 py-1 rounded-full bg-noir-900 border border-noir-800 text-noir-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div className="glass-dark border border-noir-800 rounded-2xl p-6">
                <h2 className="font-playfair text-xl font-bold text-white mb-5">Serviços</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {salon.services.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center justify-between p-4 bg-noir-900 rounded-xl border border-noir-800 hover:border-gold-500/30 transition-colors group"
                    >
                      <div>
                        <p className="text-sm font-medium text-white group-hover:text-gold-400 transition-colors">
                          {service.name}
                        </p>
                        <p className="text-xs text-noir-500 mt-0.5 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {service.duration} min
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-gold-400 shrink-0">
                        {service.price.toLocaleString("pt-AO")} AOA
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Professionals */}
              <div className="glass-dark border border-noir-800 rounded-2xl p-6">
                <h2 className="font-playfair text-xl font-bold text-white mb-5">A Nossa Equipa</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {salon.professionals.map((pro) => (
                    <div key={pro.id} className="text-center p-4 bg-noir-900 rounded-xl border border-noir-800">
                      <Avatar className="w-14 h-14 mx-auto mb-3">
                        <AvatarFallback className="text-base">{getInitials(pro.name)}</AvatarFallback>
                      </Avatar>
                      <p className="text-sm font-medium text-white">{pro.name}</p>
                      <p className="text-xs text-noir-500 mb-2">{pro.role}</p>
                      <div className="flex items-center justify-center gap-1">
                        <Star className="w-3 h-3 text-gold-400 fill-gold-400" />
                        <span className="text-xs text-gold-400 font-medium">{pro.rating}</span>
                        <span className="text-xs text-noir-600">({pro.reviews})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div className="glass-dark border border-noir-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-playfair text-xl font-bold text-white">Avaliações</h2>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {ratingStars.map((filled, i) => (
                        <Star key={i} className={`w-4 h-4 ${filled ? "text-gold-400 fill-gold-400" : "text-noir-700"}`} />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-gold-400">{salon.rating}</span>
                    <span className="text-xs text-noir-500">({salon.review_count})</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {salon.reviews.map((review) => (
                    <div key={review.id} className="p-4 bg-noir-900 rounded-xl border border-noir-800">
                      <div className="flex items-start gap-3">
                        <Avatar className="w-9 h-9 shrink-0">
                          <AvatarFallback className="text-xs">{getInitials(review.name)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <p className="text-sm font-medium text-white">{review.name}</p>
                            <span className="text-xs text-noir-600 shrink-0">{review.date}</span>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <Star key={i} className="w-3 h-3 text-gold-400 fill-gold-400" />
                            ))}
                            <span className="text-xs text-noir-500 ml-1">• {review.service}</span>
                          </div>
                          <p className="text-sm text-noir-300 leading-relaxed">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Booking + Info */}
            <div className="space-y-5">
              {/* Booking widget */}
              <div className="glass-dark border border-gold-500/20 rounded-2xl p-6 sticky top-20">
                <h3 className="font-playfair text-xl font-bold text-white mb-1">Fazer Marcação</h3>
                <p className="text-xs text-noir-500 mb-5">Confirme em segundos, sem filas.</p>
                <BookingForm
                  salonId={salon.id}
                  salonName={salon.name}
                  services={salon.services}
                />
              </div>

              {/* Contact */}
              <div className="glass-dark border border-noir-800 rounded-2xl p-5">
                <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contactos</h3>
                <div className="space-y-3">
                  <a href={`tel:${salon.phone}`} className="flex items-center gap-3 text-sm text-noir-300 hover:text-gold-400 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-noir-900 border border-noir-800 flex items-center justify-center shrink-0">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    {salon.phone}
                  </a>
                  <a href={`https://wa.me/${salon.whatsapp.replace(/\s+/g, "")}`} className="flex items-center gap-3 text-sm text-noir-300 hover:text-green-400 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-noir-900 border border-noir-800 flex items-center justify-center shrink-0">
                      <MessageCircle className="w-3.5 h-3.5" />
                    </div>
                    WhatsApp
                  </a>
                  {salon.instagram && (
                    <a href="#" className="flex items-center gap-3 text-sm text-noir-300 hover:text-rose-400 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-noir-900 border border-noir-800 flex items-center justify-center shrink-0">
                        <AtSign className="w-3.5 h-3.5" />
                      </div>
                      {salon.instagram}
                    </a>
                  )}
                </div>
              </div>

              {/* Hours */}
              <div className="glass-dark border border-noir-800 rounded-2xl p-5">
                <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Horário</h3>
                <div className="space-y-2">
                  {salon.working_hours.map(({ day, hours, is_closed }) => (
                    <div key={day} className="flex items-center justify-between text-xs">
                      <span className="text-noir-400 w-24">{day}</span>
                      <span className={is_closed ? "text-noir-600" : "text-noir-200"}>
                        {hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
