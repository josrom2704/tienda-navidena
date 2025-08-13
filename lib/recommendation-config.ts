// Configuración del algoritmo de recomendación diaria
export const RECOMMENDATION_CONFIG = {
  // Configuración general
  maxProductsPerDay: 4,
  maxProductsPerCategory: 1,
  
  // Dominio por defecto
  defaultDomain: "tiendanavidena",
  
  // Configuración de fallback
  enableFallback: true,
  fallbackProducts: [
    {
      id: 1,
      name: "Canasta Premium Navideña",
      description: "Vino tinto reserva, chocolates gourmet y decoración navideña de lujo",
      price: 80,
      originalPrice: 100,
      image: "/placeholder.svg?height=400&width=400",
      category: "Canastas con Vino",
      featured: true,
    },
    {
      id: 2,
      name: "Arreglo Floral Navideño Exclusivo",
      description: "Rosas rojas premium, flores blancas y decoración dorada artesanal",
      price: 68,
      originalPrice: 90,
      image: "/placeholder.svg?height=400&width=400",
      category: "Flores",
      featured: true,
    },
    {
      id: 3,
      name: "Canasta Frutal Deluxe",
      description: "Frutas frescas premium importadas y frutos secos selectos",
      price: 120,
      originalPrice: 160,
      image: "/placeholder.svg?height=400&width=400",
      category: "Canastas Frutales",
      featured: true,
    },
    {
      id: 4,
      name: "Regalo Corporativo Elegante",
      description: "Whisky premium escocés, chocolates belgas y tarjeta personalizada",
      price: 45,
      originalPrice: 58,
      image: "/placeholder.svg?height=400&width=400",
      category: "Canastas con Whisky",
      featured: true,
    },
  ],
  
  // Configuración de mapeo de campos de la base de datos
  fieldMapping: {
    id: ['id'],
    name: ['nombre', 'name'],
    description: ['descripcion', 'description'],
    price: ['precio', 'price'],
    originalPrice: ['precio_original', 'originalPrice'],
    image: ['imagen', 'image'],
    category: ['categoria', 'category'],
  },
  
  // Configuración de caché
  cacheEnabled: true,
  cacheExpiryHours: 24,
  
  // Configuración de reintentos
  maxRetries: 3,
  retryDelayMs: 1000,
};

// Función para obtener el valor de un campo con fallback
export function getFieldValue(obj: any, fieldNames: string[]): any {
  for (const fieldName of fieldNames) {
    if (obj[fieldName] !== undefined && obj[fieldName] !== null) {
      return obj[fieldName];
    }
  }
  return null;
}

// Función para mapear un producto de la base de datos al formato del componente
export function mapDatabaseProduct(dbProduct: any, category: string): any {
  return {
    id: getFieldValue(dbProduct, RECOMMENDATION_CONFIG.fieldMapping.id) || Math.random(),
    name: getFieldValue(dbProduct, RECOMMENDATION_CONFIG.fieldMapping.name) || "Producto",
    description: getFieldValue(dbProduct, RECOMMENDATION_CONFIG.fieldMapping.description) || "Descripción del producto",
    price: getFieldValue(dbProduct, RECOMMENDATION_CONFIG.fieldMapping.price) || 0,
    originalPrice: getFieldValue(dbProduct, RECOMMENDATION_CONFIG.fieldMapping.originalPrice),
    image: getFieldValue(dbProduct, RECOMMENDATION_CONFIG.fieldMapping.image) || "/placeholder.svg?height=400&width=400",
    category: getFieldValue(dbProduct, RECOMMENDATION_CONFIG.fieldMapping.category) || category,
    featured: true,
  };
}

// Función para generar un hash único basado en la fecha
export function generateDailySeed(): number {
  const today = new Date();
  const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convertir a entero de 32 bits
  }
  return Math.abs(hash);
}

// Función para generar números aleatorios consistentes por día
export function getRandomNumber(min: number, max: number): number {
  const seed = generateDailySeed();
  const x = Math.sin(seed + min + max) * 10000;
  return Math.floor((x - Math.floor(x)) * (max - min + 1)) + min;
}

export default RECOMMENDATION_CONFIG;


