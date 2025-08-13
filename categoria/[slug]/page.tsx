"use client";
import { useEffect, useState } from "react";

export default function CategoriaPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
    const dominio = window.location.hostname; // multi-tenant por dominio

    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API}/flores?dominio=${encodeURIComponent(dominio)}&categoria=${encodeURIComponent(slug)}`);
        const data = await res.json();
        setItems(data);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  // Render de tus cards con items...
  return <div>{loading ? "Cargando..." : JSON.stringify(items)}</div>;
}
