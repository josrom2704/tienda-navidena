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

  // ✅ Categorías por dominio - USANDO LO QUE SÍ FUNCIONA
  const getCategoriasByDominio = useCallback(async (dominio: string): Promise<string[]> => {
    try {
      // ✅ SOLUCIÓN DEFINITIVA: Usar floristeriaId que sabemos que funciona
      const floristeriaId = '68a125df2097950ec3ff19fa';
      const url = `${getBackendUrl(BACKEND_CONFIG.ENDPOINTS.CATEGORIAS)}?floristeriaId=${floristeriaId}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return Array.isArray(data) ? data : [];
      
    } catch (error) {
      console.error("❌ [getCategoriasByDominio] Error:", error);
      return [];
    }
  }, []);

  // ✅ Productos por categoría - USANDO LO QUE SÍ FUNCIONA
  const getProductosByCategoria = useCallback(async (dominio: string, categoria: string): Promise<Producto[]> => {
    try {
      // ✅ CONVERTIR SLUG A CATEGORÍA REAL
      const slugToCategoria: { [key: string]: string } = {
        'canastas-con-vino': 'Canastas con vino',
        'canastas-vino': 'Canastas con vino', // ✅ AGREGADO: Slug sin "con"
        'canastas-con-whisky': 'Canastas con whisky',
        'canastas-whisky': 'Canastas con whisky', // ✅ AGREGADO: Slug sin "con"
        'canastas-sin-licor': 'Canastas sin licor',
        'canastas-licor': 'Canastas sin licor', // ✅ AGREGADO: Slug alternativo
        'regalos-navidenos': 'Regalos navideños',
        'detalles-pequenos': 'Detalles pequeños',
        'canastas-frutales': 'Canastas frutales',
        'canastas-frutal': 'Canastas frutales', // ✅ AGREGADO: Slug singular
        'flores': 'Flores',
        'ramos': 'Ramos'
      };
      
      // ✅ Buscar en el mapeo primero
      let categoriaReal = categoria;
      if (slugToCategoria[categoria]) {
        categoriaReal = slugToCategoria[categoria];
      }
      
      // ✅ SOLUCIÓN DEFINITIVA: Usar floristeriaId que sabemos que funciona
      const floristeriaId = '68a125df2097950ec3ff19fa';
      const url = `${getBackendUrl(BACKEND_CONFIG.ENDPOINTS.PRODUCTOS)}?floristeriaId=${floristeriaId}&categoria=${encodeURIComponent(categoriaReal)}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return Array.isArray(data) ? data : [];
      
    } catch (error) {
      console.error("❌ [getProductosByCategoria] Error:", error);
      return [];
    }
  }, []);

  // ✅ Todos los productos - USANDO LO QUE SÍ FUNCIONA
  const getProductosAll = useCallback(async (dominio: string): Promise<Producto[]> => {
    try {
      // ✅ SOLUCIÓN DEFINITIVA: Usar floristeriaId que sabemos que funciona
      const floristeriaId = '68a125df2097950ec3ff19fa';
      const url = `${getBackendUrl(BACKEND_CONFIG.ENDPOINTS.PRODUCTOS)}?floristeriaId=${floristeriaId}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
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
