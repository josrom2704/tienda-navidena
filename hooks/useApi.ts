// /hooks/useApi.ts
import { useCallback } from 'react';

export const useApi = () => {
  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

  const DEV_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzU0NjEyNjUyLCJleHAiOjE3NTQ2MjcwNTJ9.WzTpRBuo1iGFop5KnvH-VJerVVT5wI_WlWuWGmQ1HrM";

  const getToken = useCallback(() => {
    if (typeof window === "undefined") return DEV_TOKEN;
    return localStorage.getItem("token") || DEV_TOKEN;
  }, []);

  const authHeaders = useCallback(() => ({
    Authorization: `Bearer ${getToken()}`,
  }), [getToken]);

  // Floristerías (si las usas en Home)
  const getFloristerias = useCallback(async () => {
    const res = await fetch(`${API}/floristerias`, { headers: authHeaders() });
    if (!res.ok) throw new Error("Error al obtener floristerías");
    return res.json();
  }, [authHeaders]);

  // Categorías por dominio
  const getCategoriasByDominio = useCallback(async (dominio: string) => {
    const url = `${API}/categorias?dominio=${encodeURIComponent(dominio)}`;
    console.log("[GET categorías] URL:", url);
    console.log("[GET categorías] API base:", API);
    console.log("[GET categorías] Dominio:", dominio);
    
    const res = await fetch(url, { headers: authHeaders() });
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      console.error("[GET categorías] status:", res.status, res.statusText, "body:", txt);
      throw new Error(`Error al obtener categorías (${res.status}): ${txt}`);
    }
    return res.json() as Promise<string[]>;
  }, [authHeaders]);

  // ✅ Productos por dominio + categoría
  const getProductosByCategoria = useCallback(async (dominio: string, categoria: string) => {
    const url = `${API}/flores?dominio=${encodeURIComponent(dominio)}&categoria=${encodeURIComponent(categoria)}`;
    console.log("[GET productos] URL:", url);
    const res = await fetch(url, { headers: authHeaders() });
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      console.error("[GET productos] status:", res.status, res.statusText, "body:", txt);
      throw new Error(`Error al obtener productos (${res.status})`);
    }
    return res.json();
  }, [authHeaders]);

  // ✅ Productos por dominio (catálogo completo)
  const getProductosAll = useCallback(async (dominio: string) => {
    const url = `${API}/flores?dominio=${encodeURIComponent(dominio)}`;
    const res = await fetch(url, { headers: authHeaders() });
    if (!res.ok) throw new Error("Error al obtener productos");
    return res.json();
  }, [authHeaders]);

  return {
    getFloristerias,
    getCategoriasByDominio,
    getProductosByCategoria,
    getProductosAll,
  };
};
