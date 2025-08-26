import Link from "next/link"
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin, Crown } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-elegant-black border-t border-gold-400/30">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-500 rounded-full flex items-center justify-center elegant-glow">
                <Crown className="w-6 h-6 text-elegant-white" />
              </div>
              <div>
                <h3 className="text-2xl title-elegant text-gold-300">Canastas Navideñas</h3>
                <p className="text-sm text-elegant-light font-medium tracking-wide">Regalos Navideños</p>
              </div>
            </div>
            <p className="text-elegant-light font-light leading-relaxed">
              Especialistas en canastas navideñas y arreglos florales únicos. Creamos experiencias inolvidables
              para momentos especiales.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-elegant-dark border border-gold-400/30 rounded-full flex items-center justify-center text-gold-300 hover:bg-gold-400 hover:text-elegant-black transition-all duration-300 hover:elegant-glow"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-elegant-dark border border-gold-400/30 rounded-full flex items-center justify-center text-gold-300 hover:bg-gold-400 hover:text-elegant-black transition-all duration-300 hover:elegant-glow"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-elegant-dark border border-gold-400/30 rounded-full flex items-center justify-center text-gold-300 hover:bg-gold-400 hover:text-elegant-black transition-all duration-300 hover:elegant-glow"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg title-elegant text-gold-300">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-elegant-light hover:text-elegant-white transition-colors duration-300 font-medium elegant-underline"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo"
                  className="text-elegant-light hover:text-elegant-white transition-colors duration-300 font-medium elegant-underline"
                >
                  Catálogo
                </Link>
              </li>
              <li>
                <Link
                  href="/quienes-somos"
                  className="text-elegant-light hover:text-elegant-white transition-colors duration-300 font-medium elegant-underline"
                >
                  Quiénes Somos
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-elegant-light hover:text-elegant-white transition-colors duration-300 font-medium elegant-underline"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="/carrito"
                  className="text-elegant-light hover:text-elegant-white transition-colors duration-300 font-medium elegant-underline"
                >
                  Carrito
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-6">
            <h4 className="text-lg title-elegant text-gold-300">Colecciones</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/catalogo/canastas-vino"
                  className="text-elegant-light hover:text-elegant-white transition-colors duration-300 font-medium elegant-underline"
                >
                  Canastas con Vino
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo/canastas-whisky"
                  className="text-elegant-light hover:text-elegant-white transition-colors duration-300 font-medium elegant-underline"
                >
                  Canastas con Whisky
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo/canastas-sin-licor"
                  className="text-elegant-light hover:text-elegant-white transition-colors duration-300 font-medium elegant-underline"
                >
                  Canastas sin Licor
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo/regalos-navidenos"
                  className="text-elegant-light hover:text-elegant-white transition-colors duration-300 font-medium elegant-underline"
                >
                  Regalos Navideños
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo/flores"
                  className="text-elegant-light hover:text-elegant-white transition-colors duration-300 font-medium elegant-underline"
                >
                  Flores
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg title-elegant text-gold-300">Información de Contacto</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-gold-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-elegant-light font-medium">Teléfono</p>
                  <p className="text-elegant-light">+503 7014-3259</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-gold-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-elegant-light font-medium">Email</p>
                  <p className="text-elegant-light">hola@arconesgourmet.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gold-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-elegant-light font-medium">Ubicación</p>
                  <p className="text-elegant-light">San Salvador, El Salvador</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-16 pt-8 border-t border-gold-400/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-elegant-light text-sm">
                © 2025 Canastas Navideñas. Todos los derechos reservados.
              </p>
            </div>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/politica-privacidad"
                className="text-elegant-light hover:text-elegant-white transition-colors duration-300"
              >
                Política de Privacidad
              </Link>
              <Link
                href="/terminos-servicio"
                className="text-elegant-light hover:text-elegant-white transition-colors duration-300"
              >
                Términos de Servicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
