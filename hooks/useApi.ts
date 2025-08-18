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

  // ✅ Obtener categorías por dominio
  const getCategoriasByDominio = useCallback(async (dominio: string): Promise<string[]> => {
    if (!dominio) {
      console.log("⚠️ [getCategoriasByDominio] Dominio vacío, usando fallback");
      dominio = "tiendanavidena.vercel.app";
    }

    try {
      console.log("🔍 [getCategoriasByDominio] Iniciando llamada para dominio:", dominio);
      
      // ✅ CAMBIO: Usar 'url' en lugar de 'dominio' para que funcione con el backend
      const url = `${getBackendUrl(BACKEND_CONFIG.ENDPOINTS.CATEGORIAS)}?url=${encodeURIComponent(dominio)}`;
      console.log("🔍 [getCategoriasByDominio] URL completa:", url);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("✅ [getCategoriasByDominio] Respuesta del backend:", data);
      console.log("📊 [getCategoriasByDominio] Tipo:", typeof data, "Longitud:", Array.isArray(data) ? data.length : 'No es array');
      
      return Array.isArray(data) ? data : [];
      
    } catch (error) {
      console.error("❌ [getCategoriasByDominio] Error:", error);
      return [];
    }
  }, []);

  // ✅ Productos por dominio + categoría - CORREGIDO PARA USAR PARÁMETROS CORRECTOS DEL BACKEND
  const getProductosByCategoria = useCallback(async (dominio: string, categoria: string) => {
    if (!dominio) {
      console.error("❌ [GET productos por categoría] Dominio vacío, usando fallback");
      dominio = 'tiendanavidena.vercel.app';
    }
    
    // ✅ CAMBIO: Según el backend, debe usar 'url' para el dominio y 'categoria' para la categoría
    const url = `${getBackendUrl(BACKEND_CONFIG.ENDPOINTS.PRODUCTOS)}?url=${encodeURIComponent(dominio)}&categoria=${encodeURIComponent(categoria)}`;
    console.log("[GET productos por categoría] URL:", url);
    console.log("[GET productos por categoría] Dominio:", dominio);
    console.log("[GET productos por categoría] Categoría:", categoria);
    
    const res = await fetch(url, { headers: authHeaders() });
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      console.error("[GET productos por categoría] status:", res.status, res.statusText, "body:", txt);
      throw new Error(`Error al obtener productos por categoría (${res.status})`);
    }
    
    const data = await res.json();
    console.log("[GET productos por categoría] Respuesta:", data);
    return data;
  }, [authHeaders]);

  // ✅ Productos por dominio (catálogo completo) - CORREGIDO PARA USAR PARÁMETROS CORRECTOS DEL BACKEND
  const getProductosAll = useCallback(async (dominio: string) => {
    if (!dominio) {
      console.error("❌ [GET todos los productos] Dominio vacío, usando fallback");
      dominio = 'tiendanavidena.vercel.app';
    }
    
    // ✅ CAMBIO: Según el backend, debe usar 'url' para el dominio
    const url = `${getBackendUrl(BACKEND_CONFIG.ENDPOINTS.PRODUCTOS)}?url=${encodeURIComponent(dominio)}`;
    console.log("[GET todos los productos] URL:", url);
    console.log("[GET todos los productos] Dominio:", dominio);
    
    const res = await fetch(url, { headers: authHeaders() });
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      console.error("[GET todos los productos] status:", res.status, res.statusText, "body:", txt);
      throw new Error(`Error al obtener productos (${res.status})`);
    }
    
    const data = await res.json();
    console.log("[GET todos los productos] Respuesta:", data);
    return data;
  }, [authHeaders]);

  return {
    getFloristerias,
    getCategoriasByCategoria: getCategoriasByDominio, // Alias para mantener compatibilidad
    getCategoriasByDominio,
    getProductosByCategoria,
    getProductosAll,
  };
};
