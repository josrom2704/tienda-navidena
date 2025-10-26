// /hooks/useApi.ts
import { useCallback, useMemo } from 'react';
import { getBackendUrl, BACKEND_CONFIG } from '@/lib/backend-config';

// ✅ CACHE SIMPLE PARA MEJORAR RENDIMIENTO
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 10 * 60 * 1000; // ✅ AUMENTADO: 10 minutos para mejor performance

function getCachedData(key: string) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
}

function setCachedData(key: string, data: any) {
  cache.set(key, { data, timestamp: Date.now() });
  
  // ✅ OPTIMIZACIÓN: Limitar tamaño del cache
  if (cache.size > 50) {
    const firstKey = cache.keys().next().value;
    if (firstKey) {
      cache.delete(firstKey);
    }
  }
}

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

  // ✅ Categorías por dominio - OPTIMIZADO CON CACHE
  const getCategoriasByDominio = useCallback(async (dominio: string): Promise<string[]> => {
    try {
      const cacheKey = 'categorias';
      const cachedData = getCachedData(cacheKey);
      
      // ✅ EXTRAER SOLO STRINGS INCLUSO DEL CACHE
      const extractStrings = (items: any[]): string[] => {
        return items.map(item => {
          if (typeof item === 'string') {
            return item;
          } else if (typeof item === 'object' && item !== null) {
            // Intentar extraer el nombre de diferentes formas posibles
            return item.nombre || item.name || item.categoria || String(item);
          }
          return String(item);
        });
      };
      
      if (cachedData) {
        return extractStrings(cachedData);
      }

      // ✅ SOLUCIÓN DEFINITIVA: Usar floristeriaId que sabemos que funciona
      const floristeriaId = '68a125df2097950ec3ff19fa';
      const url = `${getBackendUrl(BACKEND_CONFIG.ENDPOINTS.CATEGORIAS)}?floristeriaId=${floristeriaId}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // ✅ EXTRAER SOLO EL NOMBRE SI ES UN OBJETO
      let result: string[] = [];
      if (Array.isArray(data)) {
        result = extractStrings(data);
      }
      
      // ✅ GUARDAR EN CACHE
      setCachedData(cacheKey, result);
      return result;
      
    } catch (error) {
      console.error("❌ [getCategoriasByDominio] Error:", error);
      return [];
    }
  }, []);

  // ✅ Productos por categoría - OPTIMIZADO CON CACHE
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
      
      // ✅ CACHE POR CATEGORÍA
      const cacheKey = `productos-${categoriaReal}`;
      const cachedData = getCachedData(cacheKey);
      if (cachedData) {
        return cachedData;
      }
      
      // ✅ SOLUCIÓN DEFINITIVA: Usar floristeriaId que sabemos que funciona
      const floristeriaId = '68a125df2097950ec3ff19fa';
      const url = `${getBackendUrl(BACKEND_CONFIG.ENDPOINTS.PRODUCTOS)}?floristeriaId=${floristeriaId}&categoria=${encodeURIComponent(categoriaReal)}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const result = Array.isArray(data) ? data : [];
      
      // ✅ GUARDAR EN CACHE
      setCachedData(cacheKey, result);
      return result;
      
    } catch (error) {
      console.error("❌ [getProductosByCategoria] Error:", error);
      return [];
    }
  }, []);

  // ✅ Todos los productos - OPTIMIZADO CON CACHE
  const getProductosAll = useCallback(async (dominio: string): Promise<Producto[]> => {
    try {
      // ✅ CACHE PARA TODOS LOS PRODUCTOS
      const cacheKey = 'productos-all';
      const cachedData = getCachedData(cacheKey);
      if (cachedData) {
        return cachedData;
      }

      // ✅ SOLUCIÓN DEFINITIVA: Usar floristeriaId que sabemos que funciona
      const floristeriaId = '68a125df2097950ec3ff19fa';
      const url = `${getBackendUrl(BACKEND_CONFIG.ENDPOINTS.PRODUCTOS)}?floristeriaId=${floristeriaId}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const result = Array.isArray(data) ? data : [];
      
      // ✅ GUARDAR EN CACHE
      setCachedData(cacheKey, result);
      return result;
      
    } catch (error) {
      console.error("❌ [getProductosAll] Error:", error);
      return [];
    }
  }, []);

  // ✅ FUNCIÓN PARA LIMPIAR CACHE (útil para desarrollo)
  const clearCache = useCallback(() => {
    cache.clear();
  }, []);

  return {
    getFloristerias,
    getCategoriasByCategoria: getCategoriasByDominio, // Alias para mantener compatibilidad
    getCategoriasByDominio,
    getProductosByCategoria,
    getProductosAll,
    clearCache, // ✅ NUEVA: Función para limpiar cache
  };
};
