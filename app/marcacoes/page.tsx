import React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Calendar, Clock, CheckCircle2, XCircle, AlertCircle, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { BookingStatus } from "@/lib/types";

const MOCK_BOOKINGS = [
  { id: "b1", salon: "Glamour Studio", service: "Coloração Completa", date: "2025-05-30", time: "10:00", price: 8000, status: "confirmed" as BookingStatus, duration: 120, professional: "Inês Fernandes", city: "Miramar, Luanda" },
  { id: "b2", salon: "Bella Unhas Design", service: "Manicure Clássica", date: "2025-06-05", time: "14:30", price: 2500, status: "pending" as BookingStatus, duration: 45, professional: "Sofia Neto", city: "Ingombota, Luanda" },
  { id: "b3", salon: "Pure Skin Clinic", service: "Tratamento Facial", date: "2025-04-15", time: "11:00", price: 8000, status: "completed" as BookingStatus, duration: 90, professional: "Dr.ª Carla Sousa", city: "Talatona, Luanda" },
  { id: "b4", salon: "Zen Spa", service: "Massagem Relaxante", date: "2025-04-02", time: "15:00", price: 6000, status: "cancelled" as BookingStatus, duration: 60, professional: "Ana Lima", city: "Maianga, Luanda" },
];

const STATUS_CONFIG: Record<BookingStatus, { label: string; icon: typeof CheckCircle2; variant: "success" | "warning" | "dark" | "danger" }> = {
  pending: { label: "Pendente", icon: AlertCircle, variant: "warning" },
  confirmed: { label: "Confirmada", icon: CheckCircle2, variant: "success" },
  completed: { label: "Concluída", icon: CheckCircle2, variant: "dark" },
  cancelled: { label: "Cancelada", icon: XCircle, variant: "danger" },
  no_show: { label: "Não compareceu", icon: XCircle, variant: "danger" },
};

function BookingCard({ booking }: { booking: typeof MOCK_BOOKINGS[0] }) {
  const status = STATUS_CONFIG[booking.status];
  const Icon = status.icon;

  return (
    <div className="glass-dark border border-noir-800 rounded-2xl p-5 hover:border-gold-500/20 transition-all">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="font-playfair text-lg font-semibold text-white">{booking.salon}</h3>
          <p className="text-sm text-noir-400">{booking.service}</p>
        </div>
        <Badge variant={status.variant}>
          <Icon className="w-3 h-3 mr-1" />
          {status.label}
        </Badge>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {[
          { icon: Calendar, label: booking.date },
          { icon: Clock, label: `${booking.time} · ${booking.duration}min` },
          { icon: MapPin, label: booking.city },
        ].map(({ icon: I, label }) => (
          <div key={label} className="flex items-center gap-1.5 text-xs text-noir-500">
            <I className="w-3.5 h-3.5 shrink-0" />
            <span>{label}</span>
          </div>
        ))}
        <div className="text-right">
          <p className="text-sm font-semibold text-gold-400">{booking.price.toLocaleString("pt-AO")} AOA</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-noir-800">
        <p className="text-xs text-noir-500">com <span className="text-noir-300">{booking.professional}</span></p>
        <div className="flex gap-2">
          {booking.status === "confirmed" && (
            <Button variant="danger" size="sm">Cancelar</Button>
          )}
          {booking.status === "completed" && (
            <Button variant="outline-gold" size="sm">Avaliar</Button>
          )}
          <Button variant="dark" size="sm">Detalhes</Button>
        </div>
      </div>
    </div>
  );
}

export default function MarcacoesPage() {
  const upcoming = MOCK_BOOKINGS.filter((b) => ["pending", "confirmed"].includes(b.status));
  const past = MOCK_BOOKINGS.filter((b) => ["completed", "cancelled", "no_show"].includes(b.status));

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-playfair text-3xl font-bold text-white">As minhas Marcações</h1>
              <p className="text-noir-500 text-sm mt-1">{MOCK_BOOKINGS.length} marcação{MOCK_BOOKINGS.length !== 1 ? "ões" : ""} no total</p>
            </div>
            <Button variant="gold" size="md" asChild>
              <a href="/saloes">+ Nova Marcação</a>
            </Button>
          </div>

          <Tabs defaultValue="upcoming">
            <TabsList className="mb-6">
              <TabsTrigger value="upcoming">
                Próximas ({upcoming.length})
              </TabsTrigger>
              <TabsTrigger value="past">
                Histórico ({past.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              {upcoming.length === 0 ? (
                <div className="text-center py-16">
                  <Calendar className="w-12 h-12 text-noir-700 mx-auto mb-3" />
                  <p className="text-noir-500 text-sm">Não tem marcações próximas.</p>
                  <Button variant="gold" size="md" className="mt-4" asChild>
                    <a href="/saloes">Marcar agora</a>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcoming.map((b) => <BookingCard key={b.id} booking={b} />)}
                </div>
              )}
            </TabsContent>

            <TabsContent value="past">
              <div className="space-y-4">
                {past.map((b) => <BookingCard key={b.id} booking={b} />)}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
}
