// hooks/useDominio.ts
import { useState, useEffect, useMemo } from 'react';

export function useDominio() {
  const [dominio, setDominio] = useState<string>('');

  useEffect(() => {
    // ✅ OPTIMIZACIÓN: Solo ejecutar una vez al montar
    const hostname = window.location.hostname.toLowerCase();
    
    // ✅ OPTIMIZACIÓN: Mapeo directo sin lógica compleja
    let dominioFinal = hostname;
    
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      dominioFinal = 'tienda-navidenau.vercel.app';
    } else if (hostname.includes('vercel.app')) {
      dominioFinal = hostname;
    } else if (hostname.includes('tienda-navidenau')) {
      dominioFinal = hostname;
    }
    
    // ✅ OPTIMIZACIÓN: Solo actualizar si es diferente
    if (dominioFinal !== dominio) {
      setDominio(dominioFinal);
    }
  }, []); // ✅ Solo ejecutar una vez

  // ✅ OPTIMIZACIÓN: Memoizar el valor para evitar re-renders
  return useMemo(() => dominio, [dominio]);
}
