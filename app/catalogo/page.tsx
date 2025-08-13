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
};

export default function CatalogoPage() {
  const { getProductosAll } = useApi();
  const [items, setItems] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dominio = window.location.hostname.toLowerCase();
    const ac = new AbortController();

    (async () => {
      try {
        setLoading(true);
        const data: Producto[] = await getProductosAll(dominio);
        if (!ac.signal.aborted) setItems(data);
      } catch (e) {
        if (!ac.signal.aborted) console.error(e);
      } finally {
        if (!ac.signal.aborted) setLoading(false);
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
        <div className="text-gray-500">Cargando productos…</div>
      ) : items.length === 0 ? (
        <p className="text-gray-500">Aún no hay productos</p>
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
