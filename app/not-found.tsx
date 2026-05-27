import Link from "next/link";
import { Sparkles, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-noir-975 flex flex-col items-center justify-center px-4">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative text-center max-w-md">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-gold flex items-center justify-center shadow-gold-lg">
            <Sparkles className="w-8 h-8 text-noir-975" />
          </div>
        </div>

        {/* 404 */}
        <p className="text-8xl font-playfair font-bold text-gradient-gold mb-2">404</p>

        <h1 className="text-2xl font-playfair font-semibold text-noir-100 mb-3">
          Página não encontrada
        </h1>
        <p className="text-noir-500 text-sm leading-relaxed mb-8">
          Esta página ainda não existe ou foi movida. Explora os nossos salões e descobre os melhores espaços de beleza em Angola.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button variant="gold" size="md" className="w-full sm:w-auto">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao início
            </Button>
          </Link>
          <Link href="/saloes">
            <Button variant="outline-gold" size="md" className="w-full sm:w-auto">
              <Search className="w-4 h-4 mr-2" />
              Explorar salões
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
