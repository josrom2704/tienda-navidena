// components/debug-panel.tsx
"use client";

import { useState, useEffect } from 'react';
import { useApi } from '@/hooks/useApi';

export function DebugPanel() {
  const { getCategoriasByDominio, getProductosAll, getProductosByCategoria } = useApi();
  const [debugData, setDebugData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const runDebug = async () => {
    setLoading(true);
    const dominio = window.location.hostname.toLowerCase();
    
    try {
      console.log("🔍 Iniciando debug completo...");
      
      // 1. Obtener categorías
      console.log("📋 1. Obteniendo categorías...");
      const categorias = await getCategoriasByDominio(dominio);
      console.log("✅ Categorías obtenidas:", categorias);
      
      // 2. Obtener todos los productos
      console.log("📦 2. Obteniendo todos los productos...");
      const todosProductos = await getProductosAll(dominio);
      console.log("✅ Todos los productos obtenidos:", todosProductos);
      
      // 3. Probar filtrado por categoría para cada categoría
      console.log("🔍 3. Probando filtrado por categoría...");
      const categoriasConProductos: any[] = [];
      
      for (const categoria of categorias) {
        try {
          console.log(`🔍 Probando categoría: "${categoria}"`);
          const productosCategoria = await getProductosByCategoria(dominio, categoria);
          console.log(`✅ Productos para "${categoria}":`, productosCategoria);
          
          categoriasConProductos.push({
            categoria,
            productos: productosCategoria,
            cantidad: Array.isArray(productosCategoria) ? productosCategoria.length : 0
          });
        } catch (error) {
          console.error(`❌ Error obteniendo productos para "${categoria}":`, error);
          categoriasConProductos.push({
            categoria,
            productos: [],
            cantidad: 0,
            error: error.message
          });
        }
      }
      
      // 4. Compilar información de debug
      const debugInfo = {
        timestamp: new Date().toISOString(),
        dominio,
        categorias: {
          total: categorias.length,
          lista: categorias,
          tipo: typeof categorias,
          esArray: Array.isArray(categorias)
        },
        productos: {
          total: Array.isArray(todosProductos) ? todosProductos.length : 0,
          todos: todosProductos,
          tipo: typeof todosProductos,
          esArray: Array.isArray(todosProductos)
        },
        filtradoPorCategoria: categoriasConProductos,
        resumen: {
          categoriasConProductos: categoriasConProductos.filter(c => c.cantidad > 0).length,
          categoriasSinProductos: categoriasConProductos.filter(c => c.cantidad === 0).length,
          totalProductos: Array.isArray(todosProductos) ? todosProductos.length : 0
        }
      };
      
      setDebugData(debugInfo);
      console.log("🎯 Debug completo finalizado:", debugInfo);
      
    } catch (error) {
      console.error("❌ Error en debug:", error);
      setDebugData({
        error: error.message,
        timestamp: new Date().toISOString(),
        dominio
      });
    } finally {
      setLoading(false);
    }
  };

  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'production') {
    return null; // No mostrar en producción
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={runDebug}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors"
      >
        {loading ? "🔍 Debugging..." : "🔍 Debug Panel"}
      </button>
      
      {debugData && (
        <div className="fixed inset-4 z-50 bg-black/90 text-white p-6 overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">🔍 Debug Panel</h2>
            <button
              onClick={() => setDebugData(null)}
              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
            >
              ✕ Cerrar
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gray-800 p-4 rounded">
              <h3 className="font-bold mb-2">📊 Resumen</h3>
              <pre className="text-sm overflow-auto">
                {JSON.stringify(debugData.resumen || debugData, null, 2)}
              </pre>
            </div>
            
            {debugData.categorias && (
              <div className="bg-gray-800 p-4 rounded">
                <h3 className="font-bold mb-2">📋 Categorías</h3>
                <pre className="text-sm overflow-auto">
                  {JSON.stringify(debugData.categorias, null, 2)}
                </pre>
              </div>
            )}
            
            {debugData.filtradoPorCategoria && (
              <div className="bg-gray-800 p-4 rounded">
                <h3 className="font-bold mb-2">🔍 Filtrado por Categoría</h3>
                <pre className="text-sm overflow-auto">
                  {JSON.stringify(debugData.filtradoPorCategoria, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
