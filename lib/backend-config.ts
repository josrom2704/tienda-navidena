// lib/backend-config.ts
// Configuración centralizada para el backend

export const BACKEND_CONFIG = {
  // ✅ URL del backend en Render
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL || "https://flores-backend-px2c.onrender.com/api",
  
  // ✅ Endpoints principales
  ENDPOINTS: {
    PRODUCTOS: "/flores",
    CATEGORIAS: "/categorias",
    FLORISTERIAS: "/floristerias",
  },
  
  // ✅ Configuración de categorías
  CATEGORIAS: {
    // Categorías principales que pueden venir del backend
    PRINCIPALES: [
      "flores",
      "canastas con vino", 
      "canastas con whisky",
      "canastas sin licor",
      "regalos navideños",
      "detalles pequeños",
      "canastas frutales"
    ],
    
    // Mapeo de categorías a slugs para URLs
    SLUGS: {
      "canastas con vino": "canastas-vino",
      "canastas con whisky": "canastas-whisky", 
      "canastas sin licor": "canastas-sin-licor",
      "regalos navideños": "regalos-navidenos",
      "detalles pequeños": "detalles-pequenos",
      "canastas frutales": "canastas-frutales",
      "flores": "flores"
    }
  },
  
  // ✅ Configuración de imágenes
  IMAGENES: {
    PLACEHOLDER: "/placeholder.svg?height=300&width=300",
    CLOUDINARY_FOLDER: "tienda-flores"
  }
};

// ✅ Función helper para generar slugs de categorías
export function generateCategorySlug(categoria: string): string {
  return categoria.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

// ✅ Función helper para obtener la URL completa del backend
export function getBackendUrl(endpoint: string): string {
  return `${BACKEND_CONFIG.API_BASE_URL}${endpoint}`;
}
