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
      // En desarrollo local, usar un dominio de prueba
      dominioFinal = 'tiendanavidena.vercel.app';
    } else if (hostname.includes('vercel.app')) {
      // En Vercel, usar el dominio completo
      dominioFinal = hostname;
    } else if (hostname.includes('tiendanavidena')) {
      // Dominio personalizado
      dominioFinal = hostname;
    }
    
    // ✅ CORRECCIÓN: Asegurar que se use el dominio completo
    if (dominioFinal === 'vercel.app') {
      dominioFinal = 'tiendanavidena.vercel.app';
    }
    
    console.log("🌐 Dominio detectado:", { hostname, dominioFinal });
    setDominio(dominioFinal);
  }, []);

  return dominio;
}
