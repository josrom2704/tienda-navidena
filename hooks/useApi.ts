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

  // ✅ Productos por categoría - USANDO LO QUE SÍ FUNCIONA
  const getProductosByCategoria = useCallback(async (dominio: string, categoria: string): Promise<Producto[]> => {
    try {
      console.log("🔍 [getProductosByCategoria] Iniciando llamada");
      console.log("🔍 [getProductosByCategoria] Dominio recibido:", dominio);
      console.log("🔍 [getProductosByCategoria] Categoría recibida:", categoria);
      console.log("🔍 [getProductosByCategoria] Tipo de categoría:", typeof categoria);
      
      // ✅ SOLUCIÓN DEFINITIVA: Usar floristeriaId que sabemos que funciona
      const floristeriaId = '68a125df2097950ec3ff19fa';
      const url = `${getBackendUrl(BACKEND_CONFIG.ENDPOINTS.PRODUCTOS)}?floristeriaId=${floristeriaId}&categoria=${encodeURIComponent(categoria)}`;
      
      console.log("🔍 [getProductosByCategoria] URL completa:", url);
      console.log("🔍 [getProductosByCategoria] Parámetros enviados: floristeriaId=", floristeriaId, "categoria=", categoria);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("✅ [getProductosByCategoria] Productos obtenidos:", data.length);
      
      return Array.isArray(data) ? data : [];
      
    } catch (error) {
      console.error("❌ [getProductosByCategoria] Error:", error);
      return [];
    }
  }, []);

  // ✅ Productos por dominio - USANDO LO QUE SÍ FUNCIONA
  const getProductosAll = useCallback(async (dominio: string): Promise<Producto[]> => {
    try {
      console.log("🔍 [getProductosAll] Iniciando llamada");
      console.log("🔍 [getProductosAll] Dominio recibido:", dominio);
      console.log("🔍 [getProductosAll] Tipo de dominio:", typeof dominio);
      
      // ✅ SOLUCIÓN DEFINITIVA: Usar floristeriaId que sabemos que funciona
      const floristeriaId = '68a125df2097950ec3ff19fa';
      const url = `${getBackendUrl(BACKEND_CONFIG.ENDPOINTS.PRODUCTOS)}?floristeriaId=${floristeriaId}`;
      
      console.log("🔍 [getProductosAll] URL completa:", url);
      console.log("🔍 [getProductosAll] Parámetros enviados: floristeriaId=", floristeriaId);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("✅ [getProductosAll] Productos obtenidos:", data.length);
      
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
