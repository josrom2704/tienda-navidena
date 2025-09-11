// components/performance-debug.tsx
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useApi } from '@/hooks/useApi';
import { Trash2, Zap, Clock } from 'lucide-react';

export function PerformanceDebug() {
  const [isVisible, setIsVisible] = useState(false);
  const { clearCache } = useApi();

  if (process.env.NODE_ENV !== 'development') {
    return null; // Solo mostrar en desarrollo
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isVisible ? (
        <Button
          onClick={() => setIsVisible(true)}
          size="sm"
          variant="outline"
          className="bg-yellow-100 border-yellow-300 text-yellow-800 hover:bg-yellow-200"
        >
          <Zap className="w-4 h-4 mr-2" />
          Debug
        </Button>
      ) : (
        <div className="bg-white border border-yellow-200 rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm text-gray-700">Performance Debug</h3>
            <Button
              onClick={() => setIsVisible(false)}
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0"
            >
              ×
            </Button>
          </div>
          
          <div className="space-y-2">
            <Button
              onClick={() => {
                clearCache();
                console.log('🧹 Cache limpiado');
              }}
              size="sm"
              variant="outline"
              className="w-full text-xs"
            >
              <Trash2 className="w-3 h-3 mr-1" />
              Limpiar Cache
            </Button>
            
            <Button
              onClick={() => {
                const start = performance.now();
                setTimeout(() => {
                  const end = performance.now();
                  console.log(`⚡ Tiempo de respuesta: ${(end - start).toFixed(2)}ms`);
                }, 100);
              }}
              size="sm"
              variant="outline"
              className="w-full text-xs"
            >
              <Clock className="w-3 h-3 mr-1" />
              Test Performance
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
