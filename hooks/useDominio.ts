// hooks/useDominio.ts
import { useState, useEffect } from 'react';

export function useDominio() {
  const [dominio, setDominio] = useState<string>('');

  useEffect(() => {
    // Obtener el dominio actual
    const hostname = window.location.hostname.toLowerCase();
    
    // Mapear dominios locales a dominios de producción
    let dominioFinal = hostname;
    
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      // En desarrollo local, usar el dominio real de Vercel
      dominioFinal = 'tienda-navidenau.vercel.app';
    } else if (hostname.includes('vercel.app')) {
      // En Vercel, usar el dominio completo
      dominioFinal = hostname;
    } else if (hostname.includes('tienda-navidenau')) {
      // Dominio personalizado
      dominioFinal = hostname;
    }
    
    // ✅ CORRECCIÓN: Asegurar que se use el dominio correcto
    if (dominioFinal === 'vercel.app') {
      dominioFinal = 'tienda-navidenau.vercel.app';
    }
    
    setDominio(dominioFinal);
  }, []);

  return dominio;
}
