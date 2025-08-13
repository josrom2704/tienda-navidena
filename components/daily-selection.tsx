"use client";

import { ProductCard } from "@/components/product-card";
import { useDailyRecommendations } from "@/hooks/use-daily-recommendations";

export function DailySelection() {
  const { dailyProducts, isLoading, error, refreshRecommendations, lastUpdated } = useDailyRecommendations();

  // Función para recargar productos (útil para testing)
  const handleRefresh = () => {
    refreshRecommendations();
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in-up">
            <div className="inline-flex items-center gap-3 bg-gold-400/10 border border-gold-400/20 text-gold-400 px-6 py-3 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 bg-gold-400 rounded-full animate-pulse"></span>
              Selección Exclusiva del Día
            </div>
            <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-white mb-6">
              Productos <span className="text-gold-400">Destacados</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
              Cargando recomendaciones personalizadas...
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-800 rounded-lg h-96"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in-up">
          <div className="inline-flex items-center gap-3 bg-gold-400/10 border border-gold-400/20 text-gold-400 px-6 py-3 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 bg-gold-400 rounded-full animate-pulse"></span>
            Selección Exclusiva del Día
          </div>
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-white mb-6">
            Productos <span className="text-gold-400">Recomendados</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
            Nuestro algoritmo inteligente selecciona 4 productos únicos cada día basándose en tu base de datos
          </p>
          
          {lastUpdated && (
            <div className="mt-4 p-3 bg-gold-400/10 border border-gold-400/20 rounded-lg">
              <p className="text-gold-400 text-sm">
                🕐 Última actualización: {lastUpdated.toLocaleString('es-ES')}
              </p>
            </div>
          )}
          
          {error && (
            <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {dailyProducts.map((product, index) => (
            <div key={product.id} className="scale-in" style={{ animationDelay: `${index * 150}ms` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="text-center mt-16 fade-in-up">
          <p className="text-gray-400 mb-6 font-light">¿Buscas algo más específico?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/catalogo"
              className="inline-flex items-center text-gold-400 hover:text-gold-300 font-medium text-lg elegant-underline transition-colors duration-300"
            >
              Explorar Catálogo Completo →
            </a>
            
            {/* Botón de refresh para testing */}
            <button
              onClick={handleRefresh}
              className="inline-flex items-center text-gray-400 hover:text-white font-medium text-sm transition-colors duration-300"
            >
              🔄 Recargar Recomendaciones
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
