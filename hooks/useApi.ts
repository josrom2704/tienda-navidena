// /hooks/useApi.ts
import { useCallback } from 'react';
import { BACKEND_CONFIG, getBackendUrl } from '@/lib/backend-config';

export const useApi = () => {
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
    const url = getBackendUrl(BACKEND_CONFIG.ENDPOINTS.FLORISTERIAS);
    const res = await fetch(url, { headers: authHeaders() });
    if (!res.ok) throw new Error("Error al obtener floristerías");
    return res.json();
  }, [authHeaders]);

  // ✅ Categorías por dominio - USANDO API REAL DEL BACKEND
  const getCategoriasByDominio = useCallback(async (dominio: string) => {
    const url = `${getBackendUrl(BACKEND_CONFIG.ENDPOINTS.CATEGORIAS)}?dominio=${encodeURIComponent(dominio)}`;
    console.log("[GET categorías] URL:", url);
    console.log("[GET categorías] Dominio:", dominio);
    
    const res = await fetch(url, { headers: authHeaders() });
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      console.error("[GET categorías] status:", res.status, res.statusText, "body:", txt);
      throw new Error(`Error al obtener categorías (${res.status}): ${txt}`);
    }
    return res.json() as Promise<string[]>;
  }, [authHeaders]);

  // ✅ Productos por dominio + categoría - USANDO API REAL DEL BACKEND
  const getProductosByCategoria = useCallback(async (dominio: string, categoria: string) => {
    // ✅ CAMBIO: Usar el parámetro 'url' en lugar de 'categoria' para el backend
    const url = `${getBackendUrl(BACKEND_CONFIG.ENDPOINTS.PRODUCTOS)}?url=${encodeURIComponent(dominio)}&categoria=${encodeURIComponent(categoria)}`;
    console.log("[GET productos por categoría] URL:", url);
    const res = await fetch(url, { headers: authHeaders() });
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      console.error("[GET productos] status:", res.status, res.statusText, "body:", txt);
      throw new Error(`Error al obtener productos (${res.status})`);
    }
    return res.json();
  }, [authHeaders]);

  // ✅ Productos por dominio (catálogo completo) - USANDO API REAL DEL BACKEND
  const getProductosAll = useCallback(async (dominio: string) => {
    // ✅ CAMBIO: Usar el parámetro 'url' para el backend
    const url = `${getBackendUrl(BACKEND_CONFIG.ENDPOINTS.PRODUCTOS)}?url=${encodeURIComponent(dominio)}`;
    console.log("[GET todos los productos] URL:", url);
    const res = await fetch(url, { headers: authHeaders() });
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      console.error("[GET todos los productos] status:", res.status, res.statusText, "body:", txt);
      throw new Error(`Error al obtener productos (${res.status})`);
    }
    return res.json();
  }, [authHeaders]);

  return {
    getFloristerias,
    getCategoriasByCategoria: getCategoriasByDominio, // Alias para mantener compatibilidad
    getCategoriasByDominio,
    getProductosByCategoria,
    getProductosAll,
  };
};
