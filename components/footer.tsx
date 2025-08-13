import Link from "next/link"
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin, Crown } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black border-t border-gold-400/30">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-gold-300 to-gold-400 rounded-full flex items-center justify-center luxury-glow">
                <Crown className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className="text-2xl font-playfair font-bold text-gold-300">Canastas Navideñas</h3>
                <p className="text-sm text-light font-medium tracking-wide">Regalos Navideños</p>
              </div>
            </div>
            <p className="text-medium font-light leading-relaxed">
              Especialistas en canastas navideñas y arreglos florales únicos. Creamos experiencias inolvidables
              para momentos especiales.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-900 border border-gold-400/30 rounded-full flex items-center justify-center text-gold-300 hover:bg-gold-400 hover:text-black transition-all duration-300 hover:luxury-glow"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-900 border border-gold-400/30 rounded-full flex items-center justify-center text-gold-300 hover:bg-gold-400 hover:text-black transition-all duration-300 hover:luxury-glow"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-900 border border-gold-400/30 rounded-full flex items-center justify-center text-gold-300 hover:bg-gold-400 hover:text-black transition-all duration-300 hover:luxury-glow"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-playfair font-semibold text-gold-300">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-medium hover:text-light transition-colors duration-300 font-medium elegant-underline"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo"
                  className="text-medium hover:text-light transition-colors duration-300 font-medium elegant-underline"
                >
                  Catálogo
                </Link>
              </li>
              <li>
                <Link
                  href="/quienes-somos"
                  className="text-medium hover:text-light transition-colors duration-300 font-medium elegant-underline"
                >
                  Quiénes Somos
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-medium hover:text-light transition-colors duration-300 font-medium elegant-underline"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="/carrito"
                  className="text-medium hover:text-light transition-colors duration-300 font-medium elegant-underline"
                >
                  Carrito
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-6">
            <h4 className="text-lg font-playfair font-semibold text-gold-300">Colecciones</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/catalogo/canastas-vino"
                  className="text-medium hover:text-light transition-colors duration-300 font-medium elegant-underline"
                >
                  Canastas con Vino
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo/canastas-whisky"
                  className="text-medium hover:text-light transition-colors duration-300 font-medium elegant-underline"
                >
                  Canastas con Whisky
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo/flores"
                  className="text-medium hover:text-light transition-colors duration-300 font-medium elegant-underline"
                >
                  Flores 
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo/regalos-navidenos"
                  className="text-medium hover:text-light transition-colors duration-300 font-medium elegant-underline"
                >
                  Regalos Navideños
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-playfair font-semibold text-gold-300">Contacto</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-gold-300 mt-1 flex-shrink-0" />
                <div>
                  <span className="text-light font-medium">+503 7014-3259</span>
                  <p className="text-xs text-medium">Lun - Vie: 9:00 AM - 7:00 PM</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-gold-300 mt-1 flex-shrink-0" />
                <div>
                  <span className="text-light font-medium">contacto@tiendaderegaloselsalvador.com</span>
                  <p className="text-xs text-medium">Respuesta en 2 horas</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gold-300 mt-1 flex-shrink-0" />
                <div>
                  <span className="text-light font-medium">San Salvador, El Salvador</span>
                  <p className="text-xs text-medium">Showroom con cita previa</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gold-400/30 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-medium text-sm font-medium">© 2025 Canastas Navideñas. Todos los derechos reservados.</p>
            <div className="flex space-x-8 mt-4 md:mt-0">
              <Link
                href="/privacidad"
                className="text-medium hover:text-gold-300 text-sm font-medium transition-colors duration-300 elegant-underline"
              >
                Política de Privacidad
              </Link>
              <Link
                href="/terminos"
                className="text-medium hover:text-gold-300 text-sm font-medium transition-colors duration-300 elegant-underline"
              >
                Términos y Condiciones
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
