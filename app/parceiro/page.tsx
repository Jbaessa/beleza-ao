import React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import { Calendar, Users, Star, TrendingUp, Settings, Scissors, Clock, AlertCircle, CheckCircle2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const STATS = [
  { label: "Marcações este mês", value: "47", trend: "+12%", icon: Calendar, color: "text-gold-400" },
  { label: "Clientes únicos", value: "128", trend: "+8%", icon: Users, color: "text-rose-400" },
  { label: "Avaliação média", value: "4.8★", trend: "+0.2", icon: Star, color: "text-gold-400" },
  { label: "Receita estimada", value: "235.000 AOA", trend: "+18%", icon: TrendingUp, color: "text-green-400" },
];

const UPCOMING = [
  { id: "b1", client: "Ana Ferreira", service: "Coloração Completa", time: "09:00", duration: 120, status: "confirmed" as const },
  { id: "b2", client: "Maria Santos", service: "Manicure Clássica", time: "11:30", duration: 45, status: "confirmed" as const },
  { id: "b3", client: "Joana Neto", service: "Corte de Cabelo", time: "14:00", duration: 45, status: "pending" as const },
  { id: "b4", client: "Luísa Cardoso", service: "Hidratação Capilar", time: "16:00", duration: 60, status: "confirmed" as const },
];

const QUICK_ACTIONS = [
  { href: "/parceiro/salao", icon: Settings, label: "Gerir Salão", desc: "Editar perfil e fotos" },
  { href: "/parceiro/servicos", icon: Scissors, label: "Serviços", desc: "Gerir catálogo" },
  { href: "/parceiro/agenda", icon: Calendar, label: "Agenda", desc: "Ver marcações" },
  { href: "/parceiro/marcacoes", icon: Users, label: "Clientes", desc: "Histórico completo" },
];

export default function ParceiroDashboardPage() {
  const today = new Date().toLocaleDateString("pt-AO", { weekday: "long", day: "numeric", month: "long" });

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-xs text-noir-500 mb-1 capitalize">{today}</p>
              <h1 className="font-playfair text-3xl font-bold text-white">
                Bom dia, <span className="text-gradient-gold">Glamour Studio</span> 👋
              </h1>
              <p className="text-noir-400 text-sm mt-1">Você tem 4 marcações hoje.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline-gold" size="md" asChild>
                <Link href="/parceiro/agenda">Ver Agenda</Link>
              </Button>
              <Button variant="gold" size="md" asChild>
                <Link href="/saloes/glamour-studio-luanda">Ver Perfil Público</Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {STATS.map(({ label, value, trend, icon: Icon, color }) => (
              <div key={label} className="glass-dark border border-noir-800 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <Icon className={`w-5 h-5 ${color}`} />
                  <span className="text-xs text-green-400 font-medium">{trend}</span>
                </div>
                <p className={`font-playfair text-2xl font-bold ${color} mb-0.5`}>{value}</p>
                <p className="text-xs text-noir-500">{label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Today's bookings */}
            <div className="lg:col-span-2 glass-dark border border-noir-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-playfair text-xl font-bold text-white">Marcações de Hoje</h2>
                <Link href="/parceiro/agenda" className="text-xs text-gold-500 hover:text-gold-300">
                  Ver todas →
                </Link>
              </div>
              <div className="space-y-3">
                {UPCOMING.map((b) => (
                  <div key={b.id} className="flex items-center gap-3 p-3 bg-noir-900 rounded-xl border border-noir-800 hover:border-gold-500/20 transition-colors">
                    <div className="w-14 text-center">
                      <p className="text-sm font-bold text-gold-400">{b.time}</p>
                      <p className="text-xs text-noir-600">{b.duration}m</p>
                    </div>
                    <div className="w-px h-10 bg-noir-700" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{b.client}</p>
                      <p className="text-xs text-noir-500">{b.service}</p>
                    </div>
                    <Badge variant={b.status === "confirmed" ? "success" : "warning"}>
                      {b.status === "confirmed" ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <AlertCircle className="w-3 h-3 mr-1" />}
                      {b.status === "confirmed" ? "Confirmada" : "Pendente"}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="space-y-4">
              <div className="glass-dark border border-noir-800 rounded-2xl p-5">
                <h2 className="font-semibold text-white mb-4">Acções Rápidas</h2>
                <div className="space-y-2">
                  {QUICK_ACTIONS.map(({ href, icon: Icon, label, desc }) => (
                    <Link
                      key={href}
                      href={href}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-noir-900 group transition-colors"
                    >
                      <div className="w-9 h-9 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0 group-hover:bg-gold-500/20 transition-colors">
                        <Icon className="w-4 h-4 text-gold-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-noir-200 group-hover:text-gold-400 transition-colors">{label}</p>
                        <p className="text-xs text-noir-600">{desc}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-noir-700 group-hover:text-gold-500 transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Plan badge */}
              <div className="glass-gold border border-gold-500/20 rounded-2xl p-5 text-center">
                <p className="text-xs text-gold-400 font-semibold uppercase tracking-widest mb-1">Plano Actual</p>
                <p className="font-playfair text-2xl font-bold text-gradient-gold mb-3">Premium</p>
                <p className="text-xs text-noir-400 mb-4">Perfil em destaque e prioridade nas pesquisas.</p>
                <Button variant="outline-gold" size="sm" className="w-full">
                  Gerir Plano
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
