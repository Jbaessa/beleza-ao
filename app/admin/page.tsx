import React from "react";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import { Users, Store, Calendar, Star, TrendingUp, AlertTriangle, CheckCircle2, ChevronRight, Settings, BarChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const STATS = [
  { label: "Utilizadores", value: "1.247", trend: "+89 este mês", icon: Users, color: "text-blue-400" },
  { label: "Salões Activos", value: "218", trend: "+12 este mês", icon: Store, color: "text-gold-400" },
  { label: "Marcações hoje", value: "342", trend: "+23%", icon: Calendar, color: "text-rose-400" },
  { label: "Receita da plataforma", value: "1.2M AOA", trend: "+31%", icon: TrendingUp, color: "text-green-400" },
];

const PENDING_SALONS = [
  { id: "s1", name: "Bella Spa Benguela", owner: "Rosa Ferreira", city: "Benguela", date: "2025-05-25" },
  { id: "s2", name: "Nail Art Studio", owner: "Joana Lima", city: "Luanda", date: "2025-05-26" },
  { id: "s3", name: "Perfect Beauty", owner: "Clara Santos", city: "Huambo", date: "2025-05-27" },
];

const RECENT_REVIEWS = [
  { id: "r1", salon: "Glamour Studio", client: "Maria A.", rating: 5, text: "Excelente serviço!", status: "visible" as const },
  { id: "r2", salon: "Luxe Beauty", client: "Ana B.", rating: 2, text: "Esperou 1h além da marcação.", status: "flagged" as const },
  { id: "r3", salon: "Zen Spa", client: "Luísa C.", rating: 4, text: "Muito bom, recomendo.", status: "visible" as const },
];

const NAV_ITEMS = [
  { href: "/admin/utilizadores", icon: Users, label: "Utilizadores", count: 1247 },
  { href: "/admin/saloes", icon: Store, label: "Salões", count: 218 },
  { href: "/admin/categorias", icon: BarChart, label: "Categorias", count: 10 },
  { href: "/admin/marcacoes", icon: Calendar, label: "Marcações", count: 342 },
  { href: "/admin/avaliacoes", icon: Star, label: "Avaliações", count: 4891 },
  { href: "/admin/configuracoes", icon: Settings, label: "Configurações" },
];

export default function AdminDashboardPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-900/30 border border-red-800/50 text-red-400 text-xs font-medium mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                Painel de Administração
              </div>
              <h1 className="font-playfair text-3xl font-bold text-white">Dashboard Admin</h1>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {STATS.map(({ label, value, trend, icon: Icon, color }) => (
              <div key={label} className="glass-dark border border-noir-800 rounded-2xl p-5">
                <Icon className={`w-5 h-5 ${color} mb-3`} />
                <p className={`font-playfair text-2xl font-bold ${color} mb-0.5`}>{value}</p>
                <p className="text-xs text-noir-500">{label}</p>
                <p className="text-xs text-green-400 mt-1">{trend}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Pending salons */}
            <div className="lg:col-span-2 space-y-5">
              <div className="glass-dark border border-noir-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-playfair text-xl font-bold text-white">
                    Salões Pendentes
                    <Badge variant="warning" className="ml-2">{PENDING_SALONS.length}</Badge>
                  </h2>
                  <Link href="/admin/saloes" className="text-xs text-gold-500">Ver todos →</Link>
                </div>
                <div className="space-y-3">
                  {PENDING_SALONS.map((salon) => (
                    <div key={salon.id} className="flex items-center gap-3 p-3 bg-noir-900 rounded-xl border border-noir-800">
                      <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white">{salon.name}</p>
                        <p className="text-xs text-noir-500">{salon.owner} · {salon.city} · {salon.date}</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <Button variant="danger" size="sm">Rejeitar</Button>
                        <Button variant="gold" size="sm">Aprovar</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent reviews */}
              <div className="glass-dark border border-noir-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-playfair text-xl font-bold text-white">Avaliações Recentes</h2>
                  <Link href="/admin/avaliacoes" className="text-xs text-gold-500">Ver todas →</Link>
                </div>
                <div className="space-y-3">
                  {RECENT_REVIEWS.map((r) => (
                    <div key={r.id} className="flex items-start gap-3 p-3 bg-noir-900 rounded-xl border border-noir-800">
                      <div className="flex items-center gap-1 shrink-0">
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-gold-400 fill-gold-400" />
                        ))}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-noir-400 mb-0.5">{r.client} · {r.salon}</p>
                        <p className="text-sm text-noir-200 truncate">{r.text}</p>
                      </div>
                      <div className="shrink-0">
                        {r.status === "flagged" ? (
                          <Badge variant="danger">Sinalizada</Badge>
                        ) : (
                          <Badge variant="success"><CheckCircle2 className="w-3 h-3 mr-1" />Ok</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="glass-dark border border-noir-800 rounded-2xl p-5">
              <h2 className="font-semibold text-white mb-4">Gestão Rápida</h2>
              <div className="space-y-1">
                {NAV_ITEMS.map(({ href, icon: Icon, label, count }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-noir-900 group transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-noir-900 border border-noir-800 flex items-center justify-center shrink-0 group-hover:border-gold-500/30 transition-colors">
                      <Icon className="w-4 h-4 text-noir-400 group-hover:text-gold-400 transition-colors" />
                    </div>
                    <span className="flex-1 text-sm text-noir-300 group-hover:text-white transition-colors">{label}</span>
                    {count !== undefined && (
                      <span className="text-xs text-noir-600 font-mono">{count.toLocaleString()}</span>
                    )}
                    <ChevronRight className="w-4 h-4 text-noir-700 group-hover:text-gold-500 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
