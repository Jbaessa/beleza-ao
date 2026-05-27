import React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Phone, Shield, Bell, LogOut } from "lucide-react";

export default function PerfilPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="font-playfair text-3xl font-bold text-white mb-8">O meu Perfil</h1>

          <div className="space-y-6">
            {/* Avatar section */}
            <div className="glass-dark border border-noir-800 rounded-2xl p-6">
              <div className="flex items-center gap-5">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="text-2xl">AC</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-playfair text-xl font-bold text-white">Ana Cardoso</h2>
                  <p className="text-sm text-noir-400 mb-3">ana.cardoso@gmail.com</p>
                  <Button variant="outline-gold" size="sm">Alterar foto</Button>
                </div>
              </div>
            </div>

            {/* Personal Info */}
            <div className="glass-dark border border-noir-800 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <User className="w-4 h-4 text-gold-400" />
                <h3 className="font-semibold text-white">Informação Pessoal</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-noir-400 mb-1.5">Nome</label>
                  <Input defaultValue="Ana" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-noir-400 mb-1.5">Apelido</label>
                  <Input defaultValue="Cardoso" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-noir-400 mb-1.5">Email</label>
                  <Input type="email" defaultValue="ana.cardoso@gmail.com" icon={<Mail className="w-4 h-4" />} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-noir-400 mb-1.5">Telemóvel</label>
                  <Input type="tel" defaultValue="+244 923 456 789" icon={<Phone className="w-4 h-4" />} />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="gold" size="md">Guardar Alterações</Button>
              </div>
            </div>

            {/* Security */}
            <div className="glass-dark border border-noir-800 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <Shield className="w-4 h-4 text-gold-400" />
                <h3 className="font-semibold text-white">Segurança</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-noir-400 mb-1.5">Password actual</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-noir-400 mb-1.5">Nova password</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline-gold" size="md">Alterar Password</Button>
              </div>
            </div>

            {/* Notifications */}
            <div className="glass-dark border border-noir-800 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <Bell className="w-4 h-4 text-gold-400" />
                <h3 className="font-semibold text-white">Notificações</h3>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Confirmações de marcação", desc: "Receber email ao confirmar marcação" },
                  { label: "Lembretes", desc: "Notificação 24h antes da marcação" },
                  { label: "Promoções", desc: "Ofertas e descontos exclusivos" },
                ].map(({ label, desc }) => (
                  <div key={label} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-noir-200">{label}</p>
                      <p className="text-xs text-noir-500">{desc}</p>
                    </div>
                    <div className="w-10 h-5 bg-gold-500 rounded-full relative cursor-pointer">
                      <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-noir-975 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Danger zone */}
            <div className="glass-dark border border-red-900/40 rounded-2xl p-6">
              <h3 className="font-semibold text-red-400 mb-4">Zona de Perigo</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="danger" size="md">
                  <LogOut className="w-4 h-4" />
                  Terminar sessão
                </Button>
                <Button variant="danger" size="md">
                  Eliminar conta
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
