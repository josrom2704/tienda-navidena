import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Star, Crown } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t-2 border-yellow-200 shadow-lg">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-black">
                  Canastas Navideñas
                </h3>
                <p className="text-sm text-yellow-600 font-medium">
                  REGALOS NAVIDEÑOS
                </p>
              </div>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              Creando momentos mágicos y memorables con nuestras exclusivas canastas navideñas. 
              Cada detalle está pensado para hacer de esta Navidad algo extraordinario.
            </p>
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                ))}
              </div>
              <span className="text-sm text-gray-600 ml-2">5.0 Calificación</span>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="font-serif font-bold text-black text-lg mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-yellow-600 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/catalogo" className="text-gray-600 hover:text-yellow-600 transition-colors">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="/quienes-somos" className="text-gray-600 hover:text-yellow-600 transition-colors">
                  Quiénes Somos
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-gray-600 hover:text-yellow-600 transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Información de contacto */}
          <div>
            <h4 className="font-serif font-bold text-black text-lg mb-4">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-yellow-500" />
                <span className="text-gray-600 text-sm">+57 300 123 4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-yellow-500" />
                <span className="text-gray-600 text-sm">info@canastasnavidenas.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-yellow-500" />
                <span className="text-gray-600 text-sm">Bogotá, Colombia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Redes sociales y copyright */}
        <div className="border-t border-yellow-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-4">
              <Link href="#" className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 hover:bg-yellow-500 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 hover:bg-yellow-500 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 hover:bg-yellow-500 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
            </div>
            <p className="text-gray-600 text-sm text-center md:text-right">
              © 2025 Canastas Navideñas. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
