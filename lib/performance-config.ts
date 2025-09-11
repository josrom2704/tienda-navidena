// lib/performance-config.ts
// Configuración de optimizaciones de rendimiento

export const PERFORMANCE_CONFIG = {
  // ✅ Cache settings
  CACHE: {
    DURATION: 5 * 60 * 1000, // 5 minutos
    MAX_SIZE: 50, // Máximo 50 entradas en cache
  },
  
  // ✅ Image optimization
  IMAGES: {
    QUALITY: 80, // Calidad de imagen optimizada
    FORMATS: ['webp', 'avif'], // Formatos modernos
    SIZES: [300, 600, 900], // Tamaños responsivos
  },
  
  // ✅ API optimization
  API: {
    TIMEOUT: 10000, // 10 segundos timeout
    RETRY_ATTEMPTS: 3, // 3 intentos de reintento
    RETRY_DELAY: 1000, // 1 segundo entre reintentos
  },
  
  // ✅ UI optimization
  UI: {
    DEBOUNCE_DELAY: 300, // 300ms para búsquedas
    ANIMATION_DURATION: 200, // 200ms para animaciones
    LAZY_LOAD_THRESHOLD: 100, // 100px antes de cargar
  }
};

// ✅ Función para limpiar cache cuando sea necesario
export function clearPerformanceCache() {
  if (typeof window !== 'undefined') {
    // Limpiar cache del navegador
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          caches.delete(name);
        });
      });
    }
    
    // Limpiar localStorage de cache
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('cache_')) {
        localStorage.removeItem(key);
      }
    });
  }
}

// ✅ Función para medir rendimiento
export function measurePerformance(name: string, fn: () => void) {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(`⚡ ${name}: ${(end - start).toFixed(2)}ms`);
}
