import Link from "next/link";
import { Gift, Star, Truck, Clock, Award } from "lucide-react";

export function HeroBanner() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Título principal */}
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-black mb-6">
            Regala momentos inolvidables esta Navidad
          </h1>
          
          {/* Descripción */}
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Descubre nuestra exclusiva colección de canastas navideñas de lujo, 
            arreglos florales únicos y regalos premium que transformarán esta 
            temporada en algo verdaderamente extraordinario.
          </p>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/catalogo"
              className="inline-flex items-center justify-center px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
            >
              <Gift className="w-5 h-5 mr-2" />
              Explorar Colección
            </Link>
            <Link 
              href="/catalogo/canastas-navidenas"
              className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-yellow-200 text-black font-medium rounded-lg hover:bg-yellow-50 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
            >
              <Star className="w-5 h-5 mr-2" />
              Canastas Navideñas
            </Link>
          </div>

          {/* Características destacadas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-yellow-600">500+</span>
              </div>
              <span className="text-black font-medium">Productos Exclusivos</span>
            </div>
            
            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <span className="text-black font-medium">24h Entrega Premium</span>
            </div>
            
            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
              <span className="text-black font-medium">☆ 5.0 Calificación</span>
            </div>
          </div>
        </div>

        {/* Imagen destacada */}
        <div className="mt-16 text-center">
          <div className="bg-gray-100 border-2 border-dashed border-yellow-200 rounded-2xl p-12 max-w-2xl mx-auto">
            <div className="text-center">
              <Gift className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-serif font-bold text-black mb-2">
                Imagen de Canasta Premium
              </h3>
              <p className="text-gray-600">
                Lugar para imagen destacada
              </p>
            </div>
          </div>
        </div>

        {/* Iconos decorativos */}
        <div className="flex justify-center space-x-6 mt-8">
          <div className="w-8 h-8 text-green-500">🎄</div>
          <div className="w-8 h-8 text-yellow-500">⭐</div>
          <div className="w-8 h-8 text-red-500">🎁</div>
        </div>
      </div>
    </section>
  );
}
