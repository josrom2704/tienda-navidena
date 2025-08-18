// /components/categories-grid.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useApi } from "@/hooks/useApi";
import { useDominio } from "@/hooks/useDominio";

// ✅ META dinámico basado en categorías del backend
const META: Record<string, { label: string; description: string; icon: string }> = {
  "canastas-vino": { label: "Canastas con Vino", description: "Selección premium de vinos y acompañamientos de lujo", icon: "🍷" },
  "canastas-whisky": { label: "Canastas con Whisky", description: "Whiskys selectos y complementos gourmet exclusivos", icon: "🥃" },
  "canastas-sin-licor": { label: "Canastas sin Licor", description: "Deliciosas opciones premium para toda la familia", icon: "🍫" },
  "regalos-navidenos": { label: "Regalos Navideños", description: "Artículos especiales de lujo para la temporada", icon: "🎁" },
  "detalles-pequenos": { label: "Detalles Pequeños", description: "Pequeños gestos con gran elegancia y significado", icon: "✨" },
  "canastas-frutales": { label: "Canastas Frutales", description: "Frutas frescas premium y frutos secos selectos", icon: "🍎" },
  "flores": { label: "Flores", description: "Arreglos florales únicos y elegantes de alta calidad", icon: "🌹" },
  // ✅ Categorías adicionales que pueden venir del backend
  "canastas con vino": { label: "Canastas con Vino", description: "Selección premium de vinos y acompañamientos de lujo", icon: "🍷" },
  "canastas con whisky": { label: "Canastas con Whisky", description: "Whiskys selectos y complementos gourmet exclusivos", icon: "🥃" },
  "canastas sin licor": { label: "Canastas sin Licor", description: "Deliciosas opciones premium para toda la familia", icon: "🍫" },
  "regalos navideños": { label: "Regalos Navideños", description: "Artículos especiales de lujo para la temporada", icon: "🎁" },
  "detalles pequeños": { label: "Detalles Pequeños", description: "Pequeños gestos con gran elegancia y significado", icon: "✨" },
  "canastas frutales": { label: "Canastas Frutales", description: "Frutas frescas premium y frutos secos selectos", icon: "🍎" },
  // ✅ Categorías adicionales del backend
  "ramos": { label: "Ramos", description: "Hermosos ramos de flores frescas", icon: "🌹" },
};

export function CategoriesGrid() {
  const { getCategoriasByDominio } = useApi();
  const dominio = useDominio();
  const [slugs, setSlugs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState<any>(null);

  useEffect(() => {
    if (!dominio) {
      console.log("⏳ Esperando dominio...");
      return;
    }

    (async () => {
      try {
        console.log("🔍 Cargando categorías para dominio:", dominio);
        const data = await getCategoriasByDominio(dominio);
        console.log("✅ Categorías cargadas del backend:", data);
        console.log("📊 Tipo de datos:", typeof data);
        console.log("📊 Longitud:", Array.isArray(data) ? data.length : 'No es array');
        console.log("📊 Contenido completo:", JSON.stringify(data, null, 2));
        
        setDebugInfo({
          dominio,
          categorias: data,
          tipo: typeof data,
          esArray: Array.isArray(data),
          longitud: Array.isArray(data) ? data.length : 'N/A'
        });
        
        if (data && Array.isArray(data) && data.length > 0) {
          setSlugs(data);
        } else {
          console.log("⚠️ No se encontraron categorías, usando fallback");
          // ✅ FALLBACK: Solo categorías básicas si no hay datos del backend
          setSlugs(["flores", "canastas con vino", "canastas con whisky", "canastas sin licor", "regalos navideños"]);
        }
      } catch (error) {
        console.error("❌ Error cargando categorías:", error);
        console.log("⚠️ Usando categorías de fallback por error");
        // ✅ FALLBACK: Categorías básicas en caso de error
        setSlugs(["flores", "canastas con vino", "canastas con whisky", "canastas sin licor", "regalos navideños"]);
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
            <h3 className="font-bold mb-2">🔍 Debug Info:</h3>
            <pre className="text-xs overflow-auto">
              {JSON.stringify(debugInfo, null, 2)}
            </pre>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {slugs.map((slug, index) => {
            // ✅ Lógica mejorada para obtener metadata de categoría
            const meta = META[slug] || META[slug.toLowerCase()] || { 
              label: slug.replaceAll("-", " ").replace(/\b\w/g, c => c.toUpperCase()), 
              description: "Colección especial de productos premium", 
              icon: "⭐" 
            };
            
            // ✅ Generar slug para la URL (normalizar espacios y caracteres especiales)
            const urlSlug = slug.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            const href = `/catalogo/${urlSlug}`;
            
            return (
              <Link key={href} href={href}>
                <Card
                  className="group bg-black border-2 border-gold-500/20 hover:border-gold-400 transition-all duration-500 overflow-hidden hover:luxury-glow cursor-pointer scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={"/placeholder.svg?height=300&width=400"}
                      alt={meta.label}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute top-4 right-4 w-12 h-12 bg-gold-400/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">{meta.icon}</span>
                    </div>
                  </div>
                  <CardContent className="p-6 bg-black">
                    <h3 className="text-xl font-playfair font-semibold text-white mb-3 group-hover:text-gold-400 transition-colors duration-300">
                      {meta.label}
                    </h3>
                    <p className="text-gray-400 text-sm font-light leading-relaxed">{meta.description}</p>
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
