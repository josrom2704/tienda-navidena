import Link from "next/link";
import { Crown, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-yellow-200">
      {/* Footer principal */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Información de la empresa */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <Crown className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-black">Canastas Navideñas</h3>
                <p className="text-sm text-gray-600 font-medium">Regalos Navideños</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Especialistas en canastas navideñas y arreglos florales únicos. Creamos experiencias inolvidables para momentos especiales.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-yellow-100 transition-colors duration-300">
                <Facebook className="w-4 h-4 text-gray-600" />
              </div>
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-yellow-100 transition-colors duration-300">
                <Instagram className="w-4 h-4 text-gray-600" />
              </div>
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-yellow-100 transition-colors duration-300">
                <Twitter className="w-4 h-4 text-gray-600" />
              </div>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div className="space-y-4">
            <h4 className="text-lg font-serif font-bold text-black">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-yellow-600 transition-colors duration-300">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/catalogo" className="text-gray-600 hover:text-yellow-600 transition-colors duration-300">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="/quienes-somos" className="text-gray-600 hover:text-yellow-600 transition-colors duration-300">
                  Quiénes Somos
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-gray-600 hover:text-yellow-600 transition-colors duration-300">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/carrito" className="text-gray-600 hover:text-yellow-600 transition-colors duration-300">
                  Carrito
                </Link>
              </li>
            </ul>
          </div>

          {/* Colecciones */}
          <div className="space-y-4">
            <h4 className="text-lg font-serif font-bold text-black">Colecciones</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/catalogo/canastas-vino" className="text-gray-600 hover:text-yellow-600 transition-colors duration-300">
                  Canastas con Vino
                </Link>
              </li>
              <li>
                <Link href="/catalogo/canastas-whisky" className="text-gray-600 hover:text-yellow-600 transition-colors duration-300">
                  Canastas con Whisky
                </Link>
              </li>
              <li>
                <Link href="/catalogo/canastas-sin-licor" className="text-gray-600 hover:text-yellow-600 transition-colors duration-300">
                  Canastas sin Licor
                </Link>
              </li>
              <li>
                <Link href="/catalogo/regalos-navidenos" className="text-gray-600 hover:text-yellow-600 transition-colors duration-300">
                  Regalos Navideños
                </Link>
              </li>
              <li>
                <Link href="/catalogo/flores" className="text-gray-600 hover:text-yellow-600 transition-colors duration-300">
                  Flores
                </Link>
              </li>
            </ul>
          </div>

          {/* Información de contacto */}
          <div className="space-y-4">
            <h4 className="text-lg font-serif font-bold text-black">Información de Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-yellow-600" />
                <span className="text-gray-600 text-sm">+503 7014-3259</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-yellow-600" />
                <span className="text-gray-600 text-sm">hola@arconesgourmet.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-yellow-600" />
                <span className="text-gray-600 text-sm">San Salvador, El Salvador</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Línea separadora */}
      <div className="border-t border-yellow-200"></div>

      {/* Footer inferior */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2025 Canastas Navideñas. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacidad" className="text-gray-500 hover:text-yellow-600 text-sm transition-colors duration-300">
              Política de Privacidad
            </Link>
            <Link href="/terminos" className="text-gray-500 hover:text-yellow-600 text-sm transition-colors duration-300">
              Términos de Servicio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
