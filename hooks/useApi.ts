// /hooks/useApi.ts
import { useCallback } from 'react';
import { getBackendUrl, BACKEND_CONFIG } from '@/lib/backend-config';

// ✅ Tipos para la API
export interface Producto {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: string;
  floristeria: string;
  imagen?: string;
  createdAt: string;
  updatedAt: string;
}

export function useApi() {
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
      console.log("🔍 [getCategoriasByDominio] Dominio original recibido:", dominio);
      console.log("🔍 [getCategoriasByDominio] Tipo de dominio:", typeof dominio);
      
      // ✅ CAMBIO: Usar 'url' en lugar de 'dominio' para que funcione con el backend
      const url = `${getBackendUrl(BACKEND_CONFIG.ENDPOINTS.CATEGORIAS)}?url=${encodeURIComponent(dominio)}`;
      console.log("🔍 [getCategoriasByDominio] URL completa:", url);
      console.log("🔍 [getCategoriasByDominio] Parámetro url enviado:", dominio);
      
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

  // ✅ Productos por dominio - REVERTIDO PARA USAR URL (backend ya corregido)
  const getProductosAll = useCallback(async (dominio: string): Promise<Producto[]> => {
    if (!dominio) {
      console.log("⚠️ [getProductosAll] Dominio vacío, usando fallback");
      dominio = "tiendanavidena.vercel.app";
    }

    try {
      console.log("🔍 [getProductosAll] Iniciando llamada para dominio:", dominio);
      
      // ✅ REVERTIDO: Usar 'url' ya que el backend ahora funciona correctamente
      const url = `${getBackendUrl(BACKEND_CONFIG.ENDPOINTS.PRODUCTOS)}?url=${encodeURIComponent(dominio)}`;
      
      console.log("🔍 [getProductosAll] URL completa:", url);
      console.log("🔍 [getProductosAll] Usando parámetro url:", dominio);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("✅ [getProductosAll] Respuesta del backend:", data);
      console.log("📊 [getProductosAll] Tipo:", typeof data, "Longitud:", Array.isArray(data) ? data.length : 'No es array');
      
      return Array.isArray(data) ? data : [];
      
    } catch (error) {
      console.error("❌ [getProductosAll] Error:", error);
      return [];
    }
  }, []);

  return {
    getFloristerias,
    getCategoriasByCategoria: getCategoriasByDominio, // Alias para mantener compatibilidad
    getCategoriasByDominio,
    getProductosByCategoria,
    getProductosAll,
  };
};
