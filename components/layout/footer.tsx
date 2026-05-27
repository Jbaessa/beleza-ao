import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Heart, AtSign, Link2 } from "lucide-react";

const footerLinks = {
  plataforma: [
    { href: "/saloes", label: "Encontrar Salões" },
    { href: "/categorias", label: "Categorias" },
    { href: "/como-funciona", label: "Como Funciona" },
    { href: "/precos", label: "Preços" },
  ],
  parceiros: [
    { href: "/parceiro/registar", label: "Listar o meu Negócio" },
    { href: "/parceiro/planos", label: "Planos e Preços" },
    { href: "/parceiro/recursos", label: "Recursos" },
    { href: "/parceiro/suporte", label: "Suporte" },
  ],
  empresa: [
    { href: "/sobre", label: "Sobre Nós" },
    { href: "/blog", label: "Blog" },
    { href: "/carreiras", label: "Carreiras" },
    { href: "/contacto", label: "Contacto" },
  ],
  legal: [
    { href: "/privacidade", label: "Privacidade" },
    { href: "/termos", label: "Termos de Uso" },
    { href: "/cookies", label: "Política de Cookies" },
  ],
};

const socialLinks = [
  { href: "#", icon: AtSign, label: "Instagram" },
  { href: "#", icon: Link2, label: "Facebook" },
  { href: "#", icon: MessageCircle, label: "WhatsApp" },
];

export function Footer() {
  return (
    <footer className="bg-noir-975 border-t border-noir-900">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image src="/LogoB.png" alt="Beleza.AO ícone" width={36} height={36} className="object-contain" />
              <Image src="/LogoB2.png" alt="Beleza.AO" width={110} height={36} className="object-contain" />
            </Link>
            <p className="text-sm text-noir-500 mb-6 max-w-xs leading-relaxed">
              O marketplace premium de beleza e estética feminina em Angola. Descubra, reserve e brilhe.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-noir-900 border border-noir-800 flex items-center justify-center text-noir-400 hover:text-gold-400 hover:border-gold-500/40 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gold-500 mb-4">
              Plataforma
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.plataforma.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-noir-400 hover:text-gold-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gold-500 mb-4">
              Parceiros
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.parceiros.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-noir-400 hover:text-gold-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gold-500 mb-4">
              Empresa
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.empresa.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-noir-400 hover:text-gold-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gold-500 mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.legal.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-noir-400 hover:text-gold-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-noir-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-noir-600">
            © 2025 Beleza.AO. Todos os direitos reservados.
          </p>
          <p className="text-xs text-noir-600 flex items-center gap-1">
            Feito com <Heart className="w-3 h-3 text-rose-600 fill-rose-600" /> em Angola
          </p>
        </div>
      </div>
    </footer>
  );
}
