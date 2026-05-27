import React from "react";
import { Star, Quote } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

const testimonials = [
  {
    name: "Ana Ferreira",
    city: "Luanda",
    rating: 5,
    text: "Marquei o meu primeiro tratamento facial no Pure Skin e foi uma experiência incrível. A plataforma é muito fácil de usar e o processo de marcação é super rápido!",
    service: "Tratamento Facial",
  },
  {
    name: "Maria José Santos",
    city: "Luanda",
    rating: 5,
    text: "Finalmente consigo encontrar todos os salões de qualidade num só lugar. Uso a Beleza.AO toda semana para a minha manicure no Bella Unhas. Recomendo a todas!",
    service: "Manicure",
  },
  {
    name: "Catarina Mendes",
    city: "Luanda",
    rating: 5,
    text: "Como profissional, o sistema de gestão de agenda da Beleza.AO transformou o meu negócio. Reduzi as faltas e tenho muito mais clientes novos.",
    service: "Parceira Premium",
  },
  {
    name: "Isabel Rodrigues",
    city: "Benguela",
    rating: 5,
    text: "Adorei descobrir o Glamour Studio através da Beleza.AO. As avaliações são reais e ajudam muito a escolher. O meu cabelo nunca esteve tão bem!",
    service: "Coloração de Cabelo",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold-500 mb-3">
          Depoimentos
        </p>
        <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-white mb-4">
          O que dizem as nossas{" "}
          <span className="text-gradient-rose">clientes</span>
        </h2>
        <p className="text-noir-400 text-base max-w-xl mx-auto">
          Histórias reais de mulheres que encontraram os seus salões favoritos na Beleza.AO.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="glass-dark border border-noir-800 rounded-2xl p-6 flex flex-col hover:border-gold-500/20 transition-all duration-300 hover:-translate-y-0.5"
          >
            <Quote className="w-8 h-8 text-gold-500/30 mb-4" />

            <p className="text-sm text-noir-300 leading-relaxed mb-5 flex-1 italic">
              &ldquo;{t.text}&rdquo;
            </p>

            <div className="flex items-center gap-0.5 mb-4">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
              ))}
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-noir-800">
              <Avatar className="w-9 h-9">
                <AvatarFallback className="text-xs">{getInitials(t.name)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-noir-100">{t.name}</p>
                <p className="text-xs text-gold-500/70">{t.service}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
