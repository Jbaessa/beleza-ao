"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Clock, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, isBefore, startOfDay } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
}

interface BookingFormProps {
  salonId: string;
  salonName: string;
  services: Service[];
}

const TIME_SLOTS = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30",
];

// Simulate some unavailable slots
const BOOKED_SLOTS = ["09:00", "10:30", "14:00", "16:00"];

type Step = "service" | "date" | "time" | "confirm";

export function BookingForm({ salonId, salonName, services }: BookingFormProps) {
  const router = useRouter();
  const [step, setStep] = useState<Step>("service");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });
  const firstDayOfWeek = startOfMonth(currentMonth).getDay();

  async function handleConfirm() {
    if (!selectedService || !selectedDate || !selectedTime) return;
    setLoading(true);
    // Simulate booking — in production, call Supabase
    await new Promise((r) => setTimeout(r, 1500));
    setStep("confirm" as Step);
    setLoading(false);
  }

  if (step === "confirm") {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full bg-green-900/40 border border-green-700 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="font-playfair text-xl font-bold text-white mb-2">Marcação Confirmada!</h3>
        <p className="text-sm text-noir-400 mb-6">
          A sua marcação em <strong className="text-gold-400">{salonName}</strong> foi confirmada.<br />
          Receberá uma confirmação em breve.
        </p>
        <div className="glass-gold border border-gold-500/20 rounded-xl p-4 text-left mb-6">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-noir-400">Serviço</span>
              <span className="text-white font-medium">{selectedService?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-noir-400">Data</span>
              <span className="text-white font-medium">
                {selectedDate && format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-noir-400">Hora</span>
              <span className="text-white font-medium">{selectedTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-noir-400">Preço</span>
              <span className="text-gold-400 font-semibold">
                {selectedService?.price.toLocaleString("pt-AO")} AOA
              </span>
            </div>
          </div>
        </div>
        <Button variant="outline-gold" size="md" className="w-full" onClick={() => router.push("/marcacoes")}>
          Ver as minhas marcações
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center gap-1">
        {(["service", "date", "time"] as const).map((s, i) => (
          <React.Fragment key={s}>
            <div
              className={`flex-1 h-1 rounded-full transition-all ${
                ["service", "date", "time"].indexOf(step) >= i
                  ? "bg-gradient-gold"
                  : "bg-noir-800"
              }`}
            />
          </React.Fragment>
        ))}
      </div>

      {/* Step: Service */}
      {step === "service" && (
        <div>
          <p className="text-xs uppercase tracking-widest text-gold-500 font-semibold mb-4">
            1. Escolha o serviço
          </p>
          <div className="space-y-2">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => { setSelectedService(service); setStep("date"); }}
                className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                  selectedService?.id === service.id
                    ? "border-gold-500 bg-gold-500/10"
                    : "border-noir-800 bg-noir-900 hover:border-gold-500/40"
                }`}
              >
                <div className="text-left">
                  <p className="text-sm font-medium text-white">{service.name}</p>
                  <p className="text-xs text-noir-500">{service.duration} min</p>
                </div>
                <p className="text-sm font-semibold text-gold-400">
                  {service.price.toLocaleString("pt-AO")} AOA
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step: Date */}
      {step === "date" && (
        <div>
          <p className="text-xs uppercase tracking-widest text-gold-500 font-semibold mb-4">
            2. Escolha a data
          </p>

          {/* Month navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              className="w-8 h-8 rounded-lg bg-noir-900 border border-noir-800 flex items-center justify-center text-noir-400 hover:text-gold-400 hover:border-gold-500/40 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-medium text-white capitalize">
              {format(currentMonth, "MMMM yyyy", { locale: ptBR })}
            </span>
            <button
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="w-8 h-8 rounded-lg bg-noir-900 border border-noir-800 flex items-center justify-center text-noir-400 hover:text-gold-400 hover:border-gold-500/40 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["D", "S", "T", "Q", "Q", "S", "S"].map((d, i) => (
              <div key={i} className="text-center text-xs text-noir-500 py-1">{d}</div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {daysInMonth.map((day) => {
              const isPast = isBefore(day, startOfDay(new Date()));
              const isSelected = selectedDate && isSameDay(day, selectedDate);
              const isCurrentDay = isToday(day);

              return (
                <button
                  key={day.toISOString()}
                  disabled={isPast}
                  onClick={() => { setSelectedDate(day); setStep("time"); }}
                  className={`aspect-square rounded-lg text-xs font-medium transition-all ${
                    isSelected
                      ? "bg-gradient-gold text-noir-975 shadow-gold"
                      : isPast
                      ? "text-noir-700 cursor-not-allowed"
                      : isCurrentDay
                      ? "border border-gold-500/50 text-gold-400"
                      : "text-noir-300 hover:bg-noir-800 hover:text-white"
                  }`}
                >
                  {format(day, "d")}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setStep("service")}
            className="mt-4 text-xs text-noir-500 hover:text-gold-400 transition-colors flex items-center gap-1"
          >
            ← Voltar
          </button>
        </div>
      )}

      {/* Step: Time */}
      {step === "time" && (
        <div>
          <p className="text-xs uppercase tracking-widest text-gold-500 font-semibold mb-1">
            3. Escolha a hora
          </p>
          {selectedDate && (
            <p className="text-sm text-noir-400 mb-4 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {format(selectedDate, "EEEE, dd 'de' MMMM", { locale: ptBR })}
            </p>
          )}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {TIME_SLOTS.map((slot) => {
              const isBooked = BOOKED_SLOTS.includes(slot);
              const isSelected = selectedTime === slot;
              return (
                <button
                  key={slot}
                  disabled={isBooked}
                  onClick={() => setSelectedTime(slot)}
                  className={`py-2 px-3 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1 ${
                    isSelected
                      ? "bg-gradient-gold text-noir-975 shadow-gold"
                      : isBooked
                      ? "bg-noir-900 text-noir-600 cursor-not-allowed border border-noir-800/50 line-through"
                      : "bg-noir-900 border border-noir-800 text-noir-300 hover:border-gold-500/40 hover:text-gold-400"
                  }`}
                >
                  <Clock className="w-3 h-3" />
                  {slot}
                </button>
              );
            })}
          </div>

          {selectedTime && (
            <div className="space-y-3">
              <textarea
                placeholder="Notas adicionais (opcional)..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 text-sm bg-noir-900 border border-noir-800 rounded-lg text-noir-200 placeholder:text-noir-600 focus:outline-none focus:ring-2 focus:ring-gold-500/50 resize-none"
              />

              {/* Summary */}
              <div className="glass-gold border border-gold-500/15 rounded-xl p-3 space-y-1.5">
                {[
                  { label: "Serviço", value: selectedService?.name },
                  { label: "Data", value: selectedDate ? format(selectedDate, "dd/MM/yyyy") : "" },
                  { label: "Hora", value: selectedTime },
                  { label: "Duração", value: `${selectedService?.duration} min` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-xs">
                    <span className="text-noir-500">{label}</span>
                    <span className="text-noir-200">{value}</span>
                  </div>
                ))}
                <div className="flex justify-between text-sm font-semibold border-t border-gold-500/10 pt-1.5 mt-1.5">
                  <span className="text-noir-300">Total</span>
                  <span className="text-gold-400">{selectedService?.price.toLocaleString("pt-AO")} AOA</span>
                </div>
              </div>

              <Button
                variant="gold"
                size="lg"
                className="w-full rounded-xl"
                onClick={handleConfirm}
                disabled={loading}
              >
                {loading ? "A confirmar..." : "Confirmar Marcação"}
              </Button>
            </div>
          )}

          <button
            onClick={() => setStep("date")}
            className="mt-3 text-xs text-noir-500 hover:text-gold-400 transition-colors flex items-center gap-1"
          >
            ← Voltar
          </button>
        </div>
      )}
    </div>
  );
}
