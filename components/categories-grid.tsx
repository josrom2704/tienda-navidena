// /components/categories-grid.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useApi } from "@/hooks/useApi";
import { useDominio } from "@/hooks/useDominio";

export function CategoriesGrid() {
  const { getCategoriasByDominio } = useApi();
  const dominio = useDominio();
  const [categorias, setCategorias] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState<any>(null);

  useEffect(() => {
    if (!dominio) {
      console.log("⏳ Esperando dominio...");
      return;
    }

    (async () => {
      try {
        console.log("🔍 [CATEGORÍAS] Iniciando carga para dominio:", dominio);
        console.log("🔍 [CATEGORÍAS] URL del backend:", `https://flores-backend-px2c.onrender.com/api/categorias?dominio=${dominio}`);
        
        const data = await getCategoriasByDominio(dominio);
        console.log("✅ [CATEGORÍAS] Respuesta del backend:", data);
        console.log("📊 [CATEGORÍAS] Tipo de datos:", typeof data);
        console.log("📊 [CATEGORÍAS] Longitud:", Array.isArray(data) ? data.length : 'No es array');
        console.log("📊 [CATEGORÍAS] Contenido completo:", JSON.stringify(data, null, 2));
        
        setDebugInfo({
          dominio,
          categorias: data,
          tipo: typeof data,
          esArray: Array.isArray(data),
          longitud: Array.isArray(data) ? data.length : 'N/A',
          timestamp: new Date().toISOString()
        });
        
        if (data && Array.isArray(data) && data.length > 0) {
          // ✅ Usar SOLO las categorías del backend
          console.log("✅ [CATEGORÍAS] Categorías cargadas exitosamente:", data);
          setCategorias(data);
        } else {
          console.log("⚠️ [CATEGORÍAS] No se encontraron categorías en el backend");
          console.log("⚠️ [CATEGORÍAS] Data recibida:", data);
          setCategorias([]); // ✅ Array vacío, NO fallback hardcodeado
        }
      } catch (error) {
        console.error("❌ [CATEGORÍAS] Error cargando categorías:", error);
        console.error("❌ [CATEGORÍAS] Error completo:", error);
        setCategorias([]); // ✅ Array vacío en caso de error, NO fallback hardcodeado
      } finally {
        setLoading(false);
      }
    })();
  }, [getCategoriasByDominio, dominio]);

  if (loading || !dominio) {
    return (
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4 text-gray-300">
          {!dominio ? "Cargando dominio..." : "Cargando categorías…"}
        </div>
      </section>
    );
  }

  // ✅ Si no hay categorías, mostrar mensaje apropiado
  if (categorias.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <div className="text-gray-400 text-6xl mb-4">📋</div>
          <h2 className="text-2xl font-bold text-white mb-4">No hay categorías disponibles</h2>
          <p className="text-gray-400 mb-4">
            Las categorías aparecerán aquí una vez que se agreguen productos desde el panel de administración.
          </p>
          
          {/* Debug Info - Solo en desarrollo */}
          {process.env.NODE_ENV === 'development' && debugInfo && (
            <div className="mt-8 p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-red-200 text-sm max-w-4xl mx-auto">
              <h3 className="font-bold mb-2">🔍 Debug Info - CATEGORÍAS VACÍAS:</h3>
              <pre className="text-xs overflow-auto">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-white mb-6">
            Explora Nuestras <span className="text-gold-400">Colecciones Exclusivas</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
            Cada categoría ha sido cuidadosamente curada para ofrecerte la más alta calidad y elegancia.
          </p>
        </div>

        {/* Debug Info - Solo en desarrollo */}
        {process.env.NODE_ENV === 'development' && debugInfo && (
          <div className="mb-8 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg text-blue-200 text-sm">
            <h3 className="font-bold mb-2">🔍 Debug Info - CATEGORÍAS CARGADAS:</h3>
            <pre className="text-xs overflow-auto">
              {JSON.stringify(debugInfo, null, 2)}
            </pre>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categorias.map((categoria, index) => {
            // ✅ Generar slug para la URL (normalizar espacios y caracteres especiales)
            const urlSlug = categoria.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            const href = `/catalogo/${urlSlug}`;
            
            // ✅ Icono dinámico basado en el nombre de la categoría
            const getIcon = (cat: string) => {
              const lowerCat = cat.toLowerCase();
              if (lowerCat.includes('vino') || lowerCat.includes('whisky') || lowerCat.includes('licor')) return '🍷';
              if (lowerCat.includes('flor') || lowerCat.includes('rama')) return '🌹';
              if (lowerCat.includes('regalo') || lowerCat.includes('navideño')) return '🎁';
              if (lowerCat.includes('fruta')) return '🍎';
              if (lowerCat.includes('detalle')) return '✨';
              return '⭐';
            };
            
            return (
              <Link key={href} href={href}>
                <Card
                  className="group bg-black border-2 border-gold-500/20 hover:border-gold-400 transition-all duration-500 overflow-hidden hover:luxury-glow cursor-pointer scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={"/placeholder.svg?height=300&width=400"}
                      alt={categoria}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute top-4 right-4 w-12 h-12 bg-gold-400/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">{getIcon(categoria)}</span>
                    </div>
                  </div>
                  <CardContent className="p-6 bg-black">
                    <h3 className="text-xl font-playfair font-semibold text-white mb-3 group-hover:text-gold-400 transition-colors duration-300">
                      {categoria}
                    </h3>
                    <p className="text-gray-400 text-sm font-light leading-relaxed">
                      Descubre nuestra selección especial de {categoria.toLowerCase()}
                    </p>
                    <div className="mt-4 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
