"use client";

import { ProductCard } from "@/components/product-card";
import { useDailyRecommendations } from "@/hooks/use-daily-recommendations";
import { useEffect, useRef, useState } from "react";

export function DailySelection() {
  const { dailyProducts, isLoading, error, refreshRecommendations, lastUpdated } = useDailyRecommendations();
  const [isVisible, setIsVisible] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Función para recargar productos (útil para testing)
  const handleRefresh = () => {
    refreshRecommendations();
  };

  // Intersection Observer para detectar cuando la sección es visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Agregar highlight temporal cuando se hace scroll desde el hero
          const url = window.location.hash;
          if (url === '#seleccion-diaria') {
            setIsHighlighted(true);
            setTimeout(() => setIsHighlighted(false), 3000);
            // Limpiar el hash después de la animación
            setTimeout(() => {
              window.history.replaceState(null, '', window.location.pathname);
            }, 1000);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in-up">
            <div className="inline-flex items-center gap-3 bg-yellow-400/10 border border-yellow-400/20 text-yellow-500 px-6 py-3 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
              Selección Exclusiva del Día
            </div>
            <h2 className="text-4xl lg:text-5xl font-serif text-black mb-6">
              Productos <span className="text-yellow-500">Destacados</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
              Cargando recomendaciones personalizadas...
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-white rounded-lg h-96 border border-yellow-200 shadow-md"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef}
      id="seleccion-diaria" 
      className={`py-20 bg-gray-50 transition-all duration-500 ${
        isVisible ? 'section-fade-in' : 'opacity-0'
      } ${isHighlighted ? 'section-highlight' : ''}`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in-up">
          <div className="inline-flex items-center gap-3 bg-yellow-400/10 border border-yellow-400/20 text-yellow-500 px-6 py-3 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
            Selección Exclusiva del Día
          </div>
          <h2 className="text-4xl lg:text-5xl font-serif text-black mb-6">
            Productos <span className="text-yellow-500">Recomendados</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Nuestro algoritmo inteligente selecciona 4 productos únicos cada día basándose en tu base de datos
          </p>
          
          {lastUpdated && (
            <div className="mt-4 p-3 bg-yellow-400/10 border border-yellow-400/20 rounded-lg">
              <p className="text-yellow-500 text-sm">
                🕐 Última actualización: {lastUpdated.toLocaleString('es-ES')}
              </p>
            </div>
          )}
          
          {error && (
            <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
              <p className="text-red-500 text-sm">{error}</p>
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
          <p className="text-gray-600 mb-6 font-light">¿Buscas algo más específico?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/catalogo"
              className="inline-flex items-center text-yellow-500 hover:text-yellow-600 font-medium text-lg elegant-underline transition-colors duration-300"
            >
              Explorar Catálogo Completo →
            </a>
            
            {/* Botón de refresh para testing */}
            <button
              onClick={handleRefresh}
              className="inline-flex items-center text-gray-600 hover:text-black font-medium text-sm transition-colors duration-300"
            >
              🔄 Recargar Recomendaciones
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
