// components/preloader.tsx
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function Preloader() {
  const router = useRouter();

  useEffect(() => {
    // ✅ OPTIMIZACIÓN: Preload de rutas críticas
    const preloadRoutes = [
      '/catalogo',
      '/carrito',
      '/checkout',
      '/contacto'
    ];

    // ✅ Preload después de 2 segundos (no bloquear carga inicial)
    const timer = setTimeout(() => {
      preloadRoutes.forEach(route => {
        router.prefetch(route);
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return null; // Componente invisible
}

// ✅ Hook para preload inteligente
export function usePreload() {
  const router = useRouter();

  const preloadRoute = (route: string) => {
    router.prefetch(route);
  };

  return { preloadRoute };
}
