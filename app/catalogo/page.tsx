"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { useApi } from "@/hooks/useApi";
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

export default function CatalogoPage() {
  const { getProductosAll } = useApi();
  const [items, setItems] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const dominio = window.location.hostname.toLowerCase();
    const ac = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("🔍 Cargando productos para dominio:", dominio);
        
        const data: Producto[] = await getProductosAll(dominio);
        console.log("✅ Productos cargados del backend:", data);
        
        if (!ac.signal.aborted) {
          setItems(data);
        }
      } catch (e) {
        if (!ac.signal.aborted) {
          console.error("❌ Error cargando productos:", e);
          setError("Error al cargar los productos. Por favor, intenta de nuevo.");
        }
      } finally {
        if (!ac.signal.aborted) {
          setLoading(false);
        }
      }
    })();

    return () => ac.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 👈 sin funciones en deps

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Catálogo Completo</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Descubre toda nuestra colección de regalos navideños premium
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
          <p className="text-gray-500 text-xl mb-2">No hay productos disponibles</p>
          <p className="text-gray-400">Los productos aparecerán aquí una vez que sean agregados desde el panel de administración.</p>
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
                category: p.categoria,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
