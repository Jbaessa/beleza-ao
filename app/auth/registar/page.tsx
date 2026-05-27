"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Sparkles, Mail, Lock, User, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

type AccountType = "client" | "partner";

export default function RegisterPage() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<AccountType>("client");
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function update(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: { full_name: form.name, phone: form.phone, role: accountType },
        },
      });
      if (error) throw error;
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao criar conta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-noir-975 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">✉️</div>
          <h2 className="font-playfair text-3xl font-bold text-white mb-3">Verifique o seu email</h2>
          <p className="text-noir-400 mb-6">
            Enviámos um link de confirmação para <strong className="text-gold-400">{form.email}</strong>. Clique no link para activar a sua conta.
          </p>
          <Link href="/auth/login">
            <Button variant="gold" size="lg" className="rounded-xl">
              Ir para o Login
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-noir-975 flex">
      {/* Left: Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 max-w-md mx-auto w-full">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold">
            <Sparkles className="w-5 h-5 text-noir-975" />
          </div>
          <span className="font-playfair text-2xl font-bold text-gradient-gold">
            Beleza<span className="text-rose-400">.AO</span>
          </span>
        </Link>

        <div className="mb-6">
          <h1 className="font-playfair text-3xl font-bold text-white mb-2">Criar conta</h1>
          <p className="text-noir-400 text-sm">Junte-se à comunidade Beleza.AO</p>
        </div>

        {/* Account type */}
        <div className="flex gap-2 mb-6 p-1 bg-noir-900 rounded-xl border border-noir-800">
          {(["client", "partner"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setAccountType(type)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                accountType === type
                  ? "bg-gradient-gold text-noir-975"
                  : "text-noir-400 hover:text-noir-200"
              }`}
            >
              {type === "client" ? "Sou Cliente" : "Sou Parceiro/a"}
            </button>
          ))}
        </div>

        {accountType === "partner" && (
          <div className="mb-5 p-3 rounded-xl bg-gold-500/8 border border-gold-500/20 text-xs text-gold-400">
            Como parceiro, poderá gerir o seu salão, serviços e marcações na plataforma.
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-900/30 border border-red-800/60 text-red-300 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-noir-400 mb-1.5">Nome completo</label>
            <Input
              type="text"
              placeholder="O seu nome"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              required
              icon={<User className="w-4 h-4" />}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-noir-400 mb-1.5">Email</label>
            <Input
              type="email"
              placeholder="o-seu-email@exemplo.com"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              required
              icon={<Mail className="w-4 h-4" />}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-noir-400 mb-1.5">Telemóvel (opcional)</label>
            <Input
              type="tel"
              placeholder="+244 9XX XXX XXX"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              icon={<Phone className="w-4 h-4" />}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-noir-400 mb-1.5">Password</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Mínimo 8 caracteres"
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                required
                minLength={8}
                icon={<Lock className="w-4 h-4" />}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-noir-500 hover:text-noir-200 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <p className="text-xs text-noir-600">
            Ao criar conta, aceita os nossos{" "}
            <Link href="/termos" className="text-gold-500 hover:underline">Termos de Uso</Link>
            {" "}e{" "}
            <Link href="/privacidade" className="text-gold-500 hover:underline">Política de Privacidade</Link>.
          </p>

          <Button
            type="submit"
            variant="gold"
            size="lg"
            className="w-full rounded-xl"
            disabled={loading}
          >
            {loading ? "A criar conta..." : "Criar Conta Gratuita"}
          </Button>
        </form>

        <p className="text-center text-sm text-noir-500 mt-6">
          Já tem conta?{" "}
          <Link href="/auth/login" className="text-gold-400 hover:text-gold-300 font-medium transition-colors">
            Entrar
          </Link>
        </p>
      </div>

      {/* Right: Decorative */}
      <div className="hidden lg:flex flex-1 bg-noir-925 border-l border-noir-900 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-transparent to-gold-500/5" />
        <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-rose-500/8 rounded-full blur-3xl" />
        <div className="relative text-center p-12">
          <div className="text-7xl mb-6">💄</div>
          <h2 className="font-playfair text-3xl font-bold text-white mb-3">
            A beleza que merece
          </h2>
          <p className="text-noir-400 text-base max-w-xs mx-auto leading-relaxed">
            Crie a sua conta e descubra os melhores salões e spas de Angola. É gratuito.
          </p>
          <div className="mt-8 space-y-3 text-left">
            {[
              "Marcações online 24/7",
              "Avaliações verificadas",
              "Profissionais certificados",
              "Cancelamento gratuito",
            ].map((b) => (
              <div key={b} className="flex items-center gap-2 text-sm text-noir-300">
                <span className="text-gold-400">✓</span>
                {b}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
