"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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

const LABELS: Record<string, string> = {
  "canastas-vino": "Canastas con Vino",
  "canastas-whisky": "Canastas con Whisky",
  "canastas-sin-licor": "Canastas sin Licor",
  "regalos-navidenos": "Regalos Navideños",
  "detalles-pequenos": "Detalles Pequeños",
  "canastas-frutales": "Canastas Frutales",
  flores: "Flores",
};

function prettifyLabel(slug: string) {
  // normaliza: quita %20 y -, capitaliza
  const cleaned = slug.replace(/%20/g, " ").replace(/-/g, " ");
  return cleaned.replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function CategoriaPage() {
  const params = useParams<{ categoria: string }>();
  const rawParam = Array.isArray(params?.categoria) ? params.categoria[0] : params?.categoria || "flores";

  // 👇 MUY IMPORTANTE: decodifica antes de usar
  const slugDecoded = decodeURIComponent(rawParam); // p.ej. "canastas con whisky"

  const label = LABELS[slugDecoded] || LABELS[rawParam] || prettifyLabel(slugDecoded);

  const { getProductosByCategoria } = useApi();
  const [items, setItems] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dominio = window.location.hostname.toLowerCase();
    const ac = new AbortController();
    (async () => {
      try {
        setLoading(true);
        // 👇 pasa el slug DECODIFICADO al API (luego ahí se encodea 1 sola vez)
        const data: Producto[] = await getProductosByCategoria(dominio, slugDecoded);
        if (!ac.signal.aborted) setItems(data);
      } catch (e) {
        if (!ac.signal.aborted) console.error(e);
      } finally {
        if (!ac.signal.aborted) setLoading(false);
      }
    })();
    return () => ac.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugDecoded]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-100 mb-4">{label}</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Descubre nuestra selección especial de {label.toLowerCase()}.
        </p>
      </div>

      {loading ? (
        <div className="text-gray-400">Cargando productos…</div>
      ) : items.length === 0 ? (
        <p className="text-gray-400">No hay productos aún en esta categoría.</p>
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

