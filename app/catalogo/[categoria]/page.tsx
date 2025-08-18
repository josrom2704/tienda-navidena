"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { useApi } from "@/hooks/useApi";
import { useDominio } from "@/hooks/useDominio";
import { objectIdToNumber } from "@/lib/id";

type Producto = {
  _id: string;
  nombre: string;
  descripcion?: string;
  precio: number | string;
  imagen?: string;
  categoria: string;
  stock?: number;
};

function prettifyLabel(slug: string) {
  // ✅ CORRECCIÓN: Convertir slug a categoría real de la BD
  const slugToCategoria: { [key: string]: string } = {
    'canastas-con-vino': 'Canastas con vino',
    'canastas-con-whisky': 'Canastas con whisky',
    'canastas-sin-licor': 'Canastas sin licor',
    'regalos-navidenos': 'Regalos navideños',
    'detalles-pequenos': 'Detalles pequeños',
    'canastas-frutales': 'Canastas frutales',
    'flores': 'Flores',
    'ramos': 'Ramos'
  };
  
  // ✅ Buscar en el mapeo primero
  if (slugToCategoria[slug]) {
    console.log("🔍 [prettifyLabel] Slug mapeado:", slug, "→ Categoría:", slugToCategoria[slug]);
    return slugToCategoria[slug];
  }
  
  // ✅ Fallback: normalizar como antes
  const cleaned = slug.replace(/%20/g, " ").replace(/-/g, " ");
  const result = cleaned.replace(/\b\w/g, (c) => c.toUpperCase());
  console.log("🔍 [prettifyLabel] Slug no mapeado, usando fallback:", slug, "→ Resultado:", result);
  return result;
}

export default function CategoriaPage() {
  const params = useParams<{ categoria: string }>();
  const rawParam = Array.isArray(params?.categoria) ? params.categoria[0] : params?.categoria || "flores";

  // 👇 MUY IMPORTANTE: decodifica antes de usar
  const slugDecoded = decodeURIComponent(rawParam); // p.ej. "canastas con whisky"

  // ✅ Usar SOLO el nombre de la categoría del backend, NO hardcodeado
  const label = prettifyLabel(slugDecoded);

  const { getProductosByCategoria } = useApi();
  const dominio = useDominio();
  const [items, setItems] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!dominio) {
      console.log("⏳ Esperando dominio...");
      return;
    }
    
    const ac = new AbortController();
    
    (async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("🔍 Cargando productos para categoría:", slugDecoded);
        console.log("🔍 Dominio:", dominio);
        
        // 👇 pasa el slug DECODIFICADO al API (luego ahí se encodea 1 sola vez)
        const data: Producto[] = await getProductosByCategoria(dominio, slugDecoded);
        console.log("✅ Productos cargados del backend para categoría:", data);
        
        if (!ac.signal.aborted) {
          setItems(data);
        }
      } catch (e) {
        if (!ac.signal.aborted) {
          console.error("❌ Error cargando productos por categoría:", e);
          setError("Error al cargar los productos de esta categoría. Por favor, intenta de nuevo.");
        }
      } finally {
        if (!ac.signal.aborted) {
          setLoading(false);
        }
      }
    })();
    
    return () => ac.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugDecoded, dominio]); // 👈 Agregado dominio como dependencia

  if (!dominio) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🌐</div>
          <p className="text-gray-500 text-xl mb-2">Cargando configuración...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-100 mb-4">{label}</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Descubre nuestra selección especial de {label.toLowerCase()}.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500"></div>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🌸</div>
          <p className="text-gray-500 text-xl mb-2">No hay productos en esta categoría</p>
          <p className="text-gray-500">Los productos aparecerán aquí una vez que sean agregados desde el panel de administración.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((p) => (
            <ProductCard
              key={p._id}
              product={{
                id: objectIdToNumber(p._id),
                name: p.nombre,
                description: p.descripcion ?? "",
                price: Number(p.precio),
                image: p.imagen || "/placeholder.svg?height=300&width=300",
                category: label,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

