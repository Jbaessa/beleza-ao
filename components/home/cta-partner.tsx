import React from "react";
import Link from "next/link";
import { TrendingUp, Users, Calendar, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  { icon: Calendar, label: "Agenda online 24/7" },
  { icon: Users, label: "Alcance mais clientes" },
  { icon: TrendingUp, label: "Aumente as suas receitas" },
  { icon: Shield, label: "Perfil verificado" },
];

export function CtaPartner() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="relative glass-dark border border-gold-500/15 rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-16">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-rose-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, rgba(212,175,55,0.5) 0, rgba(212,175,55,0.5) 1px, transparent 0, transparent 50%)`,
              backgroundSize: "20px 20px",
            }}
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gold-500 mb-4">
                Para Profissionais
              </p>
              <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
                Faça crescer o seu{" "}
                <span className="text-gradient-gold">negócio de beleza</span>
              </h2>
              <p className="text-noir-400 text-base mb-8 leading-relaxed">
                Junte-se a centenas de profissionais que já usam a Beleza.AO para gerir marcações, atrair novos clientes e aumentar as suas receitas.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {benefits.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-gold-500/15 border border-gold-500/25 flex items-center justify-center shrink-0">
                      <Icon className="w-3.5 h-3.5 text-gold-400" />
                    </div>
                    <span className="text-sm text-noir-300">{label}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/parceiro/registar">
                  <Button variant="gold" size="lg" className="w-full sm:w-auto rounded-xl">
                    Listar o meu Negócio
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/parceiro/planos">
                  <Button variant="outline-gold" size="lg" className="w-full sm:w-auto rounded-xl">
                    Ver Planos
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats card */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-xs space-y-4">
                {[
                  { label: "Marcações este mês", value: "+340%", trend: "crescimento médio" },
                  { label: "Novos clientes", value: "85%", trend: "via Beleza.AO" },
                  { label: "Avaliação média", value: "4.8★", trend: "dos parceiros" },
                ].map(({ label, value, trend }) => (
                  <div key={label} className="bg-noir-900/60 border border-noir-800 rounded-2xl p-4">
                    <p className="text-xs text-noir-500 mb-1">{label}</p>
                    <p className="font-playfair text-2xl font-bold text-gradient-gold">{value}</p>
                    <p className="text-xs text-noir-500 mt-0.5">{trend}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
