import React from "react";
import { Search, CalendarCheck, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Descubra",
    description: "Pesquise salões, clínicas e spas perto de si. Filtre por categoria, localização, preço e avaliações.",
    color: "from-gold-400 to-gold-600",
  },
  {
    number: "02",
    icon: CalendarCheck,
    title: "Reserve",
    description: "Escolha o serviço, profissional e horário disponível. A marcação fica confirmada em segundos.",
    color: "from-rose-400 to-rose-600",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Brilhe",
    description: "Apareça na hora marcada e desfrute do seu tratamento. Depois avalie e partilhe a sua experiência.",
    color: "from-purple-400 to-pink-500",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-noir-925/30 to-transparent" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-gold-500/4 rounded-full blur-3xl" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-rose-500/4 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-500 mb-3">
            Como Funciona
          </p>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-white mb-4">
            Simples, rápido e{" "}
            <span className="text-gradient-gold">elegante</span>
          </h2>
          <p className="text-noir-400 text-base max-w-lg mx-auto">
            Marcar um tratamento de beleza nunca foi tão fácil. Em três passos, está pronta para brilhar.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative">
          {/* Connector lines (desktop) */}
          <div className="hidden md:block absolute top-16 left-1/3 right-1/3 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

          {steps.map((step, index) => (
            <div key={step.number} className="relative group">
              <div className="glass-dark border border-noir-800 rounded-2xl p-7 text-center group-hover:border-gold-500/25 transition-all duration-300 group-hover:-translate-y-1">
                {/* Step number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-noir-975 border border-noir-800 flex items-center justify-center">
                  <span className="text-xs font-bold text-gold-500">{step.number}</span>
                </div>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-5 shadow-lg mt-2`}>
                  <step.icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="font-playfair text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-noir-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Arrow between steps */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute -right-4 top-16 z-10 w-8 h-8 items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-gold-500/40" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Link href="/saloes">
            <Button variant="gold" size="xl" className="rounded-2xl">
              <Search className="w-5 h-5" />
              Encontrar Salão Agora
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
